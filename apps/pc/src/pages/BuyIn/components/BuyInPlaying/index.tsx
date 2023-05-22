import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { TransactionOutlined, EditFilled, BackwardFilled } from '@ant-design/icons';
import { IBuyInData, IPlayer, useCurrentBuyInData } from '../../../../models/buyIn';
import PlayerHandView from '../PlayerHandView';
import StatisticsDataView from '../StatisticsDataView';
import initialStyles from '../BuyInPrepare/index.module.scss';
import Editable from './Editable';
import styles from './index.module.scss';

interface IBuyInPlayingProps {
  enterNextState: () => void;
  enterPrevState: () => void;
}
const BuyInPlaying: FC<IBuyInPlayingProps> = ({
  enterNextState,
  enterPrevState,
}: IBuyInPlayingProps) => {
  const [isEdit, setEdit] = useState(false);
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    changeBuyInData,
  } = useCurrentBuyInData();
  const [buyInDataHistory, setBuyInDataHistory] = useState([
    { amountPerhand: amountPerhand, players: buyInPlayers },
  ]);

  const reset = () => {
    changeBuyInData({
      amountPerhand: 0,
      players: [],
    });
    enterPrevState();
  };

  const addHistory = (editBuyInData: IBuyInData) => {
    const arr = buyInDataHistory.slice();
    arr.push(editBuyInData);
    setBuyInDataHistory(arr);
  };

  return (
    <div>
      {isEdit ? (
        <Editable
          exitEdit={(editBuyInData) => {
            setEdit(false);
            addHistory(editBuyInData);
          }}
        />
      ) : (
        <div className={initialStyles.container}>
          <div className={initialStyles.header}>
            <div className={initialStyles.leftWrap}>
              <div style={{ fontSize: 20 }}>等待状态</div>
              <div>
                <TransactionOutlined className={initialStyles.iconMargin} /> 一手金额{' '}
                {amountPerhand}
              </div>
            </div>

            <StatisticsDataView
              totalPlayer={totalPlayer}
              totalHands={totalHands}
              totalAmount={totalAmount}
            />
          </div>
          <div className={initialStyles.playerList}>
            {buyInPlayers.map((player: IPlayer) => (
              <PlayerHandView key={player.id} player={player} />
            ))}
          </div>
          <div className={styles.buttonList}>
            <div className={styles.twoBtnContainer}>
              <div>
                <Button
                  className={styles.nextBtn}
                  icon={<BackwardFilled className={initialStyles.btnSvg} />}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset Setting
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
                  Edit Setting
                </Button>
              </div>
            </div>
            <div>
              <Button className={styles.nextBtn} onClick={() => enterNextState()}>
                Enter Settlement Stage
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyInPlaying;
