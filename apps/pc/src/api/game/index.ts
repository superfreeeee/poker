// eslint-disable-next-line import/named
import { invalidateCache, useRequest } from 'alova';
import { Response } from '../core/interface';
import { alovaInstance } from '../core';
import { typeTransformer } from '../../common/commonApiTransformer';
import { transformGameVOToRecord } from './transformer';
import { AddGameParams, GameVO } from './types';

export * from './types';
export { transformGameVOToRecord };

/**
 * Fetch game list
 * @returns
 */
const gameListAPI = alovaInstance.Get('/api/game/list', {
  // invalidate in 60s
  localCache: 60 * 1000,
  transformData: typeTransformer((data: GameVO[]) => {
    return data.map(transformGameVOToRecord);
  }),
});

export const useGameListAPI = () => {
  return useRequest(gameListAPI, {
    initialData: [],
    force: (force: boolean) => !!force,
  });
};

/**
 * Fetch taget game record
 * @returns
 */
const gameDetailAPI = (gameId: string) =>
  alovaInstance.Get(`/api/game`, {
    params: { id: gameId },
    transformData: typeTransformer(transformGameVOToRecord),
  });

export const invalidateGameDetail = (gameId: string) => {
  invalidateCache(gameDetailAPI(gameId));
};

export const useGameDetailAPI = (gameId: string) => {
  return useRequest(gameDetailAPI(gameId), {
    initialData: null,
    force: (force: boolean) => !!force,
  });
};

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
