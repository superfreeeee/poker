import React, { FC, useEffect, useRef } from 'react';
import { Input, Button, message } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import Header from '../../../../components/Header';
import { useCurrentUser } from '../../../../models/user';
import { useCreateBuyInData } from '../../model';
import PlayerHand from '../PlayerHand';
import StatisticsDataView from '../StatisticsDataView';
import styles from './index.module.scss';

interface IBuyInPrepareProps {
  enterNextState: () => void;
}

const BuyInPrepare: FC<IBuyInPrepareProps> = ({ enterNextState }: IBuyInPrepareProps) => {
  const currentUser = useCurrentUser();
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    addPlayer,
    removePlayer,
    changePlayer,
    changeBuyInData,
  } = useCreateBuyInData();

  useEffect(() => {
    if (currentUser !== undefined) {
      changeBuyInData({
        amountPerhand: amountPerhand,
        players: [
          {
            id: currentUser.id,
            name: currentUser.name,
            hands: 1,
            rest: 0,
          },
        ],
      });
    }
  }, []);

  const validateUserName = () => {
    let hasNull = false;
    buyInPlayers.forEach((player) => {
      if (player.name === '') {
        hasNull = true;
      }
    });
    return !hasNull;
  };

  const playListRef = useRef(null);

  return (
    <>
      <Header title="BuyIn Prepare" back style={{ alignSelf: 'stretch' }} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.leftWrap}>
            <div style={{ fontSize: 20 }}>初始状态</div>
            <div className={styles.inputForm}>
              <div>一手金额</div>
              <Input
                placeholder="Input here"
                maxLength={11}
                value={amountPerhand}
                bordered={false}
                prefix={<TransactionOutlined />}
                onChange={(e) => {
                  const amount = +e.target.value;
                  if (isNaN(amount)) {
                    message.error('一手金额必须为正整数');
                    return;
                  }
                  changeBuyInData({
                    players: buyInPlayers,
                    amountPerhand: amount,
                  });
                }}
              />
            </div>
          </div>
          <StatisticsDataView
            totalPlayer={totalPlayer}
            totalHands={totalHands}
            totalAmount={totalAmount}
          />
        </div>
        <div className={styles.playerList}>
          {buyInPlayers.map((player, i) => (
            <PlayerHand
              key={player.id}
              amoutPerhand={amountPerhand}
              player={player}
              isValidOperated={false}
              onRemove={removePlayer}
              onChange={(player) => changePlayer(player, i)}
            ></PlayerHand>
          ))}
        </div>
        <div className={styles.buttonList}>
          <div>
            <Button
              className={styles.addBtn}
              icon={<DownCircleFilled className={styles.btnSvg} />}
              onClick={() => {
                addPlayer();
                console.log(playListRef.current);
              }}
            >
              Add more player
            </Button>
          </div>
          <div>
            <Button
              className={styles.nextBtn}
              onClick={() => {
                if (validateUserName()) {
                  enterNextState();
                } else {
                  message.error('玩家名不能为空');
                }
              }}
            >
              Start play
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyInPrepare;
