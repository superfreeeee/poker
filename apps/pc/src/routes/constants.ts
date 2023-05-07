export interface IRoute {
  name: ERouteName;
  path: string;
  element: JSX.Element;
}

/**
 * 路由名
 */
export enum ERouteName {
  Home = 'home',
  Login = 'login',
  BuyIn = 'buyin',
  Default = 'default',
}

export const routePaths = {
  [ERouteName.Home]: '/',
  [ERouteName.Login]: '/login',
  [ERouteName.BuyIn]: '/buyin',
  [ERouteName.Default]: '*',
};
