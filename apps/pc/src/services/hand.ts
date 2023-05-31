import { AddHandParams, useAddHandAPI, useHandDetailAPI } from '../api/hand';
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

export const useHandDetailService = (gameId: string, handId: string) => {
  const { data: handDetail } = useHandDetailAPI(gameId, handId);

  return { handDetail };
};
