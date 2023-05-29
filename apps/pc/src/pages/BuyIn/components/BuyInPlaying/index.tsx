import React, { FC, useState } from 'react';
import { Button, Steps } from 'antd';
import {
  EditFilled,
  BackwardFilled,
  ForwardOutlined,
  CloseOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import Header from '../../../../components/Header';
import PlayerHand from '../PlayerHand';
import TitleBar from '../TitleBar';
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
          <TitleBar
            isEditable={false}
            title="等待状态"
            statisticsData={viewStatisticData}
            amountPerhand={amoutPerhand}
          ></TitleBar>
          <div className={initialStyles.playerList}>
            {buyInPlayers.map((player) => (
              <PlayerHand
                key={player.id}
                player={player}
                amountPerhand={amoutPerhand}
                isEditable={false}
              />
            ))}
          </div>
          {isHistoryVisible ? (
            <>
              <div className={styles.stepList}>
                <Steps progressDot current={viewIndex} items={totalData} />
              </div>
              <div className={styles.buttonList}>
                <Button
                  className={styles.btn}
                  icon={<EditFilled className={initialStyles.btnSvg} />}
                  disabled={!hasLastRecord}
                  onClick={viewLastRecord}
                >
                  上一步
                </Button>
                <Button
                  className={styles.btn}
                  icon={<EditFilled className={initialStyles.btnSvg} />}
                  disabled={!hasNextRecord}
                  onClick={viewNextRecord}
                >
                  下一步
                </Button>
                <Button
                  className={styles.btn}
                  icon={<CloseOutlined />}
                  onClick={() => {
                    cancelView();
                    setHistoryVisibile(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  className={classNames(styles.btn, styles.deepBtn)}
                  icon={<CheckOutlined />}
                  onClick={() => {
                    confirmView();
                    setHistoryVisibile(false);
                  }}
                >
                  确认
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.buttonList}>
              <Button
                className={styles.btn}
                icon={<ClockCircleOutlined className={initialStyles.btnSvg} />}
                disabled={historyLength <= 1}
                onClick={() => {
                  setHistoryVisibile(true);
                }}
              >
                历史状态
              </Button>
              <Button
                className={styles.btn}
                icon={<EditFilled className={initialStyles.btnSvg} />}
                onClick={() => {
                  setEdit(true);
                }}
              >
                编辑
              </Button>
              <Button
                className={styles.btn}
                icon={<BackwardFilled className={initialStyles.btnSvg} />}
                onClick={backPrepare}
              >
                重置
              </Button>
              <Button
                className={classNames(styles.btn, styles.deepBtn)}
                icon={<ForwardOutlined className={initialStyles.btnSvg} />}
                onClick={enterNextState}
              >
                结算
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyInPlaying;
