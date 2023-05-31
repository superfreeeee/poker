import React, { useState } from 'react';
import { Steps } from 'antd';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';
import Header from '../../../../components/Header';
import styles from './index.module.scss';

enum BuyInStage {
  Prepare = 'buyInPrepare',
  Playing = 'buyInPlaying',
  Settle = 'buyInSettle',
}

const stageTitleMap = {
  [BuyInStage.Prepare]: '起手买入',
  [BuyInStage.Playing]: '游戏中',
  [BuyInStage.Settle]: '结算',
};

const steps = [BuyInStage.Prepare, BuyInStage.Playing, BuyInStage.Settle];

const stepsInfo = steps.map((step) => ({ title: stageTitleMap[step] }));

const BuyInCreate = () => {
  const [stage, setStage] = useState(BuyInStage.Prepare);

  return (
    <div>
      <Header title="BuyIn Create" back={'..'} style={{ alignSelf: 'stretch' }} />
      <Steps className={styles.step} current={steps.indexOf(stage)} items={stepsInfo} />
      {stage === BuyInStage.Prepare ? (
        <BuyInPrepare
          enterNextState={() => {
            setStage(BuyInStage.Playing);
          }}
        />
      ) : stage === BuyInStage.Playing ? (
        <BuyInPlaying
          enterNextState={() => {
            setStage(BuyInStage.Settle);
          }}
          enterPrevState={() => {
            setStage(BuyInStage.Prepare);
          }}
        />
      ) : stage === BuyInStage.Settle ? (
        <BuyInSettle
          enterPrevState={() => {
            setStage(BuyInStage.Playing);
          }}
        />
      ) : null}
    </div>
  );
};
export default BuyInCreate;
