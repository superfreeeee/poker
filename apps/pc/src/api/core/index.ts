import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
import { createLogger } from '../../common/commonLogger';
import { IS_DEV } from '../../common/env';

const BASE_URL = IS_DEV ? 'http://localhost:8080' : 'http://124.221.113.80:8080';

const apiLogger = createLogger('api/alova');

let _uid: string | null = null;

export const setUid = (uid: string | null) => {
  _uid = uid;
};

export const alovaInstance = createAlova({
  baseURL: BASE_URL,
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: (options) => {
    options.config.credentials = 'include';
    options.config.headers['Content-Type'] = 'application/json';
    _uid && (options.config.headers['token'] = _uid);

    apiLogger.log('request', options);
  },
  responded: async (response) => {
    // fetch response => json
    const data = await response.json();

    apiLogger.log('response', data);

    return data;
  },
});
