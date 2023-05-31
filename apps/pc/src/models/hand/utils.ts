import { PlayerState } from '../player';
import { ALL_PLAYER_ACTIONS, PlayerAction, SettingPlayerAction } from './types';

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
