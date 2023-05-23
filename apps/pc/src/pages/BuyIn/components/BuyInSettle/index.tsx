import React, { FC } from 'react';
import { Button, Modal } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import Header from '../../../../components/Header';
import StatisticsDataView from '../StatisticsDataView';
import { ResetSetting } from '../BuyInPlaying/types';
import { useCreateBuyInData } from '../../model';
import PlayResult from '../PlayResult';
import initialStyles from '../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IBuyInSettleProps {
  enterPrevState: () => void;
  enterNextState: () => void;
}
const BuyInSettle: FC<IBuyInSettleProps> = ({
  enterPrevState,
  enterNextState,
}: IBuyInSettleProps) => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    totalBenefit,
    changePlayer,
  } = useCreateBuyInData();

  const resetSetting: ResetSetting = ({ onOk, onCancel } = {}) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Back to playing',
        content: 'Are you sure to go back to playing stage?',
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
        title="BuyIn Settle"
        back="/buyin/create"
        beforeNavigate={() =>
          resetSetting({
            onOk: () => {
              enterPrevState();
            },
          })
        }
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
          {buyInPlayers.map((player, i) => (
            <PlayResult
              key={player.id}
              player={player}
              amoutPerHand={amountPerhand}
              onChange={(player) => changePlayer(player, i)}
            ></PlayResult>
          ))}
        </div>
        <div className={styles.buttonList}>
          <div className={styles.resUnderLine}>最终盈余总计 {totalBenefit}</div>
          <div>
            <Button
              className={initialStyles.nextBtn}
              onClick={() => enterNextState()}
              disabled={totalBenefit != 0}
            >
              Show final result
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyInSettle;
