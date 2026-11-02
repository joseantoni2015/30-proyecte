import React from 'react';
import { createRoot } from 'react-dom/client';
import { Platform } from 'react-native';
import App from './App';

Platform.OS = 'web';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
