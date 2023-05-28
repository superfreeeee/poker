import { useRequest } from 'alova';
import { alovaInstance } from './alova';

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
  return useRequest(alovaInstance.Get('/api/game'), {
    force: (force: boolean) => !!force,
  });
};
