import { useRequest } from 'alova';
import { IUser } from '../models/user';
import { baseTransformer } from '../common/commonApiTransformer';
import { alovaInstance } from './core';
import { Response } from './core/interface';

export interface ILoginParams {
  name: string;
}

export const useLoginAPI = () => {
  return useRequest(
    ({ name }: ILoginParams) =>
      alovaInstance.Post<Response<IUser>, ILoginParams>('/api/user', { name }),
    { immediate: false },
  );
};

export const useGetUserInfoAPI = () => {
  return useRequest(
    (userId: string) =>
      alovaInstance.Get<Response<IUser | null>>(`/api/user`, {
        params: { uid: userId },
        transformData: (res:Response<IUser|null>) => baseTransformer(res),
      }),
    { immediate: false },
  );
};
