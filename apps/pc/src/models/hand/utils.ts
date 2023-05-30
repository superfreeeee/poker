import { HandVO } from '../../api/hand';
import { decodeCard } from '../card';
import { PlayerState, isPlayerSeat } from '../player';
import {
  ALL_PLAYER_ACTIONS,
  HandAction,
  HandBlindRecord,
  HandRecord,
  PlayerAction,
  SettingPlayerAction,
} from './types';

interface IGetPlayerActionsProps {
  currentBetSize: number;
  currentState?: PlayerState;
  stageClear: boolean;
}

interface PlayerActionOption {
  label: string;
  value: string;
  disabled: boolean;
}

export const getPlayerActionOptions = ({
  currentBetSize,
  currentState,
  stageClear,
}: IGetPlayerActionsProps): PlayerActionOption[] => {
  const actions = ALL_PLAYER_ACTIONS.filter(
    (action) => !(currentBetSize > 0 ? action === PlayerAction.Bet : action === PlayerAction.Raise),
  ) as SettingPlayerAction[];

  return actions.map((action) => {
    return {
      label: action,
      value: action,
      disabled:
        stageClear ||
        (action === PlayerAction.Check && currentState && currentState.chips < currentBetSize) ||
        (currentBetSize === 0 && action === PlayerAction.Call),
    };
  });
};

export const transformHandVOToRecord = (handVO: HandVO): HandRecord => {
  const { id, createTime, players, blinds, boardCards, actions } = handVO;

  return {
    id,
    createTime,
    players,
    blinds: blinds.map(({ seat, chips }): HandBlindRecord => {
      if (!isPlayerSeat(seat)) {
        throw new SyntaxError(`Invalid seat literal: ${seat}`);
      }
      return { seat, chips };
    }),
    boardCards: boardCards.map(decodeCard),
    actions: actions as HandAction[],
  };
};
