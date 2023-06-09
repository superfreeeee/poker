import { useMemo, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { message } from 'antd';
import { nanoid } from 'nanoid';
import { BuyInData, BuyInPlayer } from '../../../models/buyIn';
import { DEFAULT_AMOUNT_PER_HAND, DEFAULT_BUYIN_HANDS } from './constants';

const createBuyInPlayer = (amountPerHand: number): BuyInPlayer => {
  return {
    id: undefined,
    name: '',
    hands: DEFAULT_BUYIN_HANDS,
    chips: DEFAULT_BUYIN_HANDS * amountPerHand,
    rest: 0,
  };
};

/**
 * 初始记录
 */
const createBuyInDataAtoms = {
  amountPerHand: atom(DEFAULT_AMOUNT_PER_HAND),
  players: atom<BuyInPlayer[]>([createBuyInPlayer(DEFAULT_AMOUNT_PER_HAND)]),
};

const initialBuyInData: BuyInData = {
  amountPerHand: DEFAULT_AMOUNT_PER_HAND,
  players: [createBuyInPlayer(DEFAULT_AMOUNT_PER_HAND)],
};

const newCreateBuyInData = atom<BuyInData>((get) => {
  const amountPerHand = get(createBuyInDataAtoms.amountPerHand);
  const players = get(createBuyInDataAtoms.players);
  return { amountPerHand, players };
});

export const useNewCreateBuyInData = () => {
  const [amountPerHand, setAmountPerHand] = useAtom(createBuyInDataAtoms.amountPerHand);
  const [players, setPlayers] = useAtom(createBuyInDataAtoms.players);

  const onAmountPerHandChange = (amount: number) => {
    setAmountPerHand(amount);
    setPlayers(
      players.map((player) => {
        return { ...player, chips: player.hands * amount };
      }),
    );
  };

  const addPlayer = () => {
    setPlayers([...players, createBuyInPlayer(amountPerHand)]);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const toggleBuyInType = (index: number) => {
    setPlayers(
      players.map((player, i) => {
        if (index === i) {
          return { ...player, type: player.type === 'chips' ? 'hands' : 'chips' };
        } else {
          return player;
        }
      }),
    );
  };

  const onPlayerChange = ({ name, id }: { name: string; id?: string }, index: number) => {
    setPlayers(
      players.map((player, i) => {
        if (index === i) {
          return { ...player, name, id };
        } else {
          return player;
        }
      }),
    );
  };

  const onBuyInChange = (type: 'hands' | 'chips', value: number, index: number) => {
    setPlayers(
      players.map((player, i) => {
        if (index === i) {
          const hands = type === 'hands' ? value : value / amountPerHand;
          const chips = type === 'chips' ? value : value * amountPerHand;
          return { ...player, hands, chips };
        } else {
          return player;
        }
      }),
    );
  };

  return {
    buyInData: useAtomValue(newCreateBuyInData),
    onAmountPerHandChange,
    addPlayer,
    removePlayer,
    toggleBuyInType,
    onPlayerChange,
    onBuyInChange,
  };
};

const createBuyInDataHistoryAtom = atom<BuyInData[]>([initialBuyInData]);

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

  const pushState = (nextState: BuyInData) => {
    const history = [...createBuyInDataHistory.slice(0, createBuyInDataIndex + 1), nextState];
    const nextIndex = history.length - 1;
    setCreateBuyInDataHistory(history);
    setCreateBuyInDataIndex(nextIndex);
    setViewIndex(nextIndex);
  };

  const resetHistory = () => {
    setCreateBuyInDataHistory([initialBuyInData]);
    setCreateBuyInDataIndex(0);
  };

  const totalIndex = [...Array(createBuyInDataHistory.length)].map((el, index) => ({
    title: index + 1,
  }));

  return {
    viewBuyInData: createBuyInDataHistory[viewIndex],
    viewStatisticData: calcStatisticsData(createBuyInDataHistory[viewIndex]),
    stepIndex: { viewIndex, totalData: totalIndex },
    historyLength: createBuyInDataHistory.length,
    hasLastRecord,
    hasNextRecord,
    viewLastRecord,
    viewNextRecord,
    confirmView,
    cancelView,
    pushState,
    resetHistory,
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

/**
 * BuyInData(data) => statisticsData, totalBenefit, actions
 * @param param0
 * @returns
 */
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
const useBuyInDataActions = ([buyInData, setBuyInData]: BuyInDataEntry) => {
  const addPlayer = () => {
    setBuyInData({
      ...buyInData,
      players: [
        ...buyInData.players,
        {
          id: nanoid(),
          name: '',
          hands: DEFAULT_BUYIN_HANDS,
          chips: 0,
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
export const calcStatisticsData = ({
  amountPerHand: amountPerhand,
  players,
}: BuyInData): BuyInStatistics => {
  const totalHands = players.reduce((sum, player) => sum + (player.hands ?? 0), 0);
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
const calcBenfit = ({ amountPerHand: amountPerhand, players }: BuyInData): number => {
  return players.reduce(
    (sum, player) => sum + player.rest - (player.hands ?? 0) * amountPerhand,
    0,
  );
};
