import { atom, useAtom, useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';

export interface IPlayer {
  id: string;
  name: string;
  hands: number;
}

export interface IResult {
  name: string;
  rest: number;
}

export interface ISumData {
  playerSum: number;
  handSum: number;
  amountSum: number;
}

type buyInPlayer = IPlayer[];

const amountPerHandAtom = atom(0);
export const useAmountPerHand = () => useAtom(amountPerHandAtom);
export const useAmountPerHandValue = () => useAtomValue(amountPerHandAtom);

//增删改这些都要放在哪里做呢
// const currentUser = useCurrentUser();
const defaultBuyIn: buyInPlayer = [
  {
    id: '12345678',
    name: 'hello', //这里还没加入目前用户名
    hands: 1,
  },
];
const buyInPlayerAtom = atom(defaultBuyIn);
export const useBuyInPlayer = () => useAtom(buyInPlayerAtom);
export const useBuyInPlayerValue = () => useAtomValue(buyInPlayerAtom);


// 增加一个新的player
export const addPlayer = (players: buyInPlayer): buyInPlayer => {
  const newPlayerList: buyInPlayer = Array.from(players);
  const newPlayer: IPlayer = {
    id: nanoid(),
    name: "",
    hands: 1,
  };
  newPlayerList.push(newPlayer);
  return newPlayerList;
};

// 删除指定player
export const removePlayer = (players: buyInPlayer, id: string): buyInPlayer => {
  const newPlayerList: buyInPlayer = Array.from(players);
  return newPlayerList.filter((element: IPlayer) => element.id != id);
};

//修改player的名字
export const changeNamePlayer = (players: buyInPlayer, id: string, name: string): buyInPlayer => {
  const newPlayerList: buyInPlayer = Array.from(players);
  newPlayerList.forEach((element: IPlayer) => {
    if (element.id === id) {
      element.name = name;
    }
  });
  return newPlayerList;
};

//修改player的hands
export const changeHandPlayer = (players: buyInPlayer, id: string, hand: number): buyInPlayer => {
  const newPlayerList: buyInPlayer = Array.from(players);
  newPlayerList.forEach((element: IPlayer) => {
    if (element.id === id) {
      element.hands = hand;
    }
  });
  return newPlayerList;
};
