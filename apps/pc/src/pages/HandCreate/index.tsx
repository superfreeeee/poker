/* eslint-disable no-fallthrough */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Radio, RadioChangeEvent } from 'antd';
import {
  ALL_PLAYER_ACTIONS,
  ALL_SETTING_STAGES,
  HandStage,
  HandAction,
  PlayerAction,
  SettingHandStage,
  SettingPlayerAction,
} from '../../models/hand';
import { getPlayerSeats, PlayerSeat } from '../../models/player';
import HandActionUI from './components/HandAction';
import CompactInput from './components/CompactInput';
import SetPlayers from './components/SetPlayers';
import SetPostFlop, { ISetPostFlopRef } from './components/SetPostFlop';
import { PlayerState, usePlayerStates } from './usePlayerStates';
import styles from './index.module.scss';

const HandCreate = () => {
  const [actions, setActions] = useState<HandAction[]>([]);

  // Next Stage state
  const [stage, setStage] = useState<SettingHandStage>(HandStage.Init);
  const [players, setPlayers] = useState(0);
  const seats = useMemo(() => getPlayerSeats(players), [players]);

  const [lastPotSize, setLastPotSize] = useState(0);

  // User Action state
  const [seat, setSeat] = useState<PlayerSeat>(PlayerSeat.UTG);
  const [action, setAction] = useState<SettingPlayerAction>(PlayerAction.Check);
  const [betSize, setBetSize] = useState(0);

  const [currentBetSize, setCurrentBetSize] = useState(2); // Biggest bet size at current stage

  const { playerStates, userAction, resetChips } = usePlayerStates({ seats });

  const foldPlayers = playerStates.filter((state) => state.fold).length;
  const noSeatLeft = seats.length - foldPlayers <= 1;

  const stageClear = useMemo(
    () =>
      playerStates.every(
        (state) => state.fold || (state.actioned && state.chips === currentBetSize),
      ),
    [currentBetSize, playerStates],
  );

  console.log('playerStates', playerStates);

  const onActionChange = (e: RadioChangeEvent) => {
    const action = e.target.value as SettingPlayerAction;
    setAction(action);

    if (action === PlayerAction.Call) {
      setBetSize(currentBetSize);
    } else if (action === PlayerAction.Check || action === PlayerAction.Fold) {
      setBetSize(0);
    }
  };

  const setPostFlopRef = useRef<ISetPostFlopRef>(null);
  const estimatePotSize = useCallback(
    (states: PlayerState[] = playerStates) => {
      const nextPotSize = states.reduce((sum, state) => sum + state.chips, lastPotSize);
      setPostFlopRef.current?.estimatePotSize(nextPotSize);
    },
    [lastPotSize, playerStates],
  );

  const estimateNextSeat = () => {
    let nextIndex = playerStates.findIndex((state) => state.seat === seat);
    while (!noSeatLeft) {
      nextIndex = (nextIndex + 1) % seats.length;
      const nextState = playerStates[nextIndex];
      if (nextState && !nextState.fold) {
        setSeat(nextState.seat);
        return;
      }
    }
  };

  const dispatchAction = (action: HandAction) => {
    setActions([...actions, action]);
  };

  const dispatchStageAction = useCallback(
    (action: HandAction) => {
      setActions((actions) => [...actions, action]);
      setBetSize(0);
      setCurrentBetSize(0);
      estimatePotSize();
      // Go next stage
      setStage(ALL_SETTING_STAGES[ALL_SETTING_STAGES.indexOf(stage) + 1]);
    },
    [estimatePotSize, stage],
  );

  const dispatchUserAction = () => {
    const nextStates = userAction(action, seat, betSize);
    estimatePotSize(nextStates);
    betSize > currentBetSize && setCurrentBetSize(betSize);
    dispatchAction({
      type: 'playerAction',
      seat,
      action,
      chips: [PlayerAction.Fold, PlayerAction.Check].includes(action) ? undefined : betSize,
    });
    // Go next seat
    estimateNextSeat();
  };

  const stageSetting = useMemo(() => {
    if (stage === HandStage.Init) {
      return (
        <SetPlayers
          onConfirm={(players) => {
            setPlayers(players);
            dispatchStageAction({ type: 'stageInit', players });
          }}
        />
      );
    }

    if (stage === HandStage.Blinds) {
      return (
        <Button
          onClick={() => {
            dispatchStageAction({ type: 'stageBlinds', potSize: 0 });
          }}
        >
          Next
        </Button>
      );
    }

    return (
      !!stage && (
        <SetPostFlop
          ref={setPostFlopRef}
          stage={stage}
          stageClear={stageClear}
          onConfirm={(cards, potSize) => {
            dispatchStageAction({ type: 'stageInfo', stage, cards, potSize });
            resetChips();
            setLastPotSize(potSize);
          }}
        />
      )
    );
  }, [dispatchStageAction, resetChips, stage, stageClear]);

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
            <h3>Next Stage</h3>
            <Radio.Group
              buttonStyle="solid"
              optionType="button"
              options={ALL_SETTING_STAGES.map((stageOption) => ({
                label: stageOption,
                value: stageOption,
                disabled: stage !== stageOption,
              }))}
              value={stage}
              onChange={(e) => {
                const stage = e.target.value as SettingHandStage;
                setStage(stage);
              }}
            />
            {stageSetting}
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
