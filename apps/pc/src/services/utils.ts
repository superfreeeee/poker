import { useMemo } from 'react';
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

/**
 * Extract data from response
 * @param response
 * @param defaultValue
 * @returns
 */
export const useResponseData = <T>(response: Response<T> | undefined, defaultValue: T) => {
  return useMemo(() => (isSuccess(response) ? response.data : defaultValue), [response]);
};
