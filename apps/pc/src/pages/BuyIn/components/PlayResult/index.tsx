import React, { FC, ChangeEvent } from 'react';
import { Input, message } from 'antd';
import { RedEnvelopeOutlined, UserOutlined } from '@ant-design/icons';
import { isUndefined } from 'lodash-es';
import { useDebounceFn } from 'ahooks';
import { BuyInPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerResultProps {
  player: BuyInPlayer;
  amountPerhand: number;
  onChange?: (player: BuyInPlayer) => void;
  isEditable: boolean;
}

const PlayResult: FC<IPlayerResultProps> = ({
  player,
  amountPerhand,
  onChange,
  isEditable,
}: IPlayerResultProps) => {
  const { hands, rest } = player;
  const benefit = rest - hands * amountPerhand;
  const { run: onRestChange } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      const number = +e.target.value;
      if (isNaN(number)) {
        message.error('剩余金额必须为正');
        return;
      }
      if (!isUndefined(onChange)) {
        onChange({ ...player, rest: number });
      }
    },
    { wait: 500 },
  );
  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <div className={styles.calcList}>
          <UserOutlined className={styles.btnMargin} />
          <div className={styles.title}>USERNAME</div>
          <div className={styles.content}>{player.name}</div>
        </div>
        <div className={styles.calcList}>
          <RedEnvelopeOutlined className={styles.btnMargin} />
          <div className={styles.title}>HANDS</div>
          <div className={styles.content}>{player.hands}</div>
        </div>
      </div>
      <div className={styles.playerContainer}>
        <div className={styles.calcList}>
          <div className={styles.textContiner}>
            <div className={styles.title}>Amount</div>
            <div className={styles.calcText}>{player.hands * amountPerhand}</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>=</div>
            <div className={styles.otherText}>=</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>HANDS</div>
            <div className={styles.calcText}>{hands}</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>*</div>
            <div className={styles.otherText}>*</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>一手金额</div>
            <div className={styles.calcText}>{amountPerhand}</div>
          </div>
        </div>
        <div className={styles.calcList}>
          {isEditable ? (
            <div className={styles.inputForm}>
              <div className={styles.title}>REST</div>
              <Input bordered={false} defaultValue={rest} onChange={onRestChange} />
            </div>
          ) : (
            <div className={styles.textContiner}>
              <div className={styles.title}>REST</div>
              <div className={styles.calcText}>{player.rest}</div>
            </div>
          )}
          <div className={styles.textContiner}>
            <div className={styles.title}>-</div>
            <div className={styles.otherText}>-</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>Amount</div>
            <div className={styles.calcText}>{amountPerhand * hands}</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>=</div>
            <div className={styles.otherText}>=</div>
          </div>
          <div className={styles.textContiner}>
            <div className={styles.title}>Profit and Loss</div>
            <div className={styles.calcText}>{benefit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayResult;
