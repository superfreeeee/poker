import { atom, useAtom, useAtomValue} from 'jotai';
import { ELocalStorageKey, getItem, setItem } from '../common/localStorage';

export interface IUser {
  id: string;
  name: string;
}

const currentUserBaseAtom = atom(getItem(ELocalStorageKey.Me));
const currentUserAtom = atom(
  (get) => get(currentUserBaseAtom),
  (_, set, user?: IUser) => {
    set(currentUserBaseAtom, user);
    setItem(ELocalStorageKey.Me, user);
  },
);

export const useCurrentUser = () => useAtomValue(currentUserAtom);

export const useCurrentUserAtom = () => useAtom(currentUserAtom);
