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

const ALL_PLAYER_SEATS: PlayerSeat[] = [
  PlayerSeat.SB,
  PlayerSeat.BB,
  PlayerSeat.UTG,
  PlayerSeat.UTG1,
  PlayerSeat.MP,
  PlayerSeat.MP2,
  PlayerSeat.LJ,
  PlayerSeat.HJ,
  PlayerSeat.CO,
  PlayerSeat.BTN,
];

/**
 * Get player seat by player number
 * @param players
 */
export const getPlayerSeats = (
  players: 0 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | number,
): PlayerSeat[] => {
  switch (players) {
    case 0:
      return [];
    case 2:
      return [PlayerSeat.SB, PlayerSeat.BTN];
    case 4:
      return [PlayerSeat.SB, PlayerSeat.BB, PlayerSeat.CO, PlayerSeat.BTN];
    case 5:
      return [PlayerSeat.SB, PlayerSeat.BB, PlayerSeat.UTG, PlayerSeat.CO, PlayerSeat.BTN];
    case 6:
      return [
        PlayerSeat.SB,
        PlayerSeat.BB,
        PlayerSeat.UTG,
        PlayerSeat.MP,
        PlayerSeat.CO,
        PlayerSeat.BTN,
      ];
    case 7:
      return [
        PlayerSeat.SB,
        PlayerSeat.BB,
        PlayerSeat.UTG,
        PlayerSeat.MP,
        PlayerSeat.HJ,
        PlayerSeat.CO,
        PlayerSeat.BTN,
      ];
    case 8:
      return [
        PlayerSeat.SB,
        PlayerSeat.BB,
        PlayerSeat.UTG,
        PlayerSeat.MP,
        PlayerSeat.LJ,
        PlayerSeat.HJ,
        PlayerSeat.CO,
        PlayerSeat.BTN,
      ];
    case 9:
      return [
        PlayerSeat.SB,
        PlayerSeat.BB,
        PlayerSeat.UTG,
        PlayerSeat.UTG1,
        PlayerSeat.MP,
        PlayerSeat.LJ,
        PlayerSeat.HJ,
        PlayerSeat.CO,
        PlayerSeat.BTN,
      ];
    default:
      console.warn(`[getPlayerSeats] Invalid players = ${players}`);

    case 10:
      return ALL_PLAYER_SEATS;
  }
};
