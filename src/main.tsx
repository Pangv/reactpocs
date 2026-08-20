import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppThemeProvider } from '@/theme/ThemeProvider';
import { router } from './router';
// import 'index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </React.StrictMode>,
);
