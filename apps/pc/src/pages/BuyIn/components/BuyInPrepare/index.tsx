import React, { ChangeEvent, FC, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import PlayerHand from '../PlayerHand';
import StatisticsDataView from '../StatisticsDataView';
import { useCurrentUser } from '../../../../models/user';
import { useCurrentBuyInData } from '../../../../models/buyIn';

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
  } = useCurrentBuyInData();

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

  const { run } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      const amount = +e.target.value;
      if (isNaN(amount)) {
        message.error('一手金额必须为正整数');
        return;
      }
      changeBuyInData({
        players: buyInPlayers,
        amountPerhand: amount,
      });
    },
    { wait: 500 },
  );

  const validateUserName = () => {
    let hasNull = false;
    buyInPlayers.forEach((player) => {
      if (player.name === '') {
        hasNull = true;
      }
    });
    return !hasNull;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>初始状态</div>
          <div className={styles.inputForm}>
            <div>一手金额</div>
            <Input
              placeholder="Input here"
              maxLength={11}
              defaultValue={amountPerhand}
              bordered={false}
              prefix={<TransactionOutlined />}
              onChange={run}
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
            onClick={addPlayer}
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
  );
};

export default BuyInPrepare;
