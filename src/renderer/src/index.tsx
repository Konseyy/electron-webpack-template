import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElem = document.getElementById('app') as HTMLElement;
const root = createRoot(rootElem);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
