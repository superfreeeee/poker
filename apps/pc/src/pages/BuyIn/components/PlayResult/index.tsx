import React, { FC, ChangeEvent } from 'react';
import { Input, message } from 'antd';
import {
  EyeOutlined,
  LineChartOutlined,
  RedEnvelopeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { IPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerResultProps {
  player: IPlayer;
  amoutPerHand: number;
  onChange: (player: IPlayer) => void;
}

const PlayResult: FC<IPlayerResultProps> = ({
  player,
  amoutPerHand,
  onChange,
}: IPlayerResultProps) => {
  const { hands, rest } = player;
  const benefit = rest - hands * amoutPerHand;
  const { run } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      const number = +e.target.value;
      if (isNaN(number)) {
        message.error('剩余金额必须为正');
        return;
      }
      onChange({ ...player, rest: number });
    },
    { wait: 500 },
  );
  return (
    <div className={styles.container}>
      <div className={styles.playerContainer}>
        <div className={styles.textContiner}>
          <div>USERNAME</div>
          <div className={styles.text}>
            <div>
              <UserOutlined className={styles.btnMargin} />
            </div>
            <div>{player.name}</div>
          </div>
        </div>
        <div className={styles.textContiner}>
          <div>HANDS</div>
          <div className={styles.text}>
            <RedEnvelopeOutlined className={styles.btnMargin} />
            {player.hands}
          </div>
        </div>
      </div>
      <div className={styles.playerContainer}>
        <div className={styles.inputForm}>
          <div>REST</div>
          <Input prefix={<EyeOutlined />} bordered={false} defaultValue={rest} onChange={run} />
        </div>
        <div className={styles.textContiner}>
          <div>Profit and Loss</div>
          <div className={styles.text}>
            <LineChartOutlined className={styles.btnMargin} /> {benefit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayResult;
