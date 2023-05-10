import React, { FC } from 'react';
import classNames from 'classnames';
import { encodeCard, getSuitColor, Card } from '../../models/card';
import styles from './index.module.scss';

interface ICardProps {
  card: Card;
}

/**
 * 牌 - 纯文字表示：【花色】【数字】
 * @param param0
 * @returns
 */
export const CardText: FC<ICardProps> = ({ card: { suit, num } }) => {
  return (
    <span className={styles.cardText} style={{ color: getSuitColor(suit) }}>
      {suit}
      {num}
    </span>
  );
};

/**
 * Render Card with <CardText />
 * @param card
 */
export function renderCardText(card: Card, className?: string): JSX.Element;
export function renderCardText(cards: Card[], className?: string): JSX.Element;
export function renderCardText(cards: Card | Card[], className?: string): JSX.Element {
  if (!Array.isArray(cards)) {
    return renderCardText([cards]);
  }

  return (
    <div className={classNames(styles.cardTextList, className)}>
      {cards.map((card) => (
        <CardText key={encodeCard(card)} card={card} />
      ))}
    </div>
  );
}

/**
 * 牌 - 真实样式展示
 * @param param0
 * @returns
 */
export const CardUI: FC<ICardProps> = ({ card }) => {
  // TODO create real UI
  return <CardText card={card} />;
};
