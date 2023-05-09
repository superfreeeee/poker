import React, { FC } from 'react';
import { Button } from 'antd';
import { UserOutlined, RedEnvelopeOutlined } from '@ant-design/icons';
import { IPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: IPlayer;
}

const PlayerHandView: FC<IPlayerHandProps> = ({ player }: IPlayerHandProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Button shape="circle" icon={<UserOutlined />} className={styles.btnBG} />
        <div className={styles.text}>{player.name}</div>
      </div>
      <div className={styles.rightContainer}>
        <Button shape="circle" icon={<RedEnvelopeOutlined />} className={styles.btnBG} />
        <div className={styles.text}>{player.hands}</div>
      </div>
    </div>
  );
};
export default PlayerHandView;
