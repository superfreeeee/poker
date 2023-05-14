import { useCallback, useEffect, useState } from 'react';
import { keyBy } from 'lodash-es';
import { HandBlindRecord, PlayerAction } from '../../../models/hand';
import { getPlayerSeats, PlayerSeat } from '../../../models/player';

export type PlayerState = {
  seat: PlayerSeat;
  fold: boolean;
  actioned: boolean;
  chips: number;
};

interface IUsePlayerStatesProps {
  lastPotSize: number;
}

export const usePlayerStates = ({ lastPotSize }: IUsePlayerStatesProps) => {
  const [playerStates, setPlayerStates] = useState<PlayerState[]>([]);
  const estimatePotSize = playerStates.reduce((sum, state) => sum + state.chips, lastPotSize);

  useEffect(() => {
    console.log('playerStates', playerStates);
  }, [playerStates]);

  const initStates = (players: number) => {
    const newSeatStates = getPlayerSeats(players).map((seat) => {
      return { seat, fold: false, actioned: false, chips: 0 };
    });
    setPlayerStates(newSeatStates);
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
        case PlayerAction.Call: {
          return { ...state, chips, actioned: true };
        }
        case PlayerAction.Check:
        default:
          return { ...state, actioned: true };
      }
    });

    setPlayerStates(nextStates);
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
    resetChips,
  };
};
