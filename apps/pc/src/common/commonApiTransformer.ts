import { isSuccess } from '../services/utils';
import { Response } from '../api/core/interface';

export const baseTransformer = <T>(
  res: Response<T>,
): Response<T | null> | Promise<Response<T | null>> => {
  if (isSuccess(res)) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

export const typeTransformer = <T1, T2>(res: Response<T1>, transformer: (data: T1) => T2) => {
  if (isSuccess(res)) {
    try {
      return transformer(res.data);
    } catch (e) {
      return Promise.reject(new TypeError('response invalid type'));
    }
  }
  return Promise.reject(res);
};
