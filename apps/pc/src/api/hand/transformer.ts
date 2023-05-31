import type { HandAction, HandBlindRecord, HandRecord } from '../../models/hand';
import { decodeCard } from '../../models/card';
import { isPlayerSeat } from '../../models/player';
import type { HandVO } from './types';

/**
 * HandVO => HandRecord
 * @param handVO
 * @returns
 */
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
