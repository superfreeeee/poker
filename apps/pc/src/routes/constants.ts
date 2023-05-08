export interface IRoute {
  name: ERouteName;
  path: string;
  element: JSX.Element;
  children?: IRoute[];
}

/**
 * 路由名
 */
export enum ERouteName {
  Home = 'home',
  Login = 'login',
  BuyIn = 'buyin',
  Default = 'default',
  BuyInInit = 'init',
  BuyInWait = 'wait',
  BuyInEdit = 'eidt',
  BuyInEnd = 'end',
}

export const routePaths = {
  [ERouteName.Home]: '/',
  [ERouteName.Login]: '/login',
  [ERouteName.BuyIn]: '/buyin',
  [ERouteName.Default]: '*',
  [ERouteName.BuyInInit]: '/init',
  [ERouteName.BuyInWait]: '/buyin/wait',
  [ERouteName.BuyInEdit]: '/edit',
  [ERouteName.BuyInEnd]: '/end',
};
