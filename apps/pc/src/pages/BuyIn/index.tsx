import React, { FC } from 'react';
import InitialState from '../../components/InitialState';
import WaitState from '../../components/WaitState';

interface IBuyInProps {}

const BuyIn: FC<IBuyInProps> = () => {

  return (
    <div>
      <h1>Buy-in page</h1>
      <InitialState></InitialState>
      <WaitState></WaitState>
    </div>
  );
};

export default BuyIn;
