import { message } from 'antd';
import type { AddGameParams } from '../api/game';
import { useAddGameAPI, useGameListAPI, useGameDetailAPI } from '../api/game';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from './utils';

const gameServiceLogger = createLogger('services/game');

/**
 * Query game records
 * @returns
 */
export const useGameListService = () => {
  const { data: gameList, send: gameListAPI, onError } = useGameListAPI();

  onError((event) => {
    gameServiceLogger.error('useGameListService: request error', event);
    message.error('获取游戏列表失败');
  });

  const updateGameList = () => gameListAPI(true);

  return { gameList, updateGameList };
};

/**
 * Query game record by gameId
 * @returns
 */
export const useGameDetailService = (gameId: string) => {
  const { data: gameDetail, loading, send: gameDetailAPI } = useGameDetailAPI(gameId);

  const reloadGameDetail = () => gameDetailAPI(true);

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
