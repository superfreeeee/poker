import React, { FC } from 'react';
import { Col, Row } from 'antd';
import classNames from 'classnames';
import { ECardSuit, getSuitColor, ICardNum, ICard, encodeCard } from '../../common/card';
import styles from './index.module.scss';

const suits = [ECardSuit.Spade, ECardSuit.Heart, ECardSuit.Diamond, ECardSuit.Club];
const nums: ICardNum[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

interface ICardTableProps {
  selectedCards?: ICard[];
  onClick?: (card: ICard) => void;
}

const CardTable: FC<ICardTableProps> = ({ selectedCards = [], onClick }) => {
  const selectedCardsSet = new Set(selectedCards.map(encodeCard));

  console.log(selectedCardsSet);

  return (
    <div className={styles.container}>
      {suits.map((suit) => (
        <Row key={suit} justify="space-evenly" align="middle" gutter={4}>
          {nums.map((num) => (
            <Col key={num} flex={1}>
              <div
                className={classNames(styles.square, {
                  [styles.selected]: selectedCardsSet.has(encodeCard({ suit, num })),
                })}
                style={{ color: getSuitColor(suit) }}
                onClick={() => {
                  console.log(`card: ${encodeCard({ suit, num })}`);
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
