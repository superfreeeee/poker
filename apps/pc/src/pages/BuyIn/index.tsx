import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BuyInData } from '../../models/buyIn';

interface IBuyInProps {
  data?: BuyInData;
}

const BuyIn: FC<IBuyInProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BuyIn;
