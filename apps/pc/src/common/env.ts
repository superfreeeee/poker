import { ELocalStorageKey, getItem } from './localStorage';

export const IS_DEV = getItem(ELocalStorageKey.Dev) || false;
