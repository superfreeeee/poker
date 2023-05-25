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
