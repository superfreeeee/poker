import { useCallback, useEffect, useState } from 'react';
import type { IUser, ILoggedUser } from '../models/user';
import { createLogger } from './commonLogger';

const logger = createLogger('common/localStorage');

export enum ELocalStorageKey {
  Debug = 'debug',
  Uuid = 'uuid',
  LocalServer = 'using_local_server',
  Me = 'current_user',
  UserList = 'user_list',
  HandRecordList = 'hand_record_list',
  LoggedUserList = 'logged_user_list',
}

export type ILocalStorage = {
  [ELocalStorageKey.Debug]: string;
  [ELocalStorageKey.Uuid]: string;
  [ELocalStorageKey.LocalServer]: boolean;
  [ELocalStorageKey.Me]: IUser;
  [ELocalStorageKey.UserList]: IUser[];
  [ELocalStorageKey.HandRecordList]: string[];
  [ELocalStorageKey.LoggedUserList]: ILoggedUser[];
};

/**
 * localStorage.getItem wrapper
 * @param key
 * @returns
 */
export const getItem = <K extends ELocalStorageKey>(
  key: K,
  plain = false,
): ILocalStorage[K] | undefined => {
  try {
    const content = localStorage.getItem(key);
    if (!content) {
      return undefined;
    }
    if (plain) {
      return content as ILocalStorage[K];
    }
    return JSON.parse(content) as ILocalStorage[K];
  } catch {
    return undefined;
  }
};

/**
 * localStorage.setItem wrapper
 * @param key
 * @param data
 */
export const setItem = <K extends ELocalStorageKey>(
  key: K,
  data?: ILocalStorage[K],
  plain = false,
): void => {
  try {
    const content = (plain ? data : JSON.stringify(data)) as string;
    localStorage.setItem(key, content);
  } catch {
    logger.error('setItem failed', { key, data });
  }
};

export const removeItem = <K extends ELocalStorageKey>(key: K): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    logger.error('removeItem failed', { key });
  }
};

export function useStorageState<K extends ELocalStorageKey>(
  key: K,
): [ILocalStorage[K] | undefined, (nextValue: ILocalStorage[K]) => void];
export function useStorageState<K extends ELocalStorageKey>(
  key: K,
  initValue: ILocalStorage[K],
): [ILocalStorage[K], (nextValue: ILocalStorage[K]) => void];
export function useStorageState<K extends ELocalStorageKey>(key: K, initValue?: ILocalStorage[K]) {
  const [state, setState] = useState(initValue);

  const wrapSetState = useCallback(
    (nextValue: ILocalStorage[K]) => {
      setItem(key, nextValue);
      setState(nextValue);
    },
    [key],
  );

  useEffect(() => {
    const currentState = getItem(key);
    setState(currentState);
  }, [key]);

  return [state, wrapSetState];
}
