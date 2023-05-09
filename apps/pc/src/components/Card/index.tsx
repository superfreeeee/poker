import classNames from 'classnames';
import React from 'react';
import { ECardSuit, encodeSuit, ICardNum } from '../../common/card';
import styles from './index.module.scss';

export const CardText = ({ suit, num }: { suit: ECardSuit; num: ICardNum }) => {
  return (
    <span className={styles.cardText}>
      <span className={classNames(styles.suit, `suit-${encodeSuit(suit)}`)}>{suit}</span>
      <span>{num}</span>
    </span>
  );
};
