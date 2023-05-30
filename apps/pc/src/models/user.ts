import { atom, useAtom, useAtomValue } from 'jotai';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';
import { setUid } from '../api/core';

export interface IUser {
  id: string;
  name: string;
}

const currentUserBaseAtom = atom(
  (function () {
    const initUser = getItem(ELocalStorageKey.Me);
    setUid(initUser?.id ?? null);
    return initUser;
  })(),
);
const currentUserAtom = atom(
  (get) => get(currentUserBaseAtom),
  (_, set, user?: IUser) => {
    set(currentUserBaseAtom, user);
    setItem(ELocalStorageKey.Me, user);
    setUid(user?.id ?? null);
  },
);

export const useCurrentUser = () => useAtomValue(currentUserAtom);

export const useCurrentUserAtom = () => useAtom(currentUserAtom);
