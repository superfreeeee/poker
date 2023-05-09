import { atom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';

export interface IBuyInData {
  amountPerhand: number;
  players: IPlayer[];
}

export interface IPlayer {
  id: string;
  name: string;
  hands: number; // 买入手数
  rest: number; // 剩余筹码
}

export const defaultBuyInData: IBuyInData = {
  amountPerhand: 0,
  players: [],
};

const currentBuyInDataAtom = atom(defaultBuyInData);

export const useCurrentBuyInData = () => {
  const [currentBuyInData, setCurrentBuyInData] = useAtom(currentBuyInDataAtom);

  const sumData = useBuyInSumData(currentBuyInData);

  const sumBenefit = useMemo(() => {
    return calcBenfit(currentBuyInData);
  }, [currentBuyInData]);

  const actions = useBuyInDataActions([currentBuyInData, setCurrentBuyInData]);

  return {
    currentBuyInData,
    sumData,
    sumBenefit,
    ...actions,
  };
};

type IBuyInDataEntry = [buyInData: IBuyInData, setBuyInData: (data: IBuyInData) => void];

/**
 * 基于 buyInData 返回可选操作
 * @param param0
 * @returns
 */
export const useBuyInDataActions = ([buyInData, setBuyInData]: IBuyInDataEntry) => {
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
    setBuyInData({
      ...buyInData,
      players: buyInData.players.filter((player) => player.id != targetId),
    });
  };

  const changePlayer = (targetPlayer: IPlayer, index: number) => {
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

  const changeCurrentBuyInData = (data: IBuyInData) => {
    setBuyInData(data);
  };

  return {
    addPlayer,
    removePlayer,
    changePlayer,
    changeCurrentBuyInData,
  };
};

/**
 * 基于 buyInData 返回统计数据
 * @param data
 * @returns
 */
export const useBuyInSumData = (data: IBuyInData) => {
  return useMemo(() => calcSumData(data), [data]);
};

export interface ISumData {
  playerSum: number;
  handSum: number;
  amountSum: number;
}

/**
 * 计算 BuyIn 面板导出量
 * @param param0
 * @returns
 */
export const calcSumData = ({ amountPerhand, players }: IBuyInData): ISumData => {
  const handSum = players.reduce((sum, player) => sum + player.hands, 0);
  const sumData: ISumData = {
    playerSum: players.length,
    handSum: handSum,
    amountSum: handSum * amountPerhand,
  };
  return sumData;
};

/**
 * 计算总盈利
 * @param param0
 * @returns 总盈利
 */
const calcBenfit = ({ amountPerhand, players }: IBuyInData): number => {
  return players.reduce((sum, player) => sum + player.rest - player.hands * amountPerhand, 0);
};
