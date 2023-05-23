import React, { useState, FC } from 'react';
import { Input, Button, message } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import PlayerHand from '../../PlayerHand';
import { IPlayer, useBuyInData, IBuyInData } from '../../../../../models/buyIn';
import StatisticsDataView from '../../StatisticsDataView';
import initialStyles from '../../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IEditableProps {
  currentBuyInData: IBuyInData;
  onConfirm: (IBuyInData) => void;
  onCancel: () => void;
}

const Editable: FC<IEditableProps> = ({
  currentBuyInData,
  onConfirm,
  onCancel,
}: IEditableProps) => {
  const [editBuyInData, setEditBuyInPlayers] = useState(currentBuyInData);

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

  const judgeValidOperation = (id: string) => {
    return currentBuyInData.players.some((player) => player.id == id);
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
            player={player}
            isValidOperated={judgeValidOperation(player.id)}
            onRemove={(id: string) => {
              removeEditPlayer(id);
            }}
            onChange={(targetPlayer: IPlayer) => {
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
              className={initialStyles.addBtn}
              onClick={() => {
                if (validateUserName()) {
                  onConfirm({
                    basicData: editBuyInData,
                    totalPlayer: totalPlayer,
                    totalAmount: totalAmount,
                    totalHands: totalHands,
                  });
                } else {
                  message.error('玩家名不能为空');
                }
              }}
            >
              Confirm Change
            </Button>
          </div>
          <div>
            <Button
              className={initialStyles.nextBtn}
              onClick={() => {
                onCancel();
              }}
            >
              Cancel Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editable;
