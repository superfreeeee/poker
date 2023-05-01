import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.module.scss';

const root = createRoot(document.querySelector('#app') as HTMLDivElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
