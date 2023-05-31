import type { EncodedCard } from '../../models/card';
import type { Player } from '../../models/player';

export interface AddHandParams {
  gameId: string;
  players: Player[];
  blinds: HandBlindVO[];
  boardCards: EncodedCard[];
  actions: HandActionVO[];
}

interface HandBlindVO {
  seat: string;
  chips: number;
}

interface HandActionVO {
  type: string;
  players?: number;
  stage?: string;
  potSize?: number;
  cards?: EncodedCard[] | null;
  seat?: string;
  chips?: number;
  action?: string;
}

export interface HandVO {
  id: string;
  createTime: number;
  players: Player[];
  blinds: HandBlindVO[];
  boardCards: EncodedCard[];
  actions: HandActionVO[];
}
