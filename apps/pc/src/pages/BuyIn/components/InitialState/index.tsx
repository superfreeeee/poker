import React, { useMemo, ChangeEvent } from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createLogger } from '../../../../common/commonLogger';
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
import styles from './index.module.scss';

const buyInlogger = createLogger('pages/BuyIn');

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

const InitialState = () => {
  const [amountPerHand, setAmountPerHand] = useAmountPerHand(); //这里关于useInput的复用
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayers();
  const sumData = useMemo(() => {
    return calSumData(buyInPlayers, amountPerHand);
  }, [amountPerHand, buyInPlayers]);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>初始状态</div>
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
                defaultValue={amountPerHand}
                bordered={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const num = Number(e.target.value);
                  setAmountPerHand(num);
                  buyInlogger.log(`amountPerHand = ${amountPerHand}`);
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
        {buyInPlayers.map((element: IPlayer) => (
          <div key={element.id} className={styles.playerContainer}>
            <PlayerHand
              player={element}
              remove={(id: string) => {
                setBuyInPlayers(removePlayer(buyInPlayers, id));
              }}
              changeName={(id: string, name: string) => {
                setBuyInPlayers(changeNamePlayer(buyInPlayers, id, name));
              }}
              changeHand={(id: string, hand: number) => {
                buyInlogger.log(`Hand = ${hand}`);
                setBuyInPlayers(changeHandPlayer(buyInPlayers, id, hand));
              }}
            ></PlayerHand>
          </div>
        ))}
      </div>
      <div className={styles.buttonList}>
        <div>
          <Button
            className={styles.addBtn}
            icon={<DownCircleFilled className={styles.btnSvg} />}
            onClick={() => {
              setBuyInPlayers(addPlayer(buyInPlayers));
            }}
          >
            Add more player
          </Button>
        </div>
        <div>
          <Button
            className={styles.nextBtn}
            onClick={() => navigate(getPath(ERouteName.BuyInWait))}
          >
            Start play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InitialState;
