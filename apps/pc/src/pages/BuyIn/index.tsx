import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { IBuyInData } from '../../models/buyIn';
// import InitialState from './components/InitialState';

interface IBuyInProps {
  data?: IBuyInData;
}

const BuyIn: FC<IBuyInProps> = () => {
  return (
    <div>
      <h1>Buy-in page</h1>
      {/* <InitialState></InitialState> */}
      <Outlet />
    </div>
  );
};

export default BuyIn;
