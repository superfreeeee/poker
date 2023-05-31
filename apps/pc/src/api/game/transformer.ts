import type { BuyInPlayer } from '../../models/buyIn';
import type { GameRecord } from '../../models/game';
import { transformHandVOToRecord } from '../hand';
import type { GameVO } from './types';

/**
 * GameVO => GameRecord
 * @param gameVO
 * @returns
 */
export const transformGameVOToRecord = (gameVO: GameVO): GameRecord => {
  const { id, location, date, createTime, comment, buyInData, handRecords } = gameVO;

  return {
    id,
    createTime,
    location,
    date,
    comment,
    buyInData: buyInData
      ? {
          amountPerhand: buyInData.chipsPerHand,
          players: buyInData.players.map((player): BuyInPlayer => {
            return {
              id: player.id,
              name: player.name,
              hands: player.buyInHands,
              rest: player.restChips,
            };
          }),
        }
      : null,
    handRecords: handRecords?.map(transformHandVOToRecord) ?? [],
  };
};
