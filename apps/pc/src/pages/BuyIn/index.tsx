import React, { FC } from 'react';
import InitialState from './components/InitialState';

interface IBuyInProps {}

const BuyIn: FC<IBuyInProps> = () => {
  return (
    <div>
      <h1>Buy-in page</h1>
      <InitialState></InitialState>
    </div>
  );
};

export default BuyIn;
