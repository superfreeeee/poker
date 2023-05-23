import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';

enum BuyInState {
  Prepare = 'buyInPrepare',
  Playing = 'buyInPlaying',
  Settle = 'buyInSettle',
}

const BuyInCreate = () => {
  const [buyInState, setBuyInState] = useState(BuyInState.Prepare);
  const navigate = useNavigate();
  return (
    <div>
      {buyInState == BuyInState.Prepare ? (
        <BuyInPrepare
          enterNextState={() => {
            setBuyInState(BuyInState.Playing);
          }}
        ></BuyInPrepare>
      ) : buyInState == BuyInState.Playing ? (
        <BuyInPlaying
          enterNextState={() => {
            setBuyInState(BuyInState.Settle);
          }}
          enterPrevState={() => {
            setBuyInState(BuyInState.Prepare);
          }}
        ></BuyInPlaying>
      ) : (
        <BuyInSettle
          enterNextState={() => {
            navigate('/buyin/detail');
          }}
        ></BuyInSettle>
      )}
    </div>
  );
};
export default BuyInCreate;
