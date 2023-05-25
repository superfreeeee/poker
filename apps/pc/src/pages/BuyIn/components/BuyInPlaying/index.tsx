import React, { FC, useState } from 'react';
import { Button, Steps } from 'antd';
import {
  TransactionOutlined,
  EditFilled,
  BackwardFilled,
  ForwardOutlined,
  RollbackOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import Header from '../../../../components/Header';
import PlayerHandView from '../PlayerHandView';
import StatisticsDataView from '../StatisticsDataView';
import { useCreateBuyInDataHistory } from '../../model';
import { confirmModal } from '../../utils';
import initialStyles from '../BuyInPrepare/index.module.scss';
import PlayingEditable from './Editable';
import styles from './index.module.scss';

interface IBuyInPlayingProps {
  enterNextState: () => void;
  enterPrevState: () => void;
}

const BuyInPlaying: FC<IBuyInPlayingProps> = ({
  enterNextState,
  enterPrevState,
}: IBuyInPlayingProps) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isHistoryVisible, setHistoryVisibile] = useState<boolean>(false);
  const {
    viewBuyInData, // history[index]
    viewBuyInData: { amountPerhand: amoutPerhand, players: buyInPlayers },
    viewStatisticData,
    stepIndex: { viewIndex, totalData },
    historyLength,
    hasLastRecord,
    hasNextRecord,
    viewLastRecord,
    viewNextRecord,
    confirmView,
    cancelView,
    pushState,
    resetHistory,
  } = useCreateBuyInDataHistory();

  const backPrepare = async () => {
    await confirmModal({
      title: 'Reset buyIn data',
      content: 'Are you sure to reset buy-in data?',
      onOk: () => {
        resetHistory();
        enterPrevState();
      },
    });
    return false;
  };

  return (
    <div>
      <Header
        title="BuyIn Playing"
        back="/buyin/create"
        beforeNavigate={backPrepare}
        style={{ alignSelf: 'stretch' }}
      />
      {isEdit ? (
        <PlayingEditable
          defaultBuyInData={viewBuyInData}
          onConfirm={(editBuyInData) => {
            pushState(editBuyInData);
            setEdit(false);
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
                <TransactionOutlined className={initialStyles.iconMargin} /> 一手金额 {amoutPerhand}
              </div>
            </div>

            <StatisticsDataView
              totalPlayer={viewStatisticData.totalPlayer}
              totalHands={viewStatisticData.totalHands}
              totalAmount={viewStatisticData.totalAmount}
            />
          </div>
          <div className={initialStyles.playerList}>
            {buyInPlayers.map((player) => (
              <PlayerHandView key={player.id} player={player} amountPerhand={amoutPerhand} />
            ))}
          </div>
          <>
            {isHistoryVisible ? (
              <>
                <div className={styles.stepList}>
                  <Steps progressDot current={viewIndex} items={totalData} />
                </div>
                <div className={styles.buttonList}>
                  <div className={styles.btnRow}>
                    <div>
                      <Button
                        className={styles.btn}
                        icon={<EditFilled className={initialStyles.btnSvg} />}
                        disabled={!hasLastRecord}
                        onClick={viewLastRecord}
                      >
                        上一次编辑
                      </Button>
                    </div>
                    <div>
                      <Button
                        className={styles.btn}
                        icon={<EditFilled className={initialStyles.btnSvg} />}
                        disabled={!hasNextRecord}
                        onClick={viewNextRecord}
                      >
                        下一次编辑
                      </Button>
                    </div>
                  </div>
                  <div className={styles.btnRow}>
                    <div>
                      <Button
                        className={styles.btn}
                        icon={<CloseOutlined />}
                        onClick={() => {
                          cancelView();
                          setHistoryVisibile(false);
                        }}
                      >
                        取消修改
                      </Button>
                    </div>
                    <div>
                      <Button
                        className={classNames(styles.btn, styles.deepBtn)}
                        icon={<CheckOutlined />}
                        onClick={() => {
                          confirmView();
                          setHistoryVisibile(false);
                        }}
                      >
                        确认修改
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.buttonList}>
                <div className={styles.btnRow}>
                  <div>
                    <Button
                      className={styles.btn}
                      icon={<RollbackOutlined className={initialStyles.btnSvg} />}
                      disabled={historyLength <= 1}
                      onClick={() => {
                        setHistoryVisibile(true);
                      }}
                    >
                      进入历史编辑
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={styles.btn}
                      icon={<EditFilled className={initialStyles.btnSvg} />}
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      进入编辑阶段
                    </Button>
                  </div>
                </div>
                <div className={styles.btnRow}>
                  <div>
                    <Button
                      className={styles.btn}
                      icon={<BackwardFilled className={initialStyles.btnSvg} />}
                      onClick={backPrepare}
                    >
                      进入重置阶段
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={`${styles.btn} ${styles.deepBtn}`}
                      icon={<ForwardOutlined className={initialStyles.btnSvg} />}
                      onClick={enterNextState}
                    >
                      进入结算阶段
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default BuyInPlaying;
