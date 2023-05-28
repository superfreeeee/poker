import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
import { createLogger } from '../common/commonLogger';
import { IS_DEV } from '../common/env';

const PROD_HOST = 'http://124.221.113.80:8080';
const DEV_HOST = 'http://localhost:8080';

const apiLogger = createLogger('api/alova');

export const alovaInstance = createAlova({
  baseURL: IS_DEV ? DEV_HOST : PROD_HOST,
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: (options) => {
    options.config.credentials = 'include';
    options.config.headers['Content-Type'] = 'application/json';

    apiLogger.log('request', options);
  },
  responded: async (response) => {
    // fetch response => json
    const data = await response.json();

    apiLogger.log('response', data);

    return data;
  },
});
