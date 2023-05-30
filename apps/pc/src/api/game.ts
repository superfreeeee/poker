import { useRequest } from 'alova';
import { Response } from './core/interface';
import { alovaInstance } from './core';
import { HandVO } from './hand';

export interface AddGameParams {
  location: string;
  date: number;
  comment: string;
}

interface BuyInPlayerVO {
  id: string;
  name: string;
  buyInChips: number;
  buyInHands: number;
  restChips: number;
}

interface BuyInVO {
  chipsPerHand: number;
  players: BuyInPlayerVO[];
}

export interface GameVO {
  id: string;
  location: string;
  date: number;
  createTime: number;
  comment: string | null;
  buyInData: BuyInVO | null;
  handRecords: HandVO[] | null;
}

/**
 * Create new GameRecord
 * @returns
 */
export const useAddGameAPI = () => {
  return useRequest(
    (params: AddGameParams) => alovaInstance.Post<Response<GameVO>>('/api/game', { ...params }),
    { immediate: false },
  );
};

/**
 * Fetch game list
 * @returns
 */
export const useGetGameListAPI = () => {
  return useRequest(alovaInstance.Get<Response<GameVO[]>>('/api/game'), {
    force: (force: boolean) => !!force,
  });
};

/**
 * Fetch taget game record
 * @returns
 */
export const useGetGameDetailAPI = (gameId: string) => {
  return useRequest(alovaInstance.Get<Response<GameVO>>(`/api/game/${gameId}`), {
    force: (force: boolean) => !!force,
  });
};
