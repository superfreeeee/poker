import { useMemo } from 'react';
import { useAddGameAPI, useGetGameDetailAPI, useGetGameListAPI } from '../api/game';

/**
 * Query game records
 * @returns
 */
export const useGameListService = () => {
  const { data: res, send } = useGetGameListAPI();

  const gameList = useMemo(() => res?.data ?? [], [res]);

  const updateGameList = () => send(true);

  return { gameList, updateGameList };
};

/**
 * Query game record by gameId
 * @returns
 */
export const useGameDetailService = (gameId: string) => {
  const { data: res, loading } = useGetGameDetailAPI(gameId);

  const gameDetail = useMemo(() => res?.data ?? null, [res]);

  return { loading, gameDetail };
};

/**
 * Add new game record
 * @returns
 */
export const useAddGameService = () => {
  const { send: addGameAPI } = useAddGameAPI();

  const addGameService = async (params) => {
    await addGameAPI(params);
    // const res = await addGameAPI(params);
    // console.log('addGame', res);
  };

  return addGameService;
};
