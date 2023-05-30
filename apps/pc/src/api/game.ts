import { useRequest } from 'alova';
import { GameRecord } from '../models/game/types';
import { alovaInstance } from './core/alova';
import { Response } from './core/interface';

export interface AddGameParams {
  location: string;
  date: number;
  comment: string;
}

/**
 * Create new GameRecord
 * @returns
 */
export const useAddGameAPI = () => {
  return useRequest((params: AddGameParams) => alovaInstance.Post('/api/game', { ...params }), {
    immediate: false,
  });
};

/**
 * Fetch game list
 * @returns
 */
export const useGetGameListAPI = () => {
  return useRequest(alovaInstance.Get<Response<GameRecord[]>>('/api/game'), {
    force: (force: boolean) => !!force,
  });
};

/**
 * Fetch taget game record
 * @returns
 */
export const useGetGameDetailAPI = (gameId: string) => {
  return useRequest(alovaInstance.Get<Response<GameRecord>>(`/api/game/${gameId}`));
};
