import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyInPrepare from '../components/BuyInPrepare';
import BuyInPlaying from '../components/BuyInPlaying';
import BuyInSettle from '../components/BuyInSettle';

const BuyInCreate = () => {
  const [buyInState, setBuyInState] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      {buyInState == 0 ? (
        <BuyInPrepare
          enterNextState={() => {
            setBuyInState(1);
            // console.log('xx')
          }}
        ></BuyInPrepare>
      ) : buyInState == 1 ? (
        <BuyInPlaying
          enterNextState={() => {
            setBuyInState(2);
          }}
          enterPrevState={() => {
            setBuyInState(0);
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
