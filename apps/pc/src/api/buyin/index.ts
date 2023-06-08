import { useRequest } from 'alova';
import { baseTransformer } from '../../common/commonApiTransformer';
import { alovaInstance } from '../core';
import { Response } from '../core/interface';
import { AddBuyInParams } from './type';

const addBuyInDataAPI = (params: AddBuyInParams) =>
  alovaInstance.Post<Response<void>>('/api/buyin', params);

export const useAddBuyInDataRequest = () => useRequest(addBuyInDataAPI, { immediate: false });

const updateBuyInDataAPI = (params: AddBuyInParams) =>
  alovaInstance.Put<Response<void>>('/api/buyin', params);

export const useUpdateBuyInDataRequest = () => useRequest(updateBuyInDataAPI, { immediate: false });

const removeBuyInDataAPI = (gameId: string) =>
  alovaInstance.Post<Response<void>>('/api/buyin/remove', {
    gameId: gameId,
    transformData: baseTransformer,
  });

export const useRemoveBuyInDataRequest = () => useRequest(removeBuyInDataAPI, { immediate: false });
