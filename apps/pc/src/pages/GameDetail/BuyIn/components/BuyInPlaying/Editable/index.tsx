import React, { useState, FC } from 'react';
import { Button, message } from 'antd';
import { DownCircleFilled } from '@ant-design/icons';
import { BuyInData } from '../../../../../../models/buyIn';
import { useBuyInData } from '../../../model';
import PlayerHand from '../../PlayerHand';
import TitleBar from '../../TitleBar';
import initialStyles from '../../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IEditableProps {
  defaultBuyInData: BuyInData;
  onConfirm: (buyInData: BuyInData) => void;
  onCancel: () => void;
}

const PlayingEditable: FC<IEditableProps> = ({
  defaultBuyInData,
  onConfirm,
  onCancel,
}: IEditableProps) => {
  const [editBuyInData, setEditBuyInPlayers] = useState(defaultBuyInData);

  const {
    buyInData: { amountPerhand: editAmoutPerhand, players: editBuyInPlayers },
    statisticsData,
    addPlayer: addEditPlayer,
    removePlayer: removeEditPlayer,
    changePlayer: changeEditPlayer,
    changeBuyInData: changeEditBuyInData,
  } = useBuyInData({ buyInData: editBuyInData, setBuyInData: setEditBuyInPlayers });

  const validateUserName = () => {
    let hasNull = false;
    editBuyInPlayers.forEach((player) => {
      if (player.name === '') {
        hasNull = true;
      }
    });
    return !hasNull;
  };

  /**
   * 判断当前用户是否可以删除
   * @param id
   * @returns
   */
  const enableDelete = (id: string) => {
    const isRecentDelete = defaultBuyInData.players.some((player) => player.id == id);
    return !isRecentDelete;
  };

  return (
    <div className={initialStyles.container}>
      <TitleBar
        isEditable={true}
        title="编辑状态"
        amountPerhand={editAmoutPerhand}
        statisticsData={statisticsData}
        handleAmountPerhandChange={(amount) => {
          changeEditBuyInData({
            players: editBuyInPlayers,
            amountPerhand: amount,
          });
        }}
      ></TitleBar>
      <div className={initialStyles.playerList}>
        {editBuyInPlayers.map((player, i) => (
          <PlayerHand
            key={player.id}
            isEditable={true}
            amountPerhand={editAmoutPerhand}
            player={player}
            initHands={
              defaultBuyInData.players.find((defaultPlayer) => defaultPlayer.id === player.id)
                ?.hands
            }
            enableDelete={enableDelete(player.id)}
            onRemove={removeEditPlayer}
            onChange={(targetPlayer) => {
              changeEditPlayer(targetPlayer, i);
            }}
          ></PlayerHand>
        ))}
      </div>
      <div className={styles.buttonList}>
        <Button
          icon={<DownCircleFilled className={styles.btnSvg} />}
          onClick={() => {
            addEditPlayer();
          }}
        >
          Add more player
        </Button>
        <Button
          className={styles.bottomBtn}
          onClick={() => {
            onCancel();
          }}
        >
          Cancel Change
        </Button>
        <Button
          className={`${styles.btn} ${styles.deepBtn}`}
          onClick={() => {
            if (validateUserName()) {
              onConfirm(editBuyInData);
            } else {
              message.error('玩家名不能为空');
            }
          }}
        >
          Confirm Change
        </Button>
      </div>
    </div>
  );
};
export default PlayingEditable;
