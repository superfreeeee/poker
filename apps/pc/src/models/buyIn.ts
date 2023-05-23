import { useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { message } from 'antd';

export interface BuyInData {
  amountPerhand: number;
  players: BuyInPlayer[];
}

export interface BuyInPlayer {
  id: string;
  name: string;
  hands: number; // 买入手数
  rest: number; // 剩余筹码
}

// const getDefaultUser = () =>{
//   // hook?
//   // const defaultPlayer:IPlayer = {
//   //   id:currentUser?.id || nanoid(),
//   //   name:currentUser?.name || "",
//   //   hands:0,
//   //   rest:0
//   // }

// }

export const defaultBuyInData: BuyInData = {
  amountPerhand: 0,
  players: [],
};

const currentBuyInDataAtom = atom(defaultBuyInData);

export const useCurrentBuyInData = () => {
  const [currentBuyInData, setCurrentBuyInData] = useAtom(currentBuyInDataAtom);
  return useBuyInData({ buyInData: currentBuyInData, setBuyInData: setCurrentBuyInData });
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
