import { useMemo } from 'react';
import { useAddGameAPI, useGetGameListAPI } from '../api/game';

export const useGameListService = () => {
  const { data: res, send } = useGetGameListAPI();

  const gameList = useMemo(() => {
    if (res) {
      return (res as any).data;
    }
    return [];
  }, [res]);

  const updateGameList = () => {
    send(true);
  };

  return { gameList, updateGameList };
};

export const useAddGameService = () => {
  const { send: addGameAPI } = useAddGameAPI();

  const addGameService = async (params) => {
    const res = await addGameAPI(params);
    console.log('addGame', res);
  };

  return addGameService;
};
