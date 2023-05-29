import { useRequest } from 'alova';
import { IUser } from '../models/user';
import { alovaInstance } from './alova';
import { Response } from './interface';

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
