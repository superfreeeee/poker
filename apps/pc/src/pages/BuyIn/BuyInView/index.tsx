import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ResetSetting } from '../components/BuyInPlaying/types';
import Header from '../../../components/Header';
import PlayResult from '../components/PlayResult';
import StatisticsDataView from '../components/StatisticsDataView';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { useCreateBuyInData } from '../model';

const BuyInView = () => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
  } = useCreateBuyInData();

  const navigate = useNavigate();

  const resetSetting: ResetSetting = ({ onOk, onCancel } = {}) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Back to Home',
        content: 'Are you sure to go back to home?',
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
        title="BuyIn Detail"
        back="/"
        beforeNavigate={() => resetSetting({ onOk: () => navigate('/') })}
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
