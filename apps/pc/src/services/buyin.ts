import { useAddBuyInDataRequest, useUpdateBuyInDataRequest } from '../api/buyin';
import { AddBuyInParams } from '../api/buyin/type';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from './utils';

const buyInServiceLogger = createLogger('services/buyIn');

export const useBuyInDataAddService = () => {
  const { send: buyInAddAPI } = useAddBuyInDataRequest();

  const buyInAddService = async (addBuyInData: AddBuyInParams) => {
    buyInServiceLogger.log('after transform',addBuyInData)
    const res = await buyInAddAPI(addBuyInData);
    return isSuccess(res);
  };

  return buyInAddService;
};

export const useBuyInDataUpdateService = () => {
  const { send: buyInUpdateAPI } = useUpdateBuyInDataRequest();

  const buyInAddService = async (addBuyInData: AddBuyInParams) => {
    buyInServiceLogger.log('after transform',addBuyInData)
    const res = await buyInUpdateAPI(addBuyInData);
    return isSuccess(res);
  };

  return buyInAddService;
};
