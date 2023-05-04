import { ECode, Response } from '../api/interface';

export const isSuccess = <T>(response: Response<T>): boolean => {
  return response.code === ECode.Success;
};
