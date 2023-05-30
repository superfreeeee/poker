export interface Player {
  id: string;
  name: string;
}

export enum PlayerSeat {
  SB = 'SB', // Small blind
  BB = 'BB', // Big blind
  UTG = 'UTG', // Under the gun
  UTG1 = 'UTG+1',
  MP = 'MP', // Middle position
  MP2 = 'MP2',
  LJ = 'LJ', // Low jack
  HJ = 'HJ', // High jack
  CO = 'CO', // Cut off
  BTN = 'BTN', // Button / Dealer
}

// TODO move outside
export type PlayerState = {
  seat: PlayerSeat;
  fold: boolean;
  actioned: boolean;
  chips: number;
  showdown: boolean;
};
