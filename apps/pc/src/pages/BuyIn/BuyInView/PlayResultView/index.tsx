import React, { FC } from 'react';
import { UserOutlined, RedEnvelopeOutlined } from '@ant-design/icons';
import { BuyInPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayResultProps {
  player: BuyInPlayer;
  amoutPerhand: number;
}

const PlayerHandView: FC<IPlayResultProps> = ({ player, amoutPerhand }: IPlayResultProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.colContainer}>
        <div className={styles.textContiner}>
          <div>USERNAME</div>
          <div className={styles.text}>
            <UserOutlined className={styles.btnMargin} />
            {player.name}
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
      <div className={styles.colContainer}>
        <div className={styles.textContiner}>
          <div>REST</div>
          <div className={styles.text}>
            <UserOutlined className={styles.btnMargin} />
            {player.rest}
          </div>
        </div>
        <div className={styles.textContiner}>
          <div>PROFIT and LOSS</div>
          <div className={styles.text}>
            <RedEnvelopeOutlined className={styles.btnMargin} />
            {player.rest - player.hands * amoutPerhand}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerHandView;
