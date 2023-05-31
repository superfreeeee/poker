import type { HandVO } from '../hand';

export interface AddGameParams {
  location: string;
  date: number;
  comment: string;
}

interface BuyInPlayerVO {
  id: string;
  name: string;
  buyInChips: number;
  buyInHands: number;
  restChips: number;
}

interface BuyInVO {
  chipsPerHand: number;
  players: BuyInPlayerVO[];
}

export interface GameVO {
  id: string;
  location: string;
  date: number;
  createTime: number;
  comment: string | null;
  buyInData: BuyInVO | null;
  handRecords: HandVO[] | null;
}
