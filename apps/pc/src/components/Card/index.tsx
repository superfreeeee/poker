import React from 'react';
import { ECardSuit, getSuitColor, ICardNum } from '../../common/card';
import styles from './index.module.scss';

export const CardText = ({ suit, num }: { suit: ECardSuit; num: ICardNum }) => {
  return (
    <span className={styles.cardText} style={{ color: getSuitColor(suit) }}>
      {suit}
      {num}
    </span>
  );
};
