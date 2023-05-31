import type { AddBuyInParams } from '../api/buyin/type';
export interface BuyInData {
  amountPerhand: number;
  players: BuyInPlayer[];
}

export interface BuyInPlayer {
  id: string;
  name: string;
  hands: number; // 买入手数
  rest: number; // 剩余筹码
}

export interface AddBuyInData {
  gameId: string;
  buyInData: BuyInData;
}

export const transformBuyInDataToGameBuyInDataVo = ({
  gameId,
  buyInData,
}: AddBuyInData): AddBuyInParams => {
  return {
    gameId,
    chipsPerHand: buyInData.amountPerhand,
    players: buyInData.players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        buyInHands: player.hands,
        restChips: player.rest,
        buyInChips: player.hands * buyInData.amountPerhand,
      };
    }),
  };
};
