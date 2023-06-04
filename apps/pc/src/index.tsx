import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initClientId } from './common/env';
import { logger } from './common/commonLogger';
import App from './App';
import './index.module.scss';

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
