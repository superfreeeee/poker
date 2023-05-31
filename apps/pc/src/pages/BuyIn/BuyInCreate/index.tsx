import React, { useState } from 'react';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';
// import { useBuyInDataAddService } from '../../../services/buyin';
// import { useCreateBuyInData } from '../model';

enum BuyInStage {
  Prepare = 'buyInPrepare',
  Playing = 'buyInPlaying',
  Settle = 'buyInSettle',
}

const BuyInCreate = () => {
  const [buyInState, setBuyInState] = useState(BuyInStage.Prepare);

  return (
    <div>
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
