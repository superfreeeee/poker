import { createLogger } from '../common/commonLogger';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';
import { IUser } from '../models/user';
import { Response } from './interface';

const userApiLogger = createLogger('api/user');

interface ILoginParams {
  id: string;
  name: string;
}

const userList = getItem(ELocalStorageKey.UserList) ?? [];

export const mockloginAPI = (params: ILoginParams): Promise<Response<IUser>> => {
  const existUser = userList.find((user) => user.name === params.name);
  const data = existUser ? { ...existUser } : { ...params };
  if (!existUser) {
    userList.push(data);
    setItem(ELocalStorageKey.UserList, userList);
  }

  userApiLogger.log('mockloginAPI:', data);
  return Promise.resolve({
    code: 200,
    data,
  } as Response<IUser>);
};

export const loginAPI = ({ id, name }: ILoginParams): Promise<Response<IUser>> => {
  // TODO add real API
  return mockloginAPI({ id, name });
};
