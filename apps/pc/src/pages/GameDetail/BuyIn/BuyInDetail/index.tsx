import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PlayResult from '../components/PlayResult';
import TitleBar from '../components/TitleBar';
import { useBuyInDataRemoveService } from '../../../../services/buyin';
import { invalidateGameDetail } from '../../../../api/game';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { calcStatisticsData } from '../model';
import { BuyInData } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IBuyInDetailProps {
  data: BuyInData;
}

const BuyInDetail = ({ data }: IBuyInDetailProps) => {
  const { gameId = '' } = useParams();
  const { amountPerhand, players: buyInPlayers } = data;
  const statisticsData = useMemo(() => calcStatisticsData(data), [data]);
  const buyInRemoveService = useBuyInDataRemoveService();

  const handleBuyInDataRemove = async () => {
    await buyInRemoveService(gameId);
    invalidateGameDetail(gameId);
  };

  return (
    <div className={styles.container}>
      <TitleBar
        isEditable={false}
        title="结算状态"
        amountPerhand={amountPerhand}
        statisticsData={statisticsData}
        enableRemove={handleBuyInDataRemove}
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
