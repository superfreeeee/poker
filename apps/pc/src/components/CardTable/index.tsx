import React, { FC } from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { ALL_NUMS, ALL_SUITS, Card, encodeCard, getSuitColor } from '../../models/card';
import styles from './index.module.scss';

interface ICardTableProps {
  selectedCards?: Card[];
  disabledCards?: Card[];
  onClick?: (card: Card) => void;
}

const CardTable: FC<ICardTableProps> = ({ selectedCards = [], disabledCards = [], onClick }) => {
  const selectedCardSet = new Set(selectedCards.map(encodeCard));
  const disabledCardSet = new Set(disabledCards.map(encodeCard));

  return (
    <div className={styles.container}>
      {ALL_SUITS.map((suit) => (
        <Row key={suit} justify="space-evenly" align="middle" wrap={false} gutter={2}>
          {ALL_NUMS.map((num) => {
            const selected = selectedCardSet.has(encodeCard({ suit, num }));
            const disabled = disabledCardSet.has(encodeCard({ suit, num }));

            return (
              <Col key={num} flex={1}>
                <div
                  className={classNames(styles.square, {
                    [styles.selected]: selected,
                    [styles.disabled]: disabled,
                  })}
                  style={{ color: getSuitColor(suit) }}
                  onClick={() => !disabled && onClick?.({ suit, num })}
                >
                  {suit}
                  {num}
                </div>
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

export default CardTable;
