import { useRequest } from 'alova';
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
const gameListAPI = alovaInstance.Get<Response<GameRecord[]>, Response<GameVO[]>>('/api/game', {
  transformData: (res) => {
    if (isSuccess(res)) {
      try {
        const gameRecords = res.data.map(transformGameVOToRecord);
        return { ...res, data: gameRecords };
      } catch (e) {
        gameApiLogger.error('gameListAPI: transform error', e);
        return Promise.reject(new TypeError('response invalid GameVO[]'));
      }
    }

    return { ...res, data: [] };
  },
});

export const useGameListAPI = () => {
  return useRequest(gameListAPI, {
    force: (force: boolean) => !!force,
  });
};

/**
 * Fetch taget game record
 * @returns
 */
const gameDetailAPI = (gameId: string) =>
  alovaInstance.Get<Response<GameRecord | null>, Response<GameVO>>(`/api/game/${gameId}`, {
    transformData: (res) => {
      if (isSuccess(res)) {
        try {
          const gameRecord = transformGameVOToRecord(res.data);
          return { ...res, data: gameRecord };
        } catch (e) {
          gameApiLogger.error('gameListAPI: transform error', e);
          return Promise.reject(new TypeError('response invalid GameVO'));
        }
      }
      return { ...res, data: null };
    },
  });

export const useGameDetailAPI = (gameId: string) => {
  return useRequest(gameDetailAPI(gameId), {
    force: (force: boolean) => !!force,
  });
};
