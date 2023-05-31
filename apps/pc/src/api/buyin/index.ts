import { useRequest } from 'alova';
import { alovaInstance } from '../core';
import { Response } from '../core/interface';
import { AddBuyInParams } from './type';

const addBuyInDataAPI = (params: AddBuyInParams) =>
  alovaInstance.Post<Response<void>>('/api/buyin', params);

export const useAddBuyInDataRequest = () => useRequest(addBuyInDataAPI, { immediate: false });

const updateBuyInDataAPI = (params: AddBuyInParams) =>
  alovaInstance.Put<Response<void>>('/api/buyin', params);

export const useUpdateBuyInDataRequest = () => useRequest(updateBuyInDataAPI, { immediate: false });