import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { renderCardText } from '../../../../../components/Card';
import { HandStage, HandAction as IHandAction } from '../../../../../models/hand';
import styles from './index.module.scss';

interface IHandActionProps {
  action: IHandAction;
  narrow?: boolean;
}

/**
 * 一手牌中单个操作记录展示
 * @param param0
 * @returns
 */
const HandAction: FC<IHandActionProps> = ({ action, narrow = false }) => {
  const content = useMemo(() => {
    const { type } = action;
    if (type === 'stageBlinds') {
      return (
        <div className={styles.wrapper}>
          <div style={{ flex: 1 }}>{HandStage.Blinds}</div>
          <div className={styles.players}>players: {action.players}</div>
        </div>
      );
    }

    if (type === 'stageInfo') {
      return (
        <div className={styles.wrapper}>
          <div>{action.stage}</div>
          {renderCardText(action.cards, styles.cards)}
          <div className={styles.potSize}>potSize: {action.potSize}</div>
        </div>
      );
    }

    if (type === 'playerPayBlinds') {
      return (
        <div className={styles.wrapper}>
          <div style={{ width: 100 }}>{action.seat}</div>
          <div style={{ flex: 1 }}>(Pay Blind)</div>
          <div className={styles.chips}>{action.chips}</div>
        </div>
      );
    }

    if (type === 'playerShowdown') {
      return (
        <div className={styles.wrapper}>
          <div style={{ width: 100 }}>{action.seat}</div>
          {renderCardText(action.cards, styles.cards)}
        </div>
      );
    }

    if (type === 'playerAction') {
      return (
        <div className={styles.wrapper}>
          <div style={{ width: 100 }}>{action.seat}</div>
          <div style={{ flex: 1 }}>{action.action}</div>
          {action.chips ? <div className={styles.chips}>{action.chips}</div> : null}
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        {/* 未知类型 */}
        (Unknown action: {type})
      </div>
    );
  }, [action]);

  const isStage = action.type.startsWith('stage');

  return (
    <div
      className={classNames(styles.actionContainer, {
        [styles.stage]: isStage,
        [styles.narrow]: narrow,
      })}
    >
      {content}
    </div>
  );
};

export default HandAction;
