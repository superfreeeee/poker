import { useMemo } from 'react';
import { message } from 'antd';
import { AddGameParams, useAddGameAPI, useGetGameDetailAPI, useGetGameListAPI } from '../api/game';
import { GameRecord, transformGameVOToRecord } from '../models/game';
import { createLogger } from '../common/commonLogger';
import { isSuccess, useResponseData } from './utils';

const gameServiceLogger = createLogger('services/game');

/**
 * Query game records
 * @returns
 */
export const useGameListService = () => {
  const { data: res, send: getGameListAPI, onError } = useGetGameListAPI();

  onError((event) => {
    gameServiceLogger.error('useGameListService: request error', event);
    message.error('获取游戏列表失败');
  });

  const gameList = useMemo<GameRecord[]>(() => {
    if (!isSuccess(res)) {
      return [];
    }

    try {
      const gameList = res.data.map(transformGameVOToRecord);
      return gameList;
    } catch (e) {
      gameServiceLogger.error('useGameListService: transform error', e);
      return [];
    }
  }, [res]);

  const updateGameList = () => getGameListAPI(true);

  return { gameList, updateGameList };
};

/**
 * Query game record by gameId
 * @returns
 */
export const useGameDetailService = (gameId: string) => {
  const { data: res, loading, send: getGameDetailAPI } = useGetGameDetailAPI(gameId);

  const gameDetail = useMemo<GameRecord | null>(() => {
    if (!isSuccess(res)) {
      return null;
    }
    try {
      return transformGameVOToRecord(res.data);
    } catch (e) {
      gameServiceLogger.error('useGameDetailService: transform error', e);
      return null;
    }
  }, [res]);
  useResponseData(res, null);

  const reloadGameDetail = () => getGameDetailAPI(true);

  return { loading, gameDetail, reloadGameDetail };
};

/**
 * Add new game record
 * @returns
 */
export const useAddGameService = () => {
  const { send: addGameAPI } = useAddGameAPI();

  const addGameService = async (params: AddGameParams) => {
    const res = await addGameAPI(params);
    return isSuccess(res);
  };

  return addGameService;
};
