import React, { ChangeEvent, useState, FC, useMemo } from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';
import PlayerHand from '../PlayerHand';
import { IPlayer, useCurrentBuyInData, calcSumData } from '../../../../models/buyIn';
import styles from '../BuyInPrepare/index.module.scss';
import ownStyles from './index.module.scss';

interface IEditableProps {
  exitEdit: () => void;
}

const Editable: FC<IEditableProps> = ({ exitEdit }: IEditableProps) => {
  const {
    currentBuyInData: { amountPerhand, players: buyInPlayers },
    changeCurrentBuyInData,
  } = useCurrentBuyInData();
  const [editAmountPerhand, setEditAmoutPerhand] = useState(amountPerhand);
  const [editBuyInPlayers, setEditBuyInPlayers] = useState(buyInPlayers);
  const sumData = useMemo(
    () => calcSumData({ amountPerhand: editAmountPerhand, players: editBuyInPlayers }),
    [editAmountPerhand, editBuyInPlayers],
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>编辑状态</div>
          <div className={styles.amountSum}>
            <div>
              <DollarOutlined /> 总买入金额
            </div>
            <div>{sumData.amountSum} </div>
          </div>
        </div>

        <div className={styles.sumData}>
          <div className={styles.inputContainer}>
            <TransactionOutlined className={styles.iconMargin} /> 一手金额
            <div className={styles.inputHand}>
              <Input
                placeholder="Input here"
                maxLength={10}
                defaultValue={editAmountPerhand}
                bordered={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEditAmoutPerhand(Number(e.target.value));
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
        {editBuyInPlayers.map((element: IPlayer) => (
          <div key={element.id} className={styles.playerContainer}>
            <PlayerHand
              player={element}
              remove={(id: string) => {
                setEditBuyInPlayers(editBuyInPlayers.filter((player) => player.id != id));
              }}
              change={(targetPlayer: IPlayer) => {
                setEditBuyInPlayers([
                  ...editBuyInPlayers.filter((player) => player.id != targetPlayer.id),
                  targetPlayer,
                ]);
              }}
            ></PlayerHand>
          </div>
        ))}
      </div>
      <div className={ownStyles.buttonList}>
        <div>
          <Button
            className={ownStyles.singleBtn}
            icon={<DownCircleFilled className={ownStyles.btnSvg} />}
            onClick={() => {
              setEditBuyInPlayers([
                ...editBuyInPlayers,
                {
                  id: nanoid(),
                  name: '',
                  hands: 1,
                  rest: 0,
                },
              ]);
            }}
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
