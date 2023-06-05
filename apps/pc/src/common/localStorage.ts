import { useCallback, useEffect, useState } from 'react';
import type { IUser } from '../models/user';
import type { ILoggedUser } from '../models/loggedUser';
import { createLogger } from './commonLogger';

const logger = createLogger('common/localStorage');

export enum ELocalStorageKey {
  LocalServer = 'using_local_server',
  Me = 'current_user',
  UserList = 'user_list',
  HandRecordList = 'hand_record_list',
  LoggedUserList = 'logged_user_list',
}

type ILocalStorage = {
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
export const getItem = <K extends ELocalStorageKey>(key: K): ILocalStorage[K] | undefined => {
  try {
    const content = localStorage.getItem(key);
    if (!content) {
      return undefined;
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

export const removeItem = <K extends ELocalStorageKey>(key: K): void => {
  try {
    const content = localStorage.getItem(key);
    if (content == null) {
      throw `Key does not exist!`;
    } else {
      localStorage.removeItem(key);
    }
  } catch (e) {
    logger.error(e, { key });
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
