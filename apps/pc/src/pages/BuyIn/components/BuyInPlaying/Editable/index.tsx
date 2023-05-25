import React, { useState, FC } from 'react';
import { Input, Button, message } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import { BuyInData } from '../../../../../models/buyIn';
import { useBuyInData } from '../../../model';
import PlayerHand from '../../PlayerHand';
import StatisticsDataView from '../../StatisticsDataView';
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
    statisticsData: { totalPlayer, totalHands, totalAmount },
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
      <div className={initialStyles.header}>
        <div className={initialStyles.leftWrap}>
          <div style={{ fontSize: 20 }}>编辑状态</div>
          <div className={initialStyles.inputForm}>
            <div>一手金额</div>
            <Input
              placeholder="Input here"
              maxLength={11}
              value={editAmoutPerhand}
              bordered={false}
              prefix={<TransactionOutlined />}
              onChange={(e) => {
                const amount = +e.target.value;
                if (isNaN(amount)) {
                  message.error('一手金额必须为正整数');
                  return;
                }
                changeEditBuyInData({
                  players: editBuyInPlayers,
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
      <div className={initialStyles.playerList}>
        {editBuyInPlayers.map((player, i) => (
          <PlayerHand
            key={player.id}
            amoutPerhand={editAmoutPerhand}
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
        <div>
          <Button
            className={styles.singleBtn}
            icon={<DownCircleFilled className={styles.btnSvg} />}
            onClick={() => {
              addEditPlayer();
            }}
          >
            Add more player
          </Button>
        </div>
        <div className={styles.twoBtnContainer}>
          <div>
            <Button
              className={styles.btn}
              onClick={() => {
                onCancel();
              }}
            >
              Cancel Change
            </Button>
          </div>
          <div>
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
      </div>
    </div>
  );
};
export default PlayingEditable;
