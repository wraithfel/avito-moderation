import '@app/styles/global.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@app/root/app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
