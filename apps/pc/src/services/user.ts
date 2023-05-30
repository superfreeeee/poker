import { ILoginParams, useLoginAPI } from '../api/user';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from './utils';

const userSerivceLogger = createLogger('services/user');

/**
 * Login service
 * @returns
 */
export const useLoginService = () => {
  const { send: loginAPI } = useLoginAPI();

  const loginService = async (params: ILoginParams) => {
    try {
      const res = await loginAPI(params);
      if (isSuccess(res)) {
        return res.data;
      }
      return null;
    } catch {
      userSerivceLogger.error('loginAPI failed', { name: params.name });
      return null;
    }
  };

  return loginService;
};
