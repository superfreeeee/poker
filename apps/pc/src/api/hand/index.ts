import { useRequest } from 'alova';
import { HandRecord } from '../../models/hand';
import type { Response } from '../core/interface';
import { alovaInstance } from '../core';
import { typeTransformer } from '../../common/commonApiTransformer';
import type { AddHandParams, HandVO } from './types';
import { transformHandVOToRecord } from './transformer';

export * from './types';
export { transformHandVOToRecord } from './transformer';

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

/**
 * Get hand record detail
 * @param gameId
 * @param handId
 * @returns
 */
export const useHandDetailAPI = (gameId: string, handId: string) => {
  return useRequest(
    alovaInstance.Get<HandRecord | null, Response<HandVO>>('/api/hand', {
      params: { gameId, handId },
      transformData: (res) => typeTransformer(res, transformHandVOToRecord),
    }),
  );
};
