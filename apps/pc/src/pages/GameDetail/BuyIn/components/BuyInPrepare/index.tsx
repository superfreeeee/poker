import React, { FC, useEffect } from 'react';
import { Button, message } from 'antd';
import { DownCircleFilled } from '@ant-design/icons';
import { useCurrentUser } from '../../../../../models/user';
import { useCreateBuyInData } from '../../model';
import PlayerHand from '../PlayerHand';
import { validateBuyInPlayers } from '../../utils';
import TitleBar from '../TitleBar';
import styles from './index.module.scss';

interface IBuyInPrepareProps {
  enterNextState: () => void;
}

const BuyInPrepare: FC<IBuyInPrepareProps> = ({ enterNextState }: IBuyInPrepareProps) => {
  const currentUser = useCurrentUser();
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData,
    addPlayer,
    removePlayer,
    changePlayer,
    changeBuyInData,
  } = useCreateBuyInData();

  useEffect(() => {
    if (currentUser) {
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

  const validateAmountPerhand = () => {
    return amountPerhand > 0;
  };

  const completePrepareStage = () => {
    if (!validateBuyInPlayers(buyInPlayers)) {
      message.error('玩家名不能为空');
      return;
    }

    if (!validateAmountPerhand()) {
      message.error('一手金额大于0');
      return;
    }

    enterNextState();
  };

  return (
    <div className={styles.container}>
      <TitleBar
        title="初始状态"
        isEditable={true}
        amountPerhand={amountPerhand}
        statisticsData={statisticsData}
        handleAmountPerhandChange={(amount) => {
          changeBuyInData({
            players: buyInPlayers,
            amountPerhand: amount,
          });
        }}
      ></TitleBar>
      <div className={styles.playerList}>
        {buyInPlayers.map((player, i) => (
          <PlayerHand
            key={player.id}
            isEditable={true}
            amountPerhand={amountPerhand}
            enableDelete={buyInPlayers.length > 1}
            player={player}
            onRemove={removePlayer}
            onChange={(player) => changePlayer(player, i)}
          ></PlayerHand>
        ))}
      </div>
      <div className={styles.buttonList}>
        <Button
          className={styles.addBtn}
          icon={<DownCircleFilled className={styles.btnSvg} />}
          onClick={addPlayer}
        >
          Add more player
        </Button>
        <Button className={styles.deepBtn} onClick={completePrepareStage}>
          Start play
        </Button>
      </div>
    </div>
  );
};

export default BuyInPrepare;
