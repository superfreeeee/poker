import { ECode, Response } from '../api/core/interface';

export const isSuccess = <T>(response: Response<T>): boolean => {
  return response.code === ECode.Success;
};
