import { AddHandParams, useAddHandAPI } from '../api/hand';
import { isSuccess } from './utils';

/**
 * Create new hand record
 * @returns
 */
export const useAddHandService = () => {
  const { send: addHandAPI } = useAddHandAPI();

  const addHandService = async (params: AddHandParams) => {
    const res = await addHandAPI(params);
    return isSuccess(res) && res.data;
  };

  return addHandService;
};
