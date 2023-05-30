import { ELocalStorageKey, getItem } from './localStorage';

export const IS_DEV = location.hostname.includes('localhost') && getItem(ELocalStorageKey.Dev);
