import { useRequest } from 'alova';
import { GameRecord } from '../models/game/types';
import { alovaInstance } from './alova';
import { Response } from './interface';

/**
 * Create new GameRecord
 * @returns
 */
export const useAddGameAPI = () => {
  return useRequest((params) => alovaInstance.Post('/api/game', { ...params }), {
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
