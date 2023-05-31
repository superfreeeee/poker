import { ELocalStorageKey, getItem } from './localStorage';

// is start at localhost:3000
export const IS_DEV = location.hostname.includes('localhost');

// using local back-end server
export const USING_LOCAL_SERVER = IS_DEV && (getItem(ELocalStorageKey.LocalServer) ?? false);
