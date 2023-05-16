import { Modal } from 'antd';
import React, { FC } from 'react';
import { Card } from '../../models/card';
import { renderCardText } from '../Card';
import CardTable from '../CardTable';
import { useSelectCards } from '../CardTable/useSelectCards';
import styles from './CardSelector.module.scss';

export interface ICardSelectorCallback {
  onSelect?: (cards: Card[]) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface ICardSelectorProps extends ICardSelectorCallback {
  count?: number;
  max?: number;
  defaultSelectedCards?: Card[];
  disabledCards?: Card[];
}

const CardSelector: FC<ICardSelectorProps> = ({
  count,
  max = 3,
  onSelect,
  onCancel,
  onClose,
  defaultSelectedCards,
  disabledCards,
}) => {
  const fixedCards = !!count;
  const size = count ?? max;

  const { selectedCards, select } = useSelectCards(size, defaultSelectedCards);

  return (
    <Modal
      open
      title="选择手牌"
      style={{ minWidth: 700 }}
      okText="确定"
      onOk={() => {
        onSelect?.(selectedCards);
      }}
      cancelText="取消"
      onCancel={onCancel}
      afterClose={onClose}
      okButtonProps={{ disabled: fixedCards && selectedCards.length < size }}
    >
      <div>
        <div className={styles.info}>
          <div className={styles.title}>
            Current cards
            <span className={styles.count}>
              ({selectedCards.length} / {size}):
            </span>
          </div>
          {renderCardText(selectedCards, styles.cards)}
        </div>
        <CardTable selectedCards={selectedCards} disabledCards={disabledCards} onClick={select} />
      </div>
    </Modal>
  );
};

export default CardSelector;
