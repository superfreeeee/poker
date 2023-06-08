import { useCallback } from 'react';
import { message } from 'antd';
import { ECode } from '../api/core/interface';
import { ILoginParams, useLoginAPI, useGetUserInfoAPI } from '../api/user';
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
  const { send: getLoginInfoAPI } = useGetUserInfoAPI();

  const validateLoginService = useCallback(
    async (userId: string) => {
      try {
        await getLoginInfoAPI(userId);
        return Promise.resolve('Valid User');
      } catch (e) {
        if (e.code == ECode.NonExistUser) {
          message.error('用户不存在，请重新登入');
          return Promise.reject('User does not exist');
        } else if (e.code == ECode.InvalidUser) {
          message.error('登入已过期，请重新登入');
          return Promise.reject('Current state is expired');
        }
        return Promise.reject('Invalid user');
      }
    },
    [getLoginInfoAPI],
  );

  return validateLoginService;
};
