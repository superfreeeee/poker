import React, { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';
// import { useBuyInDataAddService } from '../../../services/buyin';
// import { useCreateBuyInData } from '../model';
import '../../../mock/buyIn';

enum BuyInStage {
  Prepare = 'buyInPrepare',
  Playing = 'buyInPlaying',
  Settle = 'buyInSettle',
}

const BuyInCreate = () => {
  const [buyInState, setBuyInState] = useState(BuyInStage.Prepare);
  const navigate = useNavigate();

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
          enterNextState={() => {
            navigate(generatePath('/buyin/detail/:id', { id: '234567' }));
          }}
        ></BuyInSettle>
      )}
    </div>
  );
};
export default BuyInCreate;
