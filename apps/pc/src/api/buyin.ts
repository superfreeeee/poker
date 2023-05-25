import { useRequest } from 'alova';
import { BuyInData } from '../models/buyIn';
import { alovaInstance } from './alova';
import { Response } from './interface';

export const useBuyInDataAddAPI = () => {
  return useRequest(
    (buyInData: BuyInData) =>
      alovaInstance.Post<Response<string>, BuyInData>('/api/buyin/add', buyInData, {
        headers: { 'Content-Type': 'application/json' },
      }),
    { immediate: false },
  );
};
