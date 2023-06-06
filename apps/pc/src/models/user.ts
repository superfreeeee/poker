import { atom, useAtom, useAtomValue } from 'jotai';
import dayjs from 'dayjs';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';
import { setUid } from '../api/core';

export interface IUser {
  id: string;
  name: string;
}

export interface ILoggedUser {
  id: string;
  name: string;
  lastLoggedTime: string;
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

const loggedUserListBaseAtom = atom(getItem(ELocalStorageKey.LoggedUserList) || []);

const loggedUserListAtom = atom(
  (get) => get(loggedUserListBaseAtom),
  (_, set, userList: ILoggedUser[]) => {
    set(loggedUserListBaseAtom, userList);
    setItem(ELocalStorageKey.LoggedUserList, userList);
  },
);

export const useLoggedUserList = () => {
  const [loggedUserList, setLoggedList] = useAtom(loggedUserListAtom);

  const addCurrentUser = (targetUser: IUser) => {
    const target = loggedUserList.find((user) => user.id == targetUser.id);
    const index = loggedUserList.findIndex((user) => user.id == targetUser.id);
    if (target) {
      const originList = loggedUserList.slice();
      originList.splice(index, 1, {
        ...targetUser,
        lastLoggedTime: dayjs().format('YYYY-MM-DD HH:mm'),
      });
      setLoggedList(originList);
    } else {
      setLoggedList([
        ...loggedUserList,
        { ...targetUser, lastLoggedTime: dayjs().format('YYYY-MM-DD HH:mm') },
      ]);
    }
  };

  const removeInvalidLoggedUser = (targetId: string) => {
    setLoggedList(loggedUserList.filter((user) => user.id != targetId));
  };

  return {
    loggedUserList,
    addCurrentUser,
    removeInvalidLoggedUser,
  };
};
