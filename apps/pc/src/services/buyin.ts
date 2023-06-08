import { message } from 'antd';
import {
  useAddBuyInDataRequest,
  useRemoveBuyInDataRequest,
  useUpdateBuyInDataRequest,
} from '../api/buyin';
import { AddBuyInParams } from '../api/buyin/type';
import { invalidateGameDetail } from '../api/game';
import { createLogger } from '../common/commonLogger';
import { isSuccess } from './utils';

const buyInServiceLogger = createLogger('services/buyIn');

export const useBuyInDataAddService = () => {
  const { send: buyInAddAPI } = useAddBuyInDataRequest();

  const buyInAddService = async (addBuyInData: AddBuyInParams) => {
    const res = await buyInAddAPI(addBuyInData);
    return isSuccess(res);
  };

  return buyInAddService;
};

export const useBuyInDataUpdateService = () => {
  const { send: buyInUpdateAPI } = useUpdateBuyInDataRequest();

  const buyInAddService = async (addBuyInData: AddBuyInParams) => {
    const res = await buyInUpdateAPI(addBuyInData);
    return isSuccess(res);
  };

  return buyInAddService;
};

export const useBuyInDataRemoveService = () => {
  const { send: buyInRemoveAPI } = useRemoveBuyInDataRequest();

  const buyInRemoveService = async (gameId: string) => {
    try {
      await buyInRemoveAPI(gameId);
      invalidateGameDetail(gameId);
    } catch {
      buyInServiceLogger.log('remove failed');
      message.error('删除失败');
    }
  };

  return buyInRemoveService;
};
