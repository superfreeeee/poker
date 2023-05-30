import React, { useMemo } from 'react';
import PlayResult from '../components/PlayResult';
import TitleBar from '../components/TitleBar';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { calcStatisticsData, useCurrentBuyInData } from '../model';
import { BuyInData } from '../../../models/buyIn';
import mockBuyInData from './mockBuyInData.json';

interface IBuyInViewProps {
  data?: BuyInData;
}

const BuyInView = ({ data }: IBuyInViewProps) => {
  const currentBuyInData = useCurrentBuyInData();
  const buyInData = data ?? currentBuyInData.players.length > 0 ? currentBuyInData : mockBuyInData;

  const { amountPerhand, players: buyInPlayers } = buyInData;
  const statisticsData = useMemo(() => calcStatisticsData(buyInData), [buyInData]);

  return (
    <>
      <div className={initialStyles.container}>
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
    </>
  );
};
export default BuyInView;
