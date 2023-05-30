import { useRequest } from 'alova';
import { alovaInstance } from './core/alova';
import { Response } from './core/interface';

interface AddBuyInPlayer {
  id?: string;
  name: string;
  // Either buyInChips or buyInHands required
  buyInChips?: number;
  buyInHands?: number;
  resetChips: number;
}

interface AddBuyInParams {
  gameId: string;
  chipsPerHand: number;
  players: AddBuyInPlayer[];
}

/**
 * Post new buyInData
 * @returns id
 */
export const useAddBuyInDataAPI = () => {
  return useRequest(
    (params: AddBuyInParams) => alovaInstance.Post<Response<string>>('/buyin/add', { ...params }),
    { immediate: false },
  );
};
