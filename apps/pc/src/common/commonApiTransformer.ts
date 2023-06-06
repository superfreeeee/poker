import { isSuccess } from '../services/utils';
import { Response } from '../api/core/interface';

export const baseTransformer = <T>(res: Response<T>) => {
  if (isSuccess(res)) {
    return res.data;
  }
  return Promise.reject(res);
};

export const typeTransformer = <T1, T2>(transformer: (data: T1) => T2) => {
  return function (res: Response<T1>) {
    if (isSuccess(res)) {
      try {
        return transformer(res.data);
      } catch (e) {
        return Promise.reject(new TypeError('response invalid type'));
      }
    }
    return Promise.reject(res);
  };
};
