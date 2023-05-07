import React, { useMemo, ChangeEvent } from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { createLogger } from '../../common/commonLogger';
import PlayerHand from '../PlayerHand';
import {
  IPlayer,
  changeHandPlayer,
  changeNamePlayer,
  addPlayer,
  removePlayer,
  useAmountPerHand,
  useBuyInPlayer,
  ISumData,
} from '../../models/buyIn';
import styles from "./index.module.scss"

const buyInlogger = createLogger('pages/BuyIn');
const defaultSumData: ISumData = {
  playerSum: 1,
  handSum: 1,
  amountSum: 0,
};

const calSumData = (details: IPlayer[], amoutPerHand: number): ISumData => {
  const sumData: ISumData = defaultSumData;
  sumData.playerSum = details.length;
  let handSum = 0;
  details.forEach((element: IPlayer) => {
    handSum += element.hands;
  });
  sumData.handSum = handSum;
  sumData.amountSum = handSum * amoutPerHand;
  return sumData;
};

const InitialState = () => {
  const [amountPerHand, setAmountPerHand] = useAmountPerHand(); //这里关于useInput的复用
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayer();
  const sumData = useMemo(() => {
    return calSumData(buyInPlayers, amountPerHand);
  }, [amountPerHand, buyInPlayers]);

  // 计算规则

  // useEffect(() => {
  //   const newSumData: ISumData = calSumData(buyInPlayers, amountPerHand);
  //   setSumData(newSumData);
  // }, [amountPerHand, buyInPlayers]);

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
                  // if (isNumber(e.target.value)) {
                  //   buyInlogger.log(`amount = ${e.target.value}`);
                  //   setAmountPerHand(e.target.value);
                  // }
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
          <PlayerHand
            key={element.id}
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
        ))}
      </div>
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
        <Button className={styles.nextBtn}>Start play</Button>
      </div>
    </div>
  );
};

export default InitialState;
