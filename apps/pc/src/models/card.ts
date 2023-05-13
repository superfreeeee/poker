/*****************************************/
/*            Type definition            */
/*****************************************/
/**
 * Card Suit
 */
export enum CardSuit {
  Spade = '\u2660',
  Heart = '\u2665',
  Diamond = '\u2666',
  Club = '\u2663',
}

/**
 * Card Suit Abbreviation
 */
export type CardSuitAbbr = 's' | 'h' | 'd' | 'c';

export type CardNum =
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
  | 'x'; // unknown

export type Card = { suit: CardSuit; num: CardNum };

export type EncodedCard = `${CardNum}${CardSuitAbbr}`;

/*****************************************/
/*               Constants               */
/*****************************************/
export const ALL_SUITS: CardSuit[] = [
  CardSuit.Spade,
  CardSuit.Heart,
  CardSuit.Diamond,
  CardSuit.Club,
];

export const ALL_NUMS: CardNum[] = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
];

/*****************************************/
/*                Methods                */
/*****************************************/
const cardSuitColorMap: { [suit in CardSuit]: string } = {
  [CardSuit.Spade]: 'black',
  [CardSuit.Heart]: 'red',
  [CardSuit.Diamond]: 'blue',
  [CardSuit.Club]: 'green',
};

export const getSuitColor = (suit: CardSuit): string => cardSuitColorMap[suit];

const cardSuitMap: { [suit in CardSuit]: CardSuitAbbr } = {
  [CardSuit.Spade]: 's',
  [CardSuit.Heart]: 'h',
  [CardSuit.Diamond]: 'd',
  [CardSuit.Club]: 'c',
};

const encodeSuit = (suit: CardSuit): CardSuitAbbr => {
  return cardSuitMap[suit];
};

export const encodeCard = ({ suit, num }: Card): EncodedCard => {
  return `${num}${encodeSuit(suit)}`;
};

const decodeSuit = (suitAbbr: CardSuitAbbr): CardSuit => {
  switch (suitAbbr) {
    case 's':
      return CardSuit.Spade;
    case 'h':
      return CardSuit.Heart;
    case 'd':
      return CardSuit.Diamond;
    case 'c':
      return CardSuit.Club;
    default:
      throw new TypeError(`unknown card suit: ${suitAbbr}`);
  }
};

export const decodeCard = (card: EncodedCard): Card => {
  const [suit, num] = card.split('') as [CardSuitAbbr, CardNum];
  return { suit: decodeSuit(suit), num };
};
