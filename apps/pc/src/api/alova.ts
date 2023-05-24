import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
import { createLogger } from '../common/commonLogger';

const PROD_READY = true;

const PROD_HOST = 'http://124.221.113.80:8080';
const DEV_HOST = 'http://localhost:8080';

const apiLogger = createLogger('api/alova');

export const alovaInstance = createAlova({
  baseURL: PROD_READY ? PROD_HOST : DEV_HOST,
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: (options) => {
    apiLogger.log('request', options);
  },
  responded: async (response) => {
    // fetch response => json
    const data = await response.json();

    apiLogger.log('request', data);

    return data;
  },
});
