import { nanoid } from 'nanoid';
import { ELocalStorageKey, getItem, setItem } from './localStorage';

// is start at localhost:3000
export const IS_DEV = location.hostname.includes('localhost');

// using local back-end server
export const USING_LOCAL_SERVER = IS_DEV && (getItem(ELocalStorageKey.LocalServer) ?? false);

let clientId = getItem(ELocalStorageKey.Uuid);

/**
 * 初始化设备唯一标识
 * @returns
 */
export const initClientId = (): string => {
  if (clientId) {
    return clientId;
  }

  clientId = nanoid();
  setItem(ELocalStorageKey.Uuid, clientId);
  return clientId;
};

export const getClientId = () => clientId;
