import React, { FC } from 'react';
import { UserOutlined, RedEnvelopeOutlined } from '@ant-design/icons';
import { IPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: IPlayer;
}

const PlayerHandView: FC<IPlayerHandProps> = ({ player }: IPlayerHandProps) => {
  return (
    <div className={styles.container}>
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
  );
};
export default PlayerHandView;
