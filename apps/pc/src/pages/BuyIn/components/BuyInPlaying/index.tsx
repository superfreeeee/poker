import React, { FC, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { TransactionOutlined, EditFilled, BackwardFilled } from '@ant-design/icons';
import { IBuyInData, IPlayer, useCurrentBuyInData } from '../../../../models/buyIn';
import Header from '../../../../components/Header';
import PlayerHandView from '../PlayerHandView';
import StatisticsDataView from '../StatisticsDataView';
import initialStyles from '../BuyInPrepare/index.module.scss';
import Editable from './Editable';
import styles from './index.module.scss';
import { ResetSetting } from './types';

interface IBuyInPlayingProps {
  enterNextState: () => void;
  enterPrevState: () => void;
}

interface IbuyInRecord {
  basicData: IBuyInData;
  totalPlayer: number;
  totalHands: number;
  totalAmount: number;
}

interface IBuyInHistory {
  buyInRecords: IbuyInRecord[];
  viewPtr: number;
  realPtr: number;
}
const BuyInPlaying: FC<IBuyInPlayingProps> = ({
  enterNextState,
  enterPrevState,
}: IBuyInPlayingProps) => {
  const [isEdit, setEdit] = useState(false);
  const {
    buyInData: buyInData,
    statisticsData: statisticsData,
    changeBuyInData,
  } = useCurrentBuyInData();

  const defaultBuyInHistory: IBuyInHistory = {
    buyInRecords: [
      {
        basicData: { amountPerhand: buyInData.amountPerhand, players: buyInData.players },
        totalPlayer: statisticsData.totalPlayer,
        totalHands: statisticsData.totalHands,
        totalAmount: statisticsData.totalAmount,
      },
    ],
    viewPtr: 0,
    realPtr: 0,
  };

  const [buyInHistory, setBuyInHistory] = useState(defaultBuyInHistory);

  const {
    basicData: { amountPerhand: amountPerhandView, players: buyInPlayersView },
    totalAmount: totalAmountView,
    totalHands: totalHandsView,
    totalPlayer: totalPlayerView,
  } = buyInHistory.buyInRecords[buyInHistory.viewPtr];

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

  useEffect(()=>{console.log(buyInHistory)},[])

  return (
    <div>
      <Header
        title="BuyIn Playing"
        back="/buyin/create"
        beforeNavigate={() => resetSetting()}
        style={{ alignSelf: 'stretch' }}
      />
      {isEdit ? (
        <Editable
          currentBuyInData={buyInHistory.buyInRecords[buyInHistory.viewPtr].basicData}
          onConfirm={(editBuyInData) => {
            setEdit(false);
            setBuyInHistory({
              buyInRecords: [...buyInHistory.buyInRecords, editBuyInData],
              viewPtr: buyInHistory.viewPtr + 1,
              realPtr: buyInHistory.realPtr + 1,
            });
          }}
          onCancel={() => {
            setEdit(false);
          }}
        />
      ) : (
        <div className={initialStyles.container}>
          <div className={initialStyles.header}>
            <div className={initialStyles.leftWrap}>
              <div style={{ fontSize: 20 }}>等待状态</div>
              <div>
                <TransactionOutlined className={initialStyles.iconMargin} /> 一手金额{' '}
                {amountPerhandView}
              </div>
            </div>

            <StatisticsDataView
              totalPlayer={totalPlayerView}
              totalHands={totalHandsView}
              totalAmount={totalAmountView}
            />
          </div>
          <div className={initialStyles.playerList}>
            {buyInPlayersView.map((player: IPlayer) => (
              <PlayerHandView key={player.id} player={player} />
            ))}
          </div>
          <div className={styles.buttonList}>
            <div className={styles.historyChangeBtns}>
              <div>
                <Button
                  className={styles.prevBtn}
                  icon={<EditFilled className={initialStyles.btnSvg} />}
                  disabled={buyInHistory.viewPtr === 0}
                  onClick={() => {
                    setBuyInHistory({ ...buyInHistory, viewPtr: buyInHistory.viewPtr - 1 });
                  }}
                >
                  上一次编辑
                </Button>
              </div>
              <div className={styles.historyBtnSecond}>
                <div>
                  <Button
                    className={initialStyles.addBtn}
                    onClick={() => {
                      const arr = buyInHistory.buyInRecords;
                      arr.splice(buyInHistory.viewPtr + 1);
                      setBuyInHistory({
                        ...buyInHistory,
                        buyInRecords: arr,
                        realPtr: buyInHistory.viewPtr,
                      });
                    }}
                  >
                    确认
                  </Button>
                </div>
                <div>
                  <Button
                    className={initialStyles.addBtn}
                    onClick={() => {
                      setBuyInHistory({
                        ...buyInHistory,
                        viewPtr: buyInHistory.realPtr,
                      });
                    }}
                  >
                    取消
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.stateChangeBtns}>
              <div className={styles.stateBtnSecond}>
                <div>
                  <Button
                    className={initialStyles.nextBtn}
                    icon={<BackwardFilled className={initialStyles.btnSvg} />}
                    onClick={() => {
                      resetSetting({
                        onOk: () => {
                          changeBuyInData({
                            amountPerhand: 0,
                            players: [],
                          });
                          enterPrevState();
                        },
                      });
                    }}
                  >
                    重置
                  </Button>
                </div>
                <div>
                  <Button
                    className={initialStyles.addBtn}
                    icon={<EditFilled className={initialStyles.btnSvg} />}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    进入编辑
                  </Button>
                </div>
              </div>
              <div className={styles.nextBtnWrap}>
                <Button
                  className={styles.nextBtn}
                  onClick={() => {
                    changeBuyInData(buyInHistory.buyInRecords[buyInHistory.realPtr].basicData);
                    enterNextState();
                  }}
                >
                  进入结算阶段
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyInPlaying;
