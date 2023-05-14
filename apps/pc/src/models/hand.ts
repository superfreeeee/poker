import { Card } from './card';
import { PlayerSeat } from './player';

export enum HandStage {
  Init = 'Init', // players unknown
  Blinds = 'Blinds', // setting blinds
  PreFlop = 'Pre-Flop',
  Flop = 'Flop',
  Turn = 'Turn',
  River = 'River',
  Showdown = 'Showdown', // show cards

  PostFlop = 'Post-Flop', // info stage
}

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

export const ALL_PLAYER_ACTIONS = [
  PlayerAction.Check,
  PlayerAction.Fold,
  PlayerAction.Call,
  PlayerAction.Bet,
  PlayerAction.Raise,
  PlayerAction.Allin,
] as const;

export type SettingPlayerAction = (typeof ALL_PLAYER_ACTIONS)[number];

type BlindType = 'SB' | 'BB' | `Straddle-${number}`;

export interface HandBlindRecord {
  seat: PlayerSeat;
  type: BlindType;
  chips: number;
}

export type HandAction =
  | {
      type: 'stageInit';
      players: number;
    }
  | {
      type: 'stageBlinds';
      potSize: number;
      blinds: HandBlindRecord[];
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
