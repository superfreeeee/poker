import { useCallback, useEffect, useState } from 'react';
import { PlayerAction } from '../../models/hand';
import { PlayerSeat } from '../../models/player';

export type PlayerState = {
  seat: PlayerSeat;
  fold: boolean;
  actioned: boolean;
  chips: number;
};

interface IUsePlayerStatesProps {
  seats: PlayerSeat[];
}

export const usePlayerStates = ({ seats }: IUsePlayerStatesProps) => {
  const [playerStates, setPlayerStates] = useState<PlayerState[]>([]);

  useEffect(() => {
    const newSeatStates = seats.map((seat) => {
      if (seat === PlayerSeat.SB || seat === PlayerSeat.BB) {
        return { seat, fold: false, actioned: false, chips: 2 };
      }
      return { seat, fold: false, actioned: false, chips: 0 };
    });
    setPlayerStates(newSeatStates);
  }, [seats]);

  const userAction = (action: PlayerAction, seat: PlayerSeat, chips: number): PlayerState[] => {
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
    return nextStates;
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
    userAction,
    resetChips,
  };
};
