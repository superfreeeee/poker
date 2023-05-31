interface AddBuyInPlayer {
  id?: string;
  name: string;
  // Either buyInChips or buyInHands required
  buyInChips?: number;
  buyInHands?: number;
  restChips: number;
}

export interface AddBuyInParams {
  gameId: string;
  chipsPerHand: number;
  players: AddBuyInPlayer[];
}
