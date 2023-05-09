import React, { useState, FC } from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import PlayerHand from '../PlayerHand';
import {
  useCurrentBuyInData,
  useBuyInDataActions,
  useBuyInSumData,
} from '../../../../models/buyIn';
import styles from '../BuyInPrepare/index.module.scss';
import BuyInTitle from '../BuyInTitle';
import ownStyles from './index.module.scss';

interface IEditableProps {
  exitEdit: () => void;
}

const Editable: FC<IEditableProps> = ({ exitEdit }: IEditableProps) => {
  const { currentBuyInData } = useCurrentBuyInData();

  const [editableData, setEditableData] = useState(currentBuyInData);
  const sumData = useBuyInSumData(editableData);
  const { addPlayer, removePlayer, changePlayer, changeCurrentBuyInData } = useBuyInDataActions([
    editableData,
    setEditableData,
  ]);

  const editAmountPerhand = editableData.amountPerhand;
  const editBuyInPlayers = editableData.players;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BuyInTitle title="编辑状态" totalAmount={sumData.amountSum} />
        <div className={styles.sumData}>
          <div className={styles.inputContainer}>
            <TransactionOutlined className={styles.iconMargin} /> 一手金额
            <div className={styles.inputHand}>
              <Input
                placeholder="Input here"
                maxLength={10}
                defaultValue={editAmountPerhand}
                bordered={false}
                onChange={(e) => {
                  const amount = +e.target.value;
                  if (isNaN(amount)) {
                    return;
                  }

                  changeCurrentBuyInData({
                    players: editBuyInPlayers,
                    amountPerhand: amount,
                  });
                }}
              />
            </div>
          </div>
          <div>
            <SmileOutlined className={styles.iconMargin} />
            总玩家数 {sumData.playerSum}
          </div>
          <div>
            <SelectOutlined className={styles.iconMargin} />
            总买入手数 {sumData.handSum}
          </div>
        </div>
      </div>
      <div className={styles.playerList}>
        {editBuyInPlayers.map((element, i) => (
          <div key={element.id} className={styles.playerContainer}>
            <PlayerHand
              player={element}
              onRemove={removePlayer}
              onChange={(player) => changePlayer(player, i)}
            ></PlayerHand>
          </div>
        ))}
      </div>
      <div className={ownStyles.buttonList}>
        <div>
          <Button
            className={ownStyles.singleBtn}
            icon={<DownCircleFilled className={ownStyles.btnSvg} />}
            onClick={addPlayer}
          >
            Add more player
          </Button>
        </div>
        <div className={ownStyles.twoBtnContainer}>
          <div>
            <Button
              className={styles.addBtn}
              onClick={() => {
                changeCurrentBuyInData({
                  amountPerhand: editAmountPerhand,
                  players: editBuyInPlayers,
                });
                exitEdit();
              }}
            >
              Confirm Change
            </Button>
          </div>
          <div>
            <Button
              className={styles.nextBtn}
              onClick={() => {
                exitEdit();
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
