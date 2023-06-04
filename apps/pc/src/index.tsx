import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { nanoid } from 'nanoid';
import { ELocalStorageKey, getItem, setItem } from './common/localStorage';
import { logger } from './common/commonLogger';
import App from './App';
import './index.module.scss';

/**
 * 初始化设备唯一标识
 * @returns
 */
function initClientId(): string {
  let clientId = getItem(ELocalStorageKey.Uuid);
  if (clientId) {
    return clientId;
  }

  clientId = nanoid();
  setItem(ELocalStorageKey.Uuid, clientId);
  return clientId;
}

function createApp() {
  // initial
  const clientId = initClientId();
  logger.log(`uuid: ${clientId}`);

  // render main content
  const root = createRoot(document.querySelector('#app') as HTMLDivElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

createApp();
