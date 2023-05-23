import { atom, useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { message } from 'antd';
import { nanoid } from 'nanoid';
import { BuyInData, BuyInPlayer } from '../../models/buyIn';

const createBuyInDataHistoryAtom = atom<BuyInData[]>([
  {
    amountPerhand: 0,
    players: [],
  },
]);

const createBuyInDataIndexAtom = atom<number>(0);

const createBuyInDataAtom = atom(
  (get) => {
    const history = get(createBuyInDataHistoryAtom);
    const index = get(createBuyInDataIndexAtom);
    return history[index];
  },
  (get, set, newBuyInData: BuyInData) => {
    const history = get(createBuyInDataHistoryAtom).slice();
    const index = get(createBuyInDataIndexAtom);
    history.splice(index, 1, newBuyInData);
    set(createBuyInDataHistoryAtom, history);
  },
);

/**
 * 【BuyInPlaying】Buy In History
 */
export const useCreateBuyInDataHistory = () => {
  const [createBuyInDataHistory, setCreateBuyInDataHistory] = useAtom(createBuyInDataHistoryAtom);
  const [createBuyInDataIndex, setCreateBuyInDataIndex] = useAtom(createBuyInDataIndexAtom);

  const [viewIndex, setViewIndex] = useState(createBuyInDataIndex);

  const hasLastRecord = viewIndex > 0;

  const viewLastRecord = () => {
    if (hasLastRecord) {
      setViewIndex(viewIndex - 1);
    }
  };

  const hasNextRecord = viewIndex < createBuyInDataHistory.length - 1;

  const viewNextRecord = () => {
    if (hasNextRecord) {
      setViewIndex(viewIndex + 1);
    }
  };

  const confirmView = () => {
    setCreateBuyInDataIndex(viewIndex);
  };

  const cancelView = () => {
    setViewIndex(createBuyInDataIndex);
  };

  const addEdit = () => {
    const history = createBuyInDataHistory.slice();
    history.splice(createBuyInDataIndex + 1);
    setCreateBuyInDataHistory(history);
    setCreateBuyInDataIndex(createBuyInDataIndex + 1);
    setViewIndex(createBuyInDataIndex + 1);
  };

  return {
    viewBuyInData: createBuyInDataHistory[viewIndex],
    viewStatisticData: calcStatisticsData(createBuyInDataHistory[viewIndex]),
    hasLastRecord,
    hasNextRecord,
    viewLastRecord,
    viewNextRecord,
    confirmView,
    cancelView,
    addEdit,
  };
};

/**
 * 【Editable】Current view / edit
 * @returns
 */
export const useCreateBuyInData = () => {
  const [createBuyInData, setCreateBuyInData] = useAtom(createBuyInDataAtom);

  return useBuyInData({ buyInData: createBuyInData, setBuyInData: setCreateBuyInData });
};

interface IUseBuyInDataProps {
  buyInData: BuyInData;
  setBuyInData: (buyInData: BuyInData) => void;
}

export const useBuyInData = ({ buyInData, setBuyInData }: IUseBuyInDataProps) => {
  const statisticsData = useMemo(() => {
    return calcStatisticsData(buyInData);
  }, [buyInData]);

  const totalBenefit = useMemo(() => {
    return calcBenfit(buyInData);
  }, [buyInData]);

  const actions = useBuyInDataActions([buyInData, setBuyInData]);

  return {
    buyInData,
    statisticsData,
    totalBenefit,
    ...actions,
  };
};

type BuyInDataEntry = [buyInData: BuyInData, setBuyInData: (data: BuyInData) => void];

/**
 * 基于 buyInData 返回可选操作
 * @param param0
 * @returns
 */
export const useBuyInDataActions = ([buyInData, setBuyInData]: BuyInDataEntry) => {
  const addPlayer = () => {
    setBuyInData({
      ...buyInData,
      players: [
        ...buyInData.players,
        {
          id: nanoid(),
          name: '',
          hands: 1,
          rest: 0,
        },
      ],
    });
  };

  const removePlayer = (targetId: string) => {
    if (buyInData.players.length != 1) {
      setBuyInData({
        ...buyInData,
        players: buyInData.players.filter((player) => player.id != targetId),
      });
    } else {
      message.error('玩家不能为空');
    }
  };

  const changePlayer = (targetPlayer: BuyInPlayer, index: number) => {
    const originPlayers = buyInData.players.slice();
    if (index < 0 || index >= originPlayers.length) {
      throw new Error(`Invalid index=${index} at changePlayer`);
    }
    originPlayers.splice(index, 1, targetPlayer);
    setBuyInData({
      ...buyInData,
      players: originPlayers,
    });
  };

  const changeBuyInData = (data: BuyInData) => {
    setBuyInData(data);
  };

  return {
    addPlayer,
    removePlayer,
    changePlayer,
    changeBuyInData,
  };
};

export interface BuyInStatistics {
  totalPlayer: number;
  totalHands: number;
  totalAmount: number;
}

/**
 * 计算 BuyIn 面板导出量
 * @param param0
 * @returns
 */
export const calcStatisticsData = ({ amountPerhand, players }: BuyInData): BuyInStatistics => {
  const totalHands = players.reduce((sum, player) => sum + player.hands, 0);
  const statisticsData: BuyInStatistics = {
    totalPlayer: players.length,
    totalHands: totalHands,
    totalAmount: totalHands * amountPerhand,
  };
  return statisticsData;
};

/**
 * 计算总盈利
 * @param param0
 * @returns 总盈利
 */
const calcBenfit = ({ amountPerhand, players }: BuyInData): number => {
  return players.reduce((sum, player) => sum + player.rest - player.hands * amountPerhand, 0);
};
