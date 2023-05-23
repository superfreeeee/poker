import { nanoid } from 'nanoid';
import handRecords from '../../models/hand/sample.json';
import { HandRecord } from '../hand';
import { GameRecord } from './types';

export const mockGameDetail: GameRecord = {
  id: nanoid(),
  createTime: Date.now(),
  buyInInfo: {
    amountPerhand: 400,
    players: [
      {
        id: nanoid(),
        name: 'A',
        hands: 5,
        rest: 2400,
      },
      // 大水上
      {
        id: nanoid(),
        name: 'B',
        hands: 1,
        rest: 1100,
      },
      {
        id: nanoid(),
        name: 'C',
        hands: 5,
        rest: 800,
      },
      {
        id: nanoid(),
        name: 'D',
        hands: 3,
        rest: 1400,
      },
    ],
  },
  handRecords: handRecords as HandRecord[],
};
