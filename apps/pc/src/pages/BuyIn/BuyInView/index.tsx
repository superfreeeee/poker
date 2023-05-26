import React, { useMemo } from 'react';
import Header from '../../../components/Header';
import PlayResult from '../components/PlayResult';
import TitleBar from '../components/TitleBar';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { calcStatisticsData, useCurrentBuyInData } from '../model';
import mockBuyInData from './mockBuyInData.json';

const BuyInView = () => {
  // TODO
  // const buyInData = useXxxAPI();

  const currentBuyInData = useCurrentBuyInData();
  const buyInData = currentBuyInData.players.length > 0 ? currentBuyInData : mockBuyInData;

  const { amountPerhand, players: buyInPlayers } = buyInData;
  const statisticsData = useMemo(() => calcStatisticsData(buyInData), [buyInData]);

  return (
    <>
      <Header title="BuyIn Detail" back="/" style={{ alignSelf: 'stretch' }} />
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
