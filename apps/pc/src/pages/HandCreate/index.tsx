import React, { useCallback, useMemo, useState } from 'react';
import { Radio } from 'antd';
import {
  HandStage,
  HandAction,
  PlayerAction,
  SettingPlayerAction,
  getPlayerActionOptions,
} from '../../models/hand';
import { PlayerSeat } from '../../models/player';
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

  const { playerStates, estimatePotSize, initStates, setBlinds, userAction, resetChips } =
    usePlayerStates({
      lastPotSize,
    });

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

      case HandStage.Flop:
      case HandStage.Turn:
      case HandStage.River:
      case HandStage.Showdown:
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create Hand Record</h1>
      </div>

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
                <h3>User Action</h3>
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
                <div>currentBetSize: {currentBetSize}</div>
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
        </div>
      </div>
    </div>
  );
};

export default HandCreate;
