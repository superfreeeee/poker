import { useRequest } from 'alova';
import type { Response } from '../core/interface';
import { alovaInstance } from '../core';
import type { AddHandParams, HandVO } from './types';

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
