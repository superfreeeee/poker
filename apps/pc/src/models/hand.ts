import { CheckboxOptionType } from 'antd';
import { Card } from './card';
import { PlayerSeat, PlayerState } from './player';

export enum HandStage {
  Init = 'Init', // players unknown
  Blinds = 'Blinds', // setting blinds
  PreFlop = 'Pre-Flop',
  Flop = 'Flop',
  Turn = 'Turn',
  River = 'River',
  Showdown = 'Showdown', // show cards
}

export type PostFlopHandStage =
  | HandStage.Flop
  | HandStage.Turn
  | HandStage.River
  | HandStage.Showdown;

export const ALL_SETTING_STAGES = [
  HandStage.Init,
  HandStage.Blinds,
  HandStage.PreFlop,
  HandStage.Flop,
  HandStage.Turn,
  HandStage.River,
  HandStage.Showdown,
] as const;

export type SettingHandStage = (typeof ALL_SETTING_STAGES)[number];

export enum PlayerAction {
  PayBlinds = 'pay-blinds',
  Check = 'check',
  Fold = 'fold',
  Call = 'call',
  Bet = 'bet',
  Raise = 'raise',
  Allin = 'allin',
  Showdown = 'showdown',
}

const ALL_PLAYER_ACTIONS = [
  PlayerAction.Check,
  PlayerAction.Fold,
  PlayerAction.Call,
  PlayerAction.Bet,
  PlayerAction.Raise,
  PlayerAction.Allin,
] as const;

export type SettingPlayerAction = (typeof ALL_PLAYER_ACTIONS)[number];

interface IGetPlayerActionsProps {
  currentBetSize: number;
  currentState?: PlayerState;
  stageClear: boolean;
}

export const getPlayerActionOptions = ({
  currentBetSize,
  currentState,
  stageClear,
}: IGetPlayerActionsProps): CheckboxOptionType[] => {
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

type BlindType = 'SB' | 'BB' | `Straddle-${number}`;

export interface HandBlindRecord {
  seat: PlayerSeat;
  type: BlindType;
  chips: number;
}

export type HandAction =
  | {
      type: 'stageBlinds';
      players: number;
    }
  | {
      type: 'stageInfo';
      stage: Exclude<SettingHandStage, HandStage.Init | HandStage.Blinds>;
      potSize: number;
      cards: Card[];
    }
  | {
      type: 'playerPayBlinds';
      seat: PlayerSeat;
      blindType: BlindType;
      chips: number;
    }
  | {
      type: 'playerShowdown';
      seat: PlayerSeat;
      cards: Card[];
    }
  | {
      type: 'playerAction';
      action: Exclude<PlayerAction, PlayerAction.PayBlinds | PlayerAction.Showdown>;
      seat: PlayerSeat;
      chips?: number;
    };

export interface IHandRecord {
  bbSize: number;
  potSize: number;
  winner: PlayerSeat;
  actions: HandAction[];
}
