import React from 'react';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import { LazyBuyIn } from '../pages/BuyIn/lazy';
import Redirect from '../components/Redirect';

import { ERouteName, IRoute } from './constants';
import { getPath } from './utils';

/**
 * 路由表
 */
export const routes: IRoute[] = [
  {
    name: ERouteName.Home,
    path: getPath(ERouteName.Home),
    element: <Home />,
  },
  {
    name: ERouteName.Login,
    path: getPath(ERouteName.Login),
    element: <LogIn />,
  },
  {
    name: ERouteName.BuyIn,
    path: getPath(ERouteName.BuyIn),
    element: <LazyBuyIn />,
  },
  {
    name: ERouteName.Default,
    path: getPath(ERouteName.Default),
    element: <Redirect path={getPath(ERouteName.Home)} />,
  },
];
