import { useRequest } from 'alova';
import { alovaInstance } from './alova';
import { Response } from './interface';

/**
 * Post new buyInData
 * @returns id
 */
export const useAddBuyInDataAPI = () => {
  return useRequest((params) => alovaInstance.Post<Response<string>>('/buyin/add', { ...params }), {
    immediate: false,
  });
};
