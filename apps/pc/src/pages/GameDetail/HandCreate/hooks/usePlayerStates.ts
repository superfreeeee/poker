import { useCallback, useState } from 'react';
import { keyBy } from 'lodash-es';
import { HandBlindRecord, PlayerAction } from '../../../../models/hand';
import { getPlayerSeats, PlayerSeat, PlayerState } from '../../../../models/player';

interface IUsePlayerStatesProps {
  lastPotSize: number;
}

export const usePlayerStates = ({ lastPotSize }: IUsePlayerStatesProps) => {
  const [playerStates, setPlayerStates] = useState<PlayerState[]>([]);
  const estimatePotSize = playerStates.reduce((sum, state) => sum + state.chips, lastPotSize);

  // console.log('playerStates', playerStates);

  const initStates = (players: number) => {
    setPlayerStates(
      getPlayerSeats(players).map((seat) => {
        return { seat, fold: false, actioned: false, chips: 0, showdown: false };
      }),
    );
  };

  const setBlinds = (blinds: HandBlindRecord[]) => {
    const blindsObj = keyBy(blinds, 'seat');
    const statesWithBlinds = playerStates.map((state) => {
      const record = blindsObj[state.seat];
      if (record) {
        return { ...state, chips: record.chips };
      }
      return state;
    });
    setPlayerStates(statesWithBlinds);
  };

  const userAction = (action: PlayerAction, seat: PlayerSeat, chips: number) => {
    const nextStates = playerStates.map((state) => {
      if (state.seat !== seat) return state;

      switch (action) {
        case PlayerAction.Fold:
          return { ...state, fold: true, actioned: true };

        case PlayerAction.Bet:
        case PlayerAction.Raise:
        case PlayerAction.Allin:
        case PlayerAction.Call:
          return { ...state, chips, actioned: true };

        case PlayerAction.Check:
        default:
          return { ...state, actioned: true };
      }
    });

    setPlayerStates(nextStates);
  };

  const showdown = (seat: PlayerSeat) => {
    setPlayerStates(
      playerStates.map((state) => (state.seat !== seat ? state : { ...state, showdown: true })),
    );
  };

  const resetChips = useCallback(() => {
    setPlayerStates((playerStates) =>
      playerStates.map((state) => {
        return { ...state, chips: 0, actioned: false };
      }),
    );
  }, []);

  return {
    playerStates,
    estimatePotSize,
    initStates,
    setBlinds,
    userAction,
    showdown,
    resetChips,
  };
};
