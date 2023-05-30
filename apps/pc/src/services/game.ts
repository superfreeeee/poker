import { AddGameParams, useAddGameAPI, useGetGameDetailAPI, useGetGameListAPI } from '../api/game';
import { isSuccess, useResponseData } from './utils';

/**
 * Query game records
 * @returns
 */
export const useGameListService = () => {
  const { data: res, send: getGameListAPI } = useGetGameListAPI();

  const gameList = useResponseData(res, []);

  const updateGameList = () => getGameListAPI(true);

  return { gameList, updateGameList };
};

/**
 * Query game record by gameId
 * @returns
 */
export const useGameDetailService = (gameId: string) => {
  const { data: res, loading, send: getGameDetailAPI } = useGetGameDetailAPI(gameId);

  const gameDetail = useResponseData(res, null);

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
