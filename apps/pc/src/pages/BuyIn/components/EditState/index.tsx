import React, { useMemo, ChangeEvent, useState } from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PlayerHand from '../PlayerHand';
import {
  IPlayer,
  BuyInPlayer,
  changeHandPlayer,
  changeNamePlayer,
  addPlayer,
  removePlayer,
  useAmountPerHand,
  useBuyInPlayers,
  ISumData,
} from '../../../../models/buyIn';
import { ERouteName } from '../../../../routes/constants';
import { getPath } from '../../../../routes/utils';
import styles from '../InitialState/index.module.scss';
import ownStyles from './index.module.scss';

const calSumData = (details: BuyInPlayer, amoutPerHand: number): ISumData => {
  let handSum = 0;
  details.forEach((element: IPlayer) => {
    handSum += element.hands;
  });
  const sumData: ISumData = {
    playerSum: details.length,
    handSum: handSum,
    amountSum: handSum * amoutPerHand,
  };
  return sumData;
};

const EditState = () => {
  const [amountPerHand, setAmountPerHand] = useAmountPerHand();
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayers();
  const [editAmountPerHand, setEditAmountPerHand] = useState(amountPerHand);
  const [editBuyInPlayers, setEditBuyInPlayers] = useState(buyInPlayers);

  const sumData = useMemo(() => {
    return calSumData(editBuyInPlayers, editAmountPerHand);
  }, [editAmountPerHand, editBuyInPlayers]);
  const navigate = useNavigate();

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
                defaultValue={editAmountPerHand}
                bordered={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const num = Number(e.target.value);
                  setEditAmountPerHand(num);
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
                setEditBuyInPlayers(removePlayer(editBuyInPlayers, id));
              }}
              changeName={(id: string, name: string) => {
                setEditBuyInPlayers(changeNamePlayer(editBuyInPlayers, id, name));
              }}
              changeHand={(id: string, hand: number) => {
                setEditBuyInPlayers(changeHandPlayer(editBuyInPlayers, id, hand));
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
              setEditBuyInPlayers(addPlayer(editBuyInPlayers));
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
                setBuyInPlayers(editBuyInPlayers);
                setAmountPerHand(editAmountPerHand);
                // navigate(getPath(ERouteName.BuyInWait))
              }}
            >
              Confirm Change
            </Button>
          </div>
          <div>
            <Button
              className={styles.nextBtn}
              onClick={() => navigate(getPath(ERouteName.BuyInWait))}
            >
              Cancel Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditState;
