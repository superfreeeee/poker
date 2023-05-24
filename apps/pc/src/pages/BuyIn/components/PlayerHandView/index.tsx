import React, { FC } from 'react';
import { UserOutlined, RedEnvelopeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { BuyInPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: BuyInPlayer;
  amountPerhand: number;
}

const PlayerHandView: FC<IPlayerHandProps> = ({ player, amountPerhand }: IPlayerHandProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContiner}>
        <div className={styles.title}>USERNAME</div>
        <div className={styles.text}>
          <div>
            <UserOutlined className={styles.btnMargin} />
          </div>
          <div>{player.name}</div>
        </div>
      </div>
      <div className={styles.handList}>
        <div className={styles.textContiner}>
          <div className={styles.title}>HANDS</div>
          <div className={styles.text}>
            <RedEnvelopeOutlined className={styles.btnMargin} />
            {player.hands}
          </div>
        </div>
        <div>
          <ArrowRightOutlined className={`${styles.btnMargin} ${styles.amountIcon}`} />
        </div>
        <div className={styles.textContiner}>
          <div className={styles.title}>AMOUNT</div>
          <div className={styles.text}>{player.hands * amountPerhand}</div>
        </div>
      </div>
    </div>
  );
};
export default PlayerHandView;
