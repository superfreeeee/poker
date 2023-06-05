import { useRequest } from 'alova';
import { IUser } from '../models/user';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from '../services/utils';
import { alovaInstance } from './core';
import { Response } from './core/interface';

const validLogger = createLogger('user');

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

export const useGetLoginInfoAPI = () => {
  return useRequest(
    (userId: string) =>
      alovaInstance.Get<Response<IUser | null>, Response<IUser>>(`/api/user`, {
        params: { uid: userId },
        transformData: (res) => {
          validLogger.log('user/get', res);
          if (isSuccess(res)) {
            return res;
          } else {
            return Promise.reject(res);
          }
        },
      }),
    { immediate: false },
  );
};
