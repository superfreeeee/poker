import { atom, useAtom } from 'jotai';
import dayjs from 'dayjs';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';
import type { IUser } from './user';

export interface ILoggedUser {
  id: string;
  name: string;
  lastLoggedTime: string;
}

const initValue = getItem(ELocalStorageKey.LoggedUserList) || [];
const loggedUserListBaseAtom = atom(initValue);
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

  const removeIncalidLoggedUser = (targetId: string) => {
    const arr = loggedUserList.slice();
    setLoggedList(arr.filter((user) => user.id != targetId));
  };

  return {
    loggedUserList,
    addCurrentUser,
    removeIncalidLoggedUser,
  };
};
