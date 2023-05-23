import { atom, useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { IBuyInData } from '../../models/buyIn';

const createBuyInDataHistoryAtom = atom<IBuyInData[]>([]);

const createBuyInDataIndexAtom = atom<number>(0);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createBuyInDataAtom = atom(
  (get) => {
    const history = get(createBuyInDataHistoryAtom);
    const index = get(createBuyInDataIndexAtom);
    return history[index];
  },
  (get, set, newBuyInData: IBuyInData) => {
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
  const createBuyInDataHistory = useAtomValue(createBuyInDataHistoryAtom);
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

  return {
    viewBuyInData: createBuyInDataHistory[createBuyInDataIndex],
    hasLastRecord,
    hasNextRecord,
    viewLastRecord,
    viewNextRecord,
    confirmView,
    cancelView,
  };
};

/**
 * 【Editable】Current view / edit
 * @returns
 */
export const useCreateBuyInData = () => {
  // const [createBuyInData, setCreateBuyInData] = useAtom(createBuyInDataAtom);
  // const addPlayer = () => {
  //   setCreateBuyInData({
  //     ...createBuyInData,
  //     players: [
  //       ...createBuyInData.players,
  //       {
  //         id: nanoid(),
  //         name: '',
  //         hands: 1,
  //         rest: 0,
  //       },
  //     ],
  //   });
  // };
  // const removePlayer = (targetId: string) => {
  //   if (createBuyInData.players.length !== 1) {
  //     setCreateBuyInData({
  //       ...createBuyInData,
  //       players: createBuyInData.players.filter((player) => player.id != targetId),
  //     });
  //   } else {
  //     message.error('玩家不能为空');
  //   }
  // };
};
