import { atom, useAtom, useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';

export interface IBuyInData {
  amountPerhand: number;
  players: IPlayer[];
}

export const defaultBuyInData: IBuyInData = {
  amountPerhand: 0,
  players: [],
};

const currentBuyInDataAtom = atom(defaultBuyInData);

export const useCurrentBuyInData = () => {
  const [currentBuyInData, setCurrentBuyInData] = useAtom(currentBuyInDataAtom);

  const sumData = useMemo(() => {
    return calcSumData(currentBuyInData);
  }, [currentBuyInData]);

  const addPlayer = () => {
    setCurrentBuyInData({
      ...currentBuyInData,
      players: [
        ...currentBuyInData.players,
        {
          id: nanoid(),
          name: '',
          hands: 1,
          rest: 0,
        },
      ],
    });
  };

  return {
    currentBuyInData,
    sumData,
    addPlayer,
  };
};

/**
 * 计算 BuyIn 面板导出量
 * @param param0
 * @returns
 */
const calcSumData = ({ amountPerhand, players }: IBuyInData): ISumData => {
  const handSum = players.reduce((sum, player) => sum + player.hands, 0);
  const sumData: ISumData = {
    playerSum: players.length,
    handSum: handSum,
    amountSum: handSum * amountPerhand,
  };
  return sumData;
};

export interface IPlayer {
  id: string;
  name: string;
  hands: number; // 买入手数
  rest: number; // 剩余筹码
}

export interface ISumData {
  playerSum: number;
  handSum: number;
  amountSum: number;
}

export type BuyInPlayer = IPlayer[];

const amountPerHandAtom = atom(0);
export const useAmountPerHand = () => useAtom(amountPerHandAtom);
export const useAmountPerHandValue = () => useAtomValue(amountPerHandAtom);

//增删改这些都要放在哪里做呢
// const currentUser = useCurrentUser();
export const defaultBuyIn: BuyInPlayer = [
  {
    id: '12345678',
    name: 'hello', //这里还没加入目前用户名
    hands: 1,
    rest: 0,
  },
];
const buyInPlayersAtom = atom(defaultBuyIn);
export const useBuyInPlayers = () => useAtom(buyInPlayersAtom);

// 增加一个新的player
export const addPlayer = (players: BuyInPlayer): BuyInPlayer => {
  const newPlayerList: BuyInPlayer = Array.from(players);
  const newPlayer: IPlayer = {
    id: nanoid(),
    name: '',
    hands: 1,
    rest: 0,
  };
  newPlayerList.push(newPlayer);
  return newPlayerList;
};

// 删除指定player
export const removePlayer = (players: BuyInPlayer, id: string): BuyInPlayer => {
  const newPlayerList: BuyInPlayer = Array.from(players);
  return newPlayerList.filter((element: IPlayer) => element.id != id);
};

//修改player的名字
export const changeNamePlayer = (players: BuyInPlayer, id: string, name: string): BuyInPlayer => {
  const newPlayerList: BuyInPlayer = Array.from(players);
  newPlayerList.forEach((element: IPlayer) => {
    if (element.id === id) {
      element.name = name;
    }
  });
  return newPlayerList;
};

//修改player的hands
export const changeHandPlayer = (players: BuyInPlayer, id: string, hand: number): BuyInPlayer => {
  const newPlayerList: BuyInPlayer = Array.from(players);
  newPlayerList.forEach((element: IPlayer) => {
    if (element.id === id) {
      element.hands = hand;
    }
  });
  return newPlayerList;
};
