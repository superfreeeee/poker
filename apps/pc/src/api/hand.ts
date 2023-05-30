import { useRequest } from 'alova';
import { Player } from '../models/player';
import { EncodedCard } from '../models/card';
import { Response } from './core/interface';
import { alovaInstance } from './core';

export interface AddHandParams {
  gameId: string;
  players: Player[];
  blinds: HandBlindVO[];
  boardCards: EncodedCard[];
  actions: HandActionVO[];
}

interface HandBlindVO {
  seat: string;
  chips: number;
}

interface HandActionVO {
  type: string;
  players?: number;
  stage?: string;
  potSize?: number;
  cards?: EncodedCard[] | null;
  seat?: string;
  chips?: number;
  action?: string;
}

export interface HandVO {
  id: string;
  createTime: number;
  players: Player[];
  blinds: HandBlindVO[];
  boardCards: EncodedCard[];
  actions: HandActionVO[];
}

/**
 * Create new GameRecord
 * @returns
 */
export const useAddHandAPI = () => {
  return useRequest(
    (params: AddHandParams) => alovaInstance.Post<Response<HandVO>>('/api/hand', { ...params }),
    { immediate: false },
  );
};
