import React, { useMemo } from 'react';
import PlayResult from '../components/PlayResult';
import TitleBar from '../components/TitleBar';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { calcStatisticsData } from '../model';
import { BuyInData } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IBuyInDetailProps {
  data: BuyInData;
}

const BuyInDetail = ({ data }: IBuyInDetailProps) => {

  const { amountPerhand, players: buyInPlayers } = data;
  const statisticsData = useMemo(() => calcStatisticsData(data), [data]);

  return (
    <div className={styles.container}>
      <TitleBar
        isEditable={false}
        title="结算状态"
        amountPerhand={amountPerhand}
        statisticsData={statisticsData}
      ></TitleBar>
      <div className={initialStyles.playerList}>
        {buyInPlayers.map((player) => (
          <PlayResult
            key={player.id}
            player={player}
            amountPerhand={amountPerhand}
            isEditable={false}
          ></PlayResult>
        ))}
      </div>
    </div>
  );
};
export default BuyInDetail;
