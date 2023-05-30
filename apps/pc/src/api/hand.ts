import { useRequest } from 'alova';
import { HandRecord } from '../models/hand';
import { EncodedCard } from '../models/card';
import { alovaInstance } from './core';
import { Response } from './core/interface';

export type AddHandParams = Pick<HandRecord, 'players' | 'blinds'> & {
  gameId: string;
  boardCards: EncodedCard[];
  actions: any[];
};

type HandRecordVO = Omit<AddHandParams, 'gameId'>;

/**
 * Create new GameRecord
 * @returns
 */
export const useAddHandAPI = () => {
  return useRequest(
    (params: AddHandParams) =>
      alovaInstance.Post<Response<HandRecordVO>>('/api/hand', { ...params }),
    { immediate: false },
  );
};
