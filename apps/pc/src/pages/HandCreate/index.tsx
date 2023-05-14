import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import {
  ALL_PLAYER_ACTIONS,
  ALL_SETTING_STAGES,
  HandStage,
  HandAction,
  PlayerAction,
  SettingHandStage,
  SettingPlayerAction,
} from '../../models/hand';
import { PlayerSeat } from '../../models/player';
import HandActionUI from './components/HandAction';
import CompactInput from './components/CompactInput';
import StageSetting, { IStageSettingProps, IStageSettingRef } from './components/StageSetting';
import { usePlayerStates } from './hooks/usePlayerStates';
import styles from './index.module.scss';
import { useHandActions } from './hooks/useHandActions';
import { useCurrentBetSize } from './hooks/useCurrentBetSize';

const HandCreate = () => {
  const { actions, dispatchAction } = useHandActions();

  // Next Stage state
  const [stage, setStage] = useState<SettingHandStage>(HandStage.Init);

  const [lastPotSize, setLastPotSize] = useState(0);

  // User Action state
  const [seat, setSeat] = useState<PlayerSeat>(PlayerSeat.UTG);
  const [action, setAction] = useState<SettingPlayerAction>(PlayerAction.Check);
  const [betSize, setBetSize] = useState(0);

  const { currentBetSize, updateCurrentBetSize, resetCurrentBetSize } = useCurrentBetSize();

  const stageSettingRef = useRef<IStageSettingRef>(null);
  const { playerStates, estimatePotSize, initStates, setBlinds, userAction, resetChips } =
    usePlayerStates({
      lastPotSize,
    });

  useEffect(() => {
    stageSettingRef.current?.estimatePotSize(estimatePotSize);
  }, [estimatePotSize, stage]);

  const foldPlayers = playerStates.filter((state) => state.fold).length;
  const noSeatLeft = playerStates.length - foldPlayers <= 1;

  const stageClear = useMemo(
    () =>
      playerStates.every(
        (state) => state.fold || (state.actioned && state.chips === currentBetSize),
      ),
    [currentBetSize, playerStates],
  );

  const onActionChange = (e: RadioChangeEvent) => {
    const action = e.target.value as SettingPlayerAction;
    setAction(action);

    if (action === PlayerAction.Call) {
      setBetSize(currentBetSize);
    } else if (action === PlayerAction.Check || action === PlayerAction.Fold) {
      setBetSize(0);
    }
  };

  const estimateNextSeat = () => {
    let nextIndex = playerStates.findIndex((state) => state.seat === seat);
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
      // Go next stage
      setStage(ALL_SETTING_STAGES[ALL_SETTING_STAGES.indexOf(stage) + 1]);
    },
    [dispatchAction, stage],
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
    // Go next seat
    estimateNextSeat();
  };

  const onNextStage: IStageSettingProps['onNextStage'] = (params) => {
    switch (params.stage) {
      case HandStage.Init:
        initStates(params.players);
        dispatchStageAction({ type: 'stageInit', players: params.players });
        break;

      case HandStage.Blinds: {
        const { blinds, potSize } = params;
        setBlinds(blinds);
        dispatchStageAction(
          ...blinds.map(({ seat, type, chips }) => {
            return {
              type: 'playerPayBlinds' as const,
              seat,
              blindType: type,
              chips,
            };
          }),
          {
            type: 'stageBlinds',
            blinds,
            potSize,
          },
        );
        updateCurrentBetSize(blinds.reduce((res, { chips }) => Math.max(res, chips), 0));
        break;
      }

      case HandStage.PreFlop:
      case HandStage.Showdown:
        dispatchStageAction({
          type: 'stageInfo',
          stage: params.stage,
          potSize: params.potSize,
          cards: [],
        });
        break;

      case HandStage.Flop:
      case HandStage.Turn:
      case HandStage.River:
        dispatchStageAction({
          type: 'stageInfo',
          stage: params.stage,
          potSize: params.potSize,
          cards: params.cards,
        });
        resetChips();
        setLastPotSize(params.potSize);
        break;
    }
  };

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
              ref={stageSettingRef}
              stage={stage}
              stageClear={stageClear}
              onNextStage={onNextStage}
            />
          </div>

          {/* User action */}
          {stage !== HandStage.Init && stage !== HandStage.Blinds && (
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
                  <Radio.Button key={seat} className={styles.seatBtn} value={seat} disabled={fold}>
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
                options={ALL_PLAYER_ACTIONS.map((action) => {
                  const currentState = playerStates.find((state) => state.seat === seat);
                  return {
                    label: action,
                    value: action,
                    disabled:
                      stageClear ||
                      (action === PlayerAction.Check &&
                        currentState &&
                        currentState.chips < currentBetSize) ||
                      (action === PlayerAction.Bet && currentBetSize > 0),
                  };
                })}
                value={action}
                onChange={onActionChange}
              />
              <div>currentBetSize: {currentBetSize}</div>
              <CompactInput
                placeholder="Input bet size"
                disabled={noSeatLeft || stageClear}
                disabledInput={
                  ![PlayerAction.Bet, PlayerAction.Raise, PlayerAction.Allin].includes(action)
                }
                disabledConfirm={playerStates.some(
                  (state) => state.seat === seat && state.actioned && state.chips >= currentBetSize,
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
