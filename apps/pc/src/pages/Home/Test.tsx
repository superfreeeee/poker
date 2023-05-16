import React from 'react';
import CardSelector from '../../components/CardSelectorModal/CardSelector';
import CardTable from '../../components/CardTable';
import { Card, CardSuit } from '../../models/card';

const selectedCards: Card[] = [
  { suit: CardSuit.Spade, num: '5' },
  { suit: CardSuit.Heart, num: '6' },
  { suit: CardSuit.Diamond, num: '7' },
  { suit: CardSuit.Club, num: '8' },
];

const disabledCards: Card[] = [
  { suit: CardSuit.Spade, num: '2' },
  { suit: CardSuit.Heart, num: '3' },
  { suit: CardSuit.Diamond, num: '4' },
  { suit: CardSuit.Club, num: '5' },
];

const Test = () => {
  return (
    <div>
      <h1>Home Test</h1>
      <CardTable selectedCards={selectedCards} disabledCards={disabledCards} />
      <CardSelector disabledCards={disabledCards} />
    </div>
  );
};

export default Test;
