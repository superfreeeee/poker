import { useCallback, useState } from 'react';
import { Card } from '../../models/card';

export const useSelectCards = (max = 5, defaultCards: Card[] = []) => {
  const [selectedCards, setSelectedCards] = useState<Card[]>(defaultCards);

  const select = useCallback(
    (card: Card) => {
      setSelectedCards((selectedCards) => {
        const targetCard = selectedCards.find(
          (selectedCard) => selectedCard.suit === card.suit && selectedCard.num === card.num,
        );
        const newCards = targetCard
          ? // unselect card
            selectedCards.filter((card) => card !== targetCard)
          : // add at end
            [...selectedCards, card];
        return newCards.slice(Math.max(newCards.length - max, 0), newCards.length);
      });
    },
    [max],
  );

  return { selectedCards, select };
};
