import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
import { createLogger } from '../../common/commonLogger';
import { USING_LOCAL_SERVER, getClientId } from '../../common/env';

export const BASE_URL = USING_LOCAL_SERVER ? 'http://localhost:8080' : 'http://124.221.113.80:8080';

const apiLogger = createLogger('api/alova');

// uid
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
    _uid && (options.config.headers.token = _uid);
    options.config.headers.uuid = getClientId();

    apiLogger.log('request', options);
  },
  responded: async (response) => {
    // fetch response => json
    const data = await response.json();

    apiLogger.log('response', data);

    return data;
  },
});
