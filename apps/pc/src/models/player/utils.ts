import { logger } from '../../common/commonLogger';
import { PlayerSeat } from './types';

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
      logger.warn(`[getPlayerSeats] Invalid players = ${players}, use default`, ALL_PLAYER_SEATS);

    // eslint-disable-next-line no-fallthrough
    case 10:
      return ALL_PLAYER_SEATS;
  }
};

/**
 * string => PlayerSeat
 * @param maybeSeat
 * @returns
 */
export const isPlayerSeat = (maybeSeat: string): maybeSeat is PlayerSeat => {
  return (ALL_PLAYER_SEATS as string[]).includes(maybeSeat);
};
