import { useRequest } from 'alova';
import { createLogger } from '../../common/commonLogger';
import { isSuccess } from '../../services/utils';
import { HandRecord } from '../../models/hand';
import type { Response } from '../core/interface';
import { alovaInstance } from '../core';
import type { AddHandParams, HandVO } from './types';
import { transformHandVOToRecord } from './transformer';

export * from './types';
export { transformHandVOToRecord } from './transformer';

const handApiLogger = createLogger('api/hand');

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
      transformData: (res) => {
        if (isSuccess(res)) {
          try {
            // HandRecord
            return transformHandVOToRecord(res.data);
          } catch (e) {
            handApiLogger.error('useHandDetailAPI: transform error', e);
            return Promise.reject(new TypeError('response invalid HandVO'));
          }
        }

        return Promise.reject(res);
      },
    }),
  );
};
