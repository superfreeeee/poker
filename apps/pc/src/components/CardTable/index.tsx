import React, { FC } from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { ALL_NUMS, ALL_SUITS, Card, encodeCard, getSuitColor } from '../../models/card';
import styles from './index.module.scss';

interface ICardTableProps {
  selectedCards?: Card[];
  onClick?: (card: Card) => void;
}

const CardTable: FC<ICardTableProps> = ({ selectedCards = [], onClick }) => {
  const selectedCardsSet = new Set(selectedCards.map(encodeCard));

  return (
    <div className={styles.container}>
      {ALL_SUITS.map((suit) => (
        <Row key={suit} justify="space-evenly" align="middle" wrap={false} gutter={2}>
          {ALL_NUMS.map((num) => (
            <Col key={num} flex={1}>
              <div
                className={classNames(styles.square, {
                  [styles.selected]: selectedCardsSet.has(encodeCard({ suit, num })),
                })}
                style={{ color: getSuitColor(suit) }}
                onClick={() => {
                  onClick?.({ suit, num });
                }}
              >
                {suit}
                {num}
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default CardTable;
