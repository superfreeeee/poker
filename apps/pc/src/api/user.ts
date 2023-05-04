import { createLogger } from '../common/commonLogger';
import { IUser } from '../models/user';
import { Response } from './interface';

const userApiLogger = createLogger('api/user');

interface ILoginParams {
  id: string;
  name: string;
}

export const mockloginAPI = (params: ILoginParams) => {
  userApiLogger.log('mockloginAPI:', params);

  return Promise.resolve({
    code: 200,
    data: { ...params },
  } as Response<IUser>);
};

export const loginAPI = ({ id, name }: ILoginParams): Promise<Response<IUser>> => {
  // TODO add real API
  return mockloginAPI({ id, name });
};
