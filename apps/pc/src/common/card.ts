/**
 * Card Suit
 */
export enum ECardSuit {
  Spade = '\u2660',
  Heart = '\u2665',
  Diamond = '\u2666',
  Club = '\u2663',
}

/**
 * Card Suit Abbreviation
 */
export type ICardSuitStr = 's' | 'h' | 'd' | 'c';

const cardSuitMap: { [suit in ECardSuit]: ICardSuitStr } = {
  [ECardSuit.Spade]: 's',
  [ECardSuit.Heart]: 'h',
  [ECardSuit.Diamond]: 'd',
  [ECardSuit.Club]: 'c',
};

const suitColorMap: { [suit in ECardSuit]: string } = {
  [ECardSuit.Spade]: 'black',
  [ECardSuit.Heart]: 'red',
  [ECardSuit.Diamond]: 'blue',
  [ECardSuit.Club]: 'green',
};

/**
 * Card Num text
 */
export type ICardNum =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'T'
  | 'J'
  | 'Q'
  | 'K'
  // unknown
  | 'x';

export type ICard = { suit: ECardSuit; num: ICardNum };

export type IEncodedCard = `${ICardNum}${ICardSuitStr}`;

/***************************************/
/*          encoder / decoder          */
/***************************************/
/**
 * Encode card suit
 * @param suit
 * @returns
 */
export const encodeSuit = (suit: ECardSuit): ICardSuitStr => {
  return cardSuitMap[suit];
};

/**
 * Decode card suit
 * @param suitStr
 * @returns
 */
export const decodeSuit = (suitStr: ICardSuitStr): ECardSuit => {
  switch (suitStr) {
    case 's':
      return ECardSuit.Spade;
    case 'h':
      return ECardSuit.Heart;
    case 'd':
      return ECardSuit.Diamond;
    case 'c':
      return ECardSuit.Club;
    default:
      throw new TypeError(`unknown card suit: ${suitStr}`);
  }
};

/**
 * Encode card num
 * @param num
 * @returns
 */
export const encodeNum = (num: number): ICardNum => {
  switch (num) {
    case 1:
      return 'A';
    case 10:
      return 'T';
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    default:
      if (num >= 2 && num <= 9) {
        return `${num}` as ICardNum;
      }
      return 'x';
  }
};

/**
 * Encode whole card
 * @param suit
 * @param num
 * @returns
 */
export const encodeCard = ({ suit, num }: ICard): IEncodedCard => {
  return `${num}${encodeSuit(suit)}`;
};

/**
 * Decode whole card
 * @param card
 * @returns
 */
export const decodeCard = (card: IEncodedCard): { suit: ECardSuit; num: ICardNum } => {
  const [suit, num] = card.split('') as [ICardSuitStr, ICardNum];
  return { suit: decodeSuit(suit), num };
};

/***************************************/
/*                style                */
/***************************************/
export const getSuitColor = (suit: ECardSuit) => suitColorMap[suit] ?? 'inherit';
