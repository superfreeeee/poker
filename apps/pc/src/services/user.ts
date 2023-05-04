import { nanoid } from 'nanoid';
import { loginAPI } from '../api/user';
import { createLogger } from '../common/commonLogger';
import { IUser } from '../models/user';
import { isSuccess } from './utils';

const userSerivceLogger = createLogger('services/user');

export const loginService = async (name: string): Promise<IUser | null> => {
  try {
    const res = await loginAPI({ id: nanoid(), name });
    if (isSuccess(res) && res.data) {
      return res.data;
    }
    return null;
  } catch {
    userSerivceLogger.error('loginAPI failed', { name });
    return null;
  }
};
