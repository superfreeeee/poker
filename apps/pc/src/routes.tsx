import React from 'react';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import Redirect from './components/Redirect';
import { createLogger } from './common/commonLogger';

const routerLogger = createLogger('routes');

/**
 * 路由名
 */
export enum ERouteName {
  Home = 'home',
  Login = 'login',
  BuyIn = 'buyin',
  Default = 'default',
}

export enum EBuyInState {
  Init = 'initial',
  Wait = 'waiting',
  Edit = 'edit',
  End = 'end',
}

interface IRoute {
  name: ERouteName;
  path: string;
  element: JSX.Element;
  children?: IRoute[];
}

/**
 * 路由表
 */
export const routes: IRoute[] = [
  {
    name: ERouteName.Home,
    path: '/',
    element: <Home />,
  },
  {
    name: ERouteName.Login,
    path: '/login',
    element: <LogIn />,
  },
  {
    name: ERouteName.BuyIn,
    path: '/buyin',
    element: <LazyBuyIn />,
    children: [],
  },
  {
    name: ERouteName.Default,
    path: '*',
    element: <Redirect path="/" />,
  },
];

export const getPath = (name: ERouteName) => {
  const route = routes.find((route) => route.name === name);
  if (!route) {
    if (name === ERouteName.Default) {
      routerLogger.error(`missing route ${ERouteName.Default}`);
      return '/';
    }
    return getPath(ERouteName.Default);
  }

  return route.path;
};
