import type { IUser } from '../models/user';
import { createLogger } from './commonLogger';

const logger = createLogger('common/localStorage');

export enum ELocalStorageKey {
  Me = 'current_user',
  UserList = 'user_list',
  HandRecordList = 'hand_record_list',
}

type ILocalStorage = {
  [ELocalStorageKey.Me]: IUser;
  [ELocalStorageKey.UserList]: IUser[];
  [ELocalStorageKey.HandRecordList]: string[];
};

/**
 * localStorage.getItem wrapper
 * @param key
 * @returns
 */
export const getItem = <K extends ELocalStorageKey>(key: K): ILocalStorage[K] | undefined => {
  try {
    const content = localStorage.getItem(key);
    if (!content) {
      return undefined;
    }
    return JSON.parse(content) as ILocalStorage[K];
  } catch {
    logger.error('getItem failed', { key });
    return undefined;
  }
};

/**
 * localStorage.setItem wrapper
 * @param key
 * @param data
 */
export const setItem = <K extends ELocalStorageKey>(key: K, data?: ILocalStorage[K]): void => {
  try {
    if (data === undefined) {
      localStorage.removeItem(key);
    } else {
      const content = JSON.stringify(data);
      localStorage.setItem(key, content);
    }
  } catch {
    logger.error('setItem failed', { key, data });
  }
};
