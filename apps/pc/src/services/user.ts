import { useCallback } from 'react';
import { ILoginParams, useLoginAPI, useValidateLoginAPI } from '../api/user';
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

export const useValidateLoginService = () => {
  const { send: validateLoginAPI } = useValidateLoginAPI();

  const validateLoginService = useCallback(async (userId: string) => {
    try {
      userSerivceLogger.log('logHere');
      await validateLoginAPI(userId);
      return Promise.resolve('Valid User');
    } catch {
      userSerivceLogger.log('loginResult', 'invalid user');
      return Promise.reject('Invalid User');
    }
  }, [validateLoginAPI]);

  return validateLoginService;
};
