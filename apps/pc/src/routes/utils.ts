import { createLogger } from '../common/commonLogger';
import { ERouteName, routePaths } from './constants';

export const routerLogger = createLogger('routes');

export const getPath = (name: ERouteName) => {
  const path = routePaths[name];
  if (!path) {
    if (name === ERouteName.Default) {
      routerLogger.error(`missing route ${ERouteName.Default}`);
      return '/';
    }
    const path = getPath(ERouteName.Default);
    routerLogger.warn(`unknown route ${name}, redirect to ${path}`);
    return path;
  }

  return path;
};
