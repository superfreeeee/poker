import { useLoginAPI } from '../api/user';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from './utils';

const userSerivceLogger = createLogger('services/user');

/**
 * Login service
 * @returns
 */
export const useLoginService = () => {
  const { send: loginAPI } = useLoginAPI();

  const loginService = async (name: string) => {
    try {
      const res = await loginAPI({ name });
      console.log(`login: res =`, res, { ...res });
      if (isSuccess(res) && res.data) {
        return res.data;
      }
      return null;
    } catch {
      userSerivceLogger.error('loginAPI failed', { name });
      return null;
    }
  };

  return loginService;
};
