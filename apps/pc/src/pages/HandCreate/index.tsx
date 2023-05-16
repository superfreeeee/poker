import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Button, Radio } from 'antd';
import {
  HandStage,
  HandAction,
  PlayerAction,
  SettingPlayerAction,
  getPlayerActionOptions,
  HandRecord,
  HandBlindRecord,
  useLocalHandRecords,
} from '../../models/hand';
import { Card } from '../../models/card';
import { PlayerSeat } from '../../models/player';
import Header from '../../components/Header';
import { CardSelectorModal } from '../../components/CardSelectorModal';
import HandActionUI from './components/HandAction';
import CompactInput from './components/CompactInput';
import StageSetting, { IStageSettingProps } from './components/StageSetting';
import { usePlayerStates } from './hooks/usePlayerStates';
import { useHandActions } from './hooks/useHandActions';
import { useCurrentBetSize } from './hooks/useCurrentBetSize';
import { useHandStage } from './hooks/useHandStage';
import styles from './index.module.scss';

const HandCreate = () => {
  const { actions, dispatchAction } = useHandActions();
  const { stage, nextStage } = useHandStage();
  const { currentBetSize, updateCurrentBetSize, resetCurrentBetSize } = useCurrentBetSize();
  const [lastPotSize, setLastPotSize] = useState(0);

  const { playerStates, estimatePotSize, initStates, setBlinds, userAction, showdown, resetChips } =
    usePlayerStates({
      lastPotSize,
    });

  const selectedCards = useMemo(() => {
    return actions.reduce((cards: Card[], action) => {
      if (action.type === 'stageInfo' || action.type === 'playerShowdown') {
        return [...cards, ...action.cards];
      }
      return cards;
    }, []);
  }, [actions]);

  // User Action state
  const [seat, setSeat] = useState<PlayerSeat>(PlayerSeat.UTG);
  const [action, setAction] = useState<SettingPlayerAction>(PlayerAction.Fold);
  const [betSize, setBetSize] = useState(0);

  const foldPlayers = playerStates.filter((state) => state.fold).length;
  const noSeatLeft = playerStates.length - foldPlayers <= 1;

  const stageClear = useMemo(
    () =>
      playerStates.every(
        (state) => state.fold || (state.actioned && state.chips === currentBetSize),
      ),
    [currentBetSize, playerStates],
  );

  const setActionWithBetSize = (action: SettingPlayerAction, betSize?: number) => {
    setAction(action);

    if (action === PlayerAction.Call) {
      setBetSize(betSize ?? currentBetSize);
    } else if (action === PlayerAction.Check || action === PlayerAction.Fold) {
      setBetSize(0);
    }
  };

  const estimateNextSeat = (fromIndex = playerStates.findIndex((state) => state.seat === seat)) => {
    let nextIndex = fromIndex;
    while (!noSeatLeft) {
      nextIndex = (nextIndex + 1) % playerStates.length;
      const nextState = playerStates[nextIndex];
      if (nextState && !nextState.fold) {
        setSeat(nextState.seat);
        return;
      }
    }
  };

  const dispatchStageAction = useCallback(
    (...actions: HandAction[]) => {
      dispatchAction(...actions);
      setBetSize(0);
      resetCurrentBetSize();
      nextStage();
    },
    [dispatchAction, nextStage, resetCurrentBetSize],
  );

  const dispatchUserAction = () => {
    userAction(action, seat, betSize);
    updateCurrentBetSize(betSize);
    dispatchAction({
      type: 'playerAction',
      seat,
      action,
      chips: [PlayerAction.Fold, PlayerAction.Check].includes(action) ? undefined : betSize,
    });

    // Set to Call when previous player bet
    if (action === PlayerAction.Bet) {
      setActionWithBetSize(PlayerAction.Call, betSize);
    }

    // Go next seat
    estimateNextSeat();
  };

  const onNextStage: IStageSettingProps['onNextStage'] = (params) => {
    switch (params.stage) {
      case HandStage.Init:
        initStates(params.players);
        dispatchStageAction({ type: 'stageBlinds', players: params.players });
        break;

      case HandStage.Blinds: {
        const { blinds } = params;
        setBlinds(blinds);
        dispatchStageAction(
          ...blinds.map(({ seat, chips }) => {
            return {
              type: 'playerPayBlinds' as const,
              seat,
              chips,
            };
          }),
          {
            type: 'stageInfo',
            stage: HandStage.PreFlop,
            potSize: blinds.reduce((res, { chips }) => res + chips, 0),
            cards: [],
          },
        );
        updateCurrentBetSize(blinds.reduce((res, { chips }) => Math.max(res, chips), 0));
        setSeat(playerStates[blinds.length % playerStates.length].seat);
        break;
      }

      case HandStage.Showdown:
      case HandStage.Flop:
      case HandStage.Turn:
      case HandStage.River:
        setActionWithBetSize(PlayerAction.Check);

      // eslint-disable-next-line no-fallthrough
      case HandStage.PreFlop:
        dispatchStageAction({
          type: 'stageInfo',
          stage: params.stage,
          potSize: params.potSize,
          cards: params.cards ?? [],
        });
        resetChips();
        setLastPotSize(params.potSize);
        // Reset to First player & Check
        estimateNextSeat(-1);
        break;
    }
  };

  const playerActions = useMemo(() => {
    return getPlayerActionOptions({
      currentBetSize,
      currentState: playerStates.find((state) => state.seat === seat),
      stageClear,
    });
  }, [currentBetSize, playerStates, seat, stageClear]);

  const showdownOptions = playerStates.filter((state) => !state.fold && !state.showdown);

  const { addRecord } = useLocalHandRecords();

  const navigate = useNavigate();
  const saveRecord = () => {
    const record: HandRecord = {
      version: 'v1',
      id: nanoid(),
      players: [],
      seatMap: {},
      blinds: actions
        .map((action): HandBlindRecord | null => {
          if (action.type === 'playerPayBlinds') {
            return { seat: action.seat, chips: action.chips };
          }
          return null;
        })
        .reduce((blinds, record) => (record ? [...blinds, record] : blinds), []),
      actions,
      boardCards: actions.reduce((res, action) => {
        return action.type === 'stageInfo' ? [...res, ...action.cards] : res;
      }, []),
      winnerId: '',
      createTime: Date.now(),
    };

    addRecord(record);
    navigate(`/hand/${record.id}`);
  };

  return (
    <div className={styles.container}>
      <Header title="Create Hand Record" back="/hands" className={styles.header} />
      <div className={styles.main}>
        {/* Left part: Preview current actions */}
        <div className={styles.preview}>
          {actions.map((action, i) => (
            <HandActionUI key={i} action={action} />
          ))}
        </div>

        <div className={styles.divider} />
        {/* Right part: Controller area */}
        <div className={styles.controller}>
          <h2>Controller</h2>

          {/* Stage change => deal cards */}
          <div className={styles.area}>
            <h3>Current Stage: {stage}</h3>
            <StageSetting
              currentStage={stage}
              playerStates={playerStates}
              selectedCards={selectedCards}
              estimatePotSize={estimatePotSize}
              stageClear={stageClear}
              onNextStage={onNextStage}
            />
          </div>

          {/* User action */}
          {stage !== HandStage.Init &&
            stage !== HandStage.Blinds &&
            stage !== HandStage.Showdown && (
              <div className={styles.area}>
                <div className={styles.title}>
                  <h3>User Action: </h3>
                  <div style={{ fontWeight: 400, fontSize: 16 }}>
                    currentBetSize: {currentBetSize}
                  </div>
                </div>
                <Radio.Group
                  buttonStyle="solid"
                  optionType="button"
                  value={seat}
                  onChange={(e) => {
                    setSeat(e.target.value as PlayerSeat);
                  }}
                >
                  {playerStates.map(({ seat, fold, chips }) => (
                    <Radio.Button
                      key={seat}
                      className={styles.seatBtn}
                      value={seat}
                      disabled={fold}
                    >
                      <div>{seat}</div>
                      <div>
                        {fold && 'fold '}
                        {(!fold || chips > 0) && chips}
                      </div>
                    </Radio.Button>
                  ))}
                </Radio.Group>
                <Radio.Group
                  buttonStyle="solid"
                  optionType="button"
                  options={playerActions}
                  value={action}
                  onChange={(e) => setActionWithBetSize(e.target.value as SettingPlayerAction)}
                />
                <CompactInput
                  placeholder="Input bet size"
                  disabled={noSeatLeft || stageClear}
                  disabledInput={
                    ![PlayerAction.Bet, PlayerAction.Raise, PlayerAction.Allin].includes(action)
                  }
                  disabledConfirm={playerStates.some(
                    (state) =>
                      state.seat === seat && state.actioned && state.chips >= currentBetSize,
                  )}
                  value={betSize}
                  onValueChange={(input) => setBetSize(+input)}
                  onOk={dispatchUserAction}
                />
              </div>
            )}
          {stage === HandStage.Showdown && (
            <div className={styles.area}>
              {showdownOptions.map(({ seat }) => {
                return (
                  <div key={seat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {seat}
                    <Button
                      type="primary"
                      onClick={() => {
                        CardSelectorModal.open({
                          count: 2,
                          onSelect: (cards) => {
                            dispatchAction({
                              type: 'playerShowdown',
                              seat,
                              cards,
                            });
                            showdown(seat);
                          },
                        });
                      }}
                    >
                      Select Hand
                    </Button>
                  </div>
                );
              })}
              {/* no showdownOptions => Hand Complete */}
              {showdownOptions.length === 0 && (
                <Button type="primary" onClick={saveRecord}>
                  Save
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandCreate;
