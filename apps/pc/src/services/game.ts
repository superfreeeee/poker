import { useMemo } from 'react';
import { AddGameParams, useAddGameAPI, useGetGameDetailAPI, useGetGameListAPI } from '../api/game';
import { isSuccess } from './utils';

/**
 * Query game records
 * @returns
 */
export const useGameListService = () => {
  const { data: res, send } = useGetGameListAPI();

  const gameList = useMemo(() => (isSuccess(res) ? res.data : []), [res]);

  const updateGameList = () => send(true);

  return { gameList, updateGameList };
};

/**
 * Query game record by gameId
 * @returns
 */
export const useGameDetailService = (gameId: string) => {
  const { data: res, loading } = useGetGameDetailAPI(gameId);

  const gameDetail = useMemo(() => (isSuccess(res) ? res.data : null), [res]);

  return { loading, gameDetail };
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
