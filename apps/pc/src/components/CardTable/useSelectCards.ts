import { useCallback, useState } from 'react';
import { ICard } from '../../common/card';

export const useSelectCards = (max = 5) => {
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);

  const select = useCallback(
    (card: ICard) => {
      setSelectedCards((selectedCards) => {
        const targetCard = selectedCards.find(
          (selectedCard) => selectedCard.suit === card.suit && selectedCard.num === card.num,
        );
        const newCards = targetCard
          ? selectedCards.filter((card) => card !== targetCard)
          : [card, ...selectedCards];
        return newCards.slice(0, max);
      });
    },
    [max],
  );

  return { selectedCards, select };
};
