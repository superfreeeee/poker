// eslint-disable-next-line import/named
import { invalidateCache, useRequest } from 'alova';
import { GameRecord } from '../../models/game';
import { isSuccess } from '../../services/utils';
import { createLogger } from '../../common/commonLogger';
import { Response } from '../core/interface';
import { alovaInstance } from '../core';
import { transformGameVOToRecord } from './transformer';
import { AddGameParams, GameVO } from './types';

export * from './types';
export { transformGameVOToRecord };

const gameApiLogger = createLogger('api/game');

/**
 * Fetch game list
 * @returns
 */
const gameListAPI = alovaInstance.Get<GameRecord[], Response<GameVO[]>>('/api/game/list', {
  transformData: (res) => {
    if (isSuccess(res)) {
      try {
        // gameRecords
        return res.data.map(transformGameVOToRecord);
      } catch (e) {
        gameApiLogger.error('gameListAPI: transform error', e);
        return Promise.reject(new TypeError('response invalid GameVO[]'));
      }
    }

    return Promise.reject(res);
  },
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
  alovaInstance.Get<GameRecord | null, Response<GameVO>>(`/api/game`, {
    params: { id: gameId },
    transformData: (res) => {
      if (isSuccess(res)) {
        try {
          // gameRecord
          return transformGameVOToRecord(res.data);
        } catch (e) {
          gameApiLogger.error('gameListAPI: transform error', e);
          return Promise.reject(new TypeError('response invalid GameVO'));
        }
      }

      return Promise.reject(res);
    },
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
