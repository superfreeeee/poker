import React from 'react';
import { TransactionOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ResetSetting } from '../components/BuyInPlaying/types';
import Header from '../../../components/Header';
import StatisticsDataView from '../components/StatisticsDataView';
import { useCurrentBuyInData } from '../../../models/buyIn';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import PlayResultView from './PlayResultView/index';

const BuyInView = () => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
  } = useCurrentBuyInData();

  const resetSetting: ResetSetting = ({ onOk, onCancel } = {}) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Reset buyIn data',
        content: 'Are you sure to reset buy-in data?',
        centered: true,
        closable: true,
        maskClosable: true,
        okButtonProps: {
          type: 'primary',
          danger: true,
        },
        okText: 'Reset',
        onOk: () => {
          onOk?.();
          resolve(true);
        },
        onCancel: () => {
          onCancel?.();
          resolve(false);
        },
      });
    });
  };

  return (
    <>
      <Header
        title="BuyIn Playing"
        back="/buyin/create"
        beforeNavigate={() => resetSetting()}
        style={{ alignSelf: 'stretch' }}
      />
      <div className={initialStyles.container}>
        <div className={initialStyles.header}>
          <div className={initialStyles.leftWrap}>
            <div style={{ fontSize: 20 }}>结算状态</div>
            <div>
              <TransactionOutlined className={initialStyles.iconMargin} /> 一手金额 {amountPerhand}
            </div>
          </div>

          <StatisticsDataView
            totalPlayer={totalPlayer}
            totalHands={totalHands}
            totalAmount={totalAmount}
          />
        </div>
        <div className={initialStyles.playerList}>
          {buyInPlayers.map((player) => (
            <PlayResultView
              key={player.id}
              player={player}
              amoutPerhand={amountPerhand}
            ></PlayResultView>
          ))}
        </div>
      </div>
    </>
  );
};
export default BuyInView;
