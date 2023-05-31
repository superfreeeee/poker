import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Steps } from 'antd';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';
import Header from '../../../../components/Header';
import styles from "./index.module.scss"

enum BuyInStage {
  Prepare = 'buyInPrepare',
  Playing = 'buyInPlaying',
  Settle = 'buyInSettle',
}

const stepInfo = [
  { title: BuyInStage.Prepare },
  { title: BuyInStage.Playing },
  { title: BuyInStage.Settle },
];

const BuyInCreate = () => {
  const [buyInState, setBuyInState] = useState(BuyInStage.Prepare);
  const { gameId } = useParams();

  return (
    <div>
      <Header title="BuyIn Create" back={gameId ? '..' : true} style={{ alignSelf: 'stretch' }} />
      <Steps
        className={styles.step}
        current={stepInfo.findIndex((stage) => stage.title == buyInState)}
        items={stepInfo}
      ></Steps>
      {buyInState == BuyInStage.Prepare ? (
        <BuyInPrepare
          enterNextState={() => {
            setBuyInState(BuyInStage.Playing);
          }}
        ></BuyInPrepare>
      ) : buyInState == BuyInStage.Playing ? (
        <BuyInPlaying
          enterNextState={() => {
            setBuyInState(BuyInStage.Settle);
          }}
          enterPrevState={() => {
            setBuyInState(BuyInStage.Prepare);
          }}
        ></BuyInPlaying>
      ) : (
        <BuyInSettle
          enterPrevState={() => {
            setBuyInState(BuyInStage.Playing);
          }}
        ></BuyInSettle>
      )}
    </div>
  );
};
export default BuyInCreate;
