import { useRequest } from 'alova';
import { GameRecord } from '../models/game/types';
import { HandRecord } from '../models/hand';
import { EncodedCard } from '../models/card';
import { alovaInstance } from './core';
import { Response } from './core/interface';

export interface AddGameParams {
  location: string;
  date: number;
  comment: string;
}

type GameRecordVO = Omit<GameRecord, 'handRecords'> & {
  handRecords: Array<
    Omit<HandRecord, 'boardCards' | 'actions'> & {
      boardCards: EncodedCard[];
      actions: any[];
    }
  >;
};

/**
 * Create new GameRecord
 * @returns
 */
export const useAddGameAPI = () => {
  return useRequest(
    (params: AddGameParams) =>
      alovaInstance.Post<Response<GameRecordVO>>('/api/game', { ...params }),
    { immediate: false },
  );
};

/**
 * Fetch game list
 * @returns
 */
export const useGetGameListAPI = () => {
  return useRequest(alovaInstance.Get<Response<GameRecordVO[]>>('/api/game'), {
    force: (force: boolean) => !!force,
  });
};

/**
 * Fetch taget game record
 * @returns
 */
export const useGetGameDetailAPI = (gameId: string) => {
  return useRequest(alovaInstance.Get<Response<GameRecordVO>>(`/api/game/${gameId}`), {
    force: (force: boolean) => !!force,
  });
};
