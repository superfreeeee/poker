import { ECode, Response } from '../api/core/interface';

/**
 * code === 200 && data exist
 * @param response
 * @param emptyData
 * @returns
 */
export const isSuccess = <T>(
  response: Response<T> | undefined,
  emptyData = false,
): response is Required<Response<T>> => {
  return !!response && response.code === ECode.Success && (emptyData || !!response.data);
};
