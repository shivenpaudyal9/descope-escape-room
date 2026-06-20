import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from '@descope/react-sdk';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider projectId="P3FNa8U3DItx9ctPypnKvKFweBcf">
      <App />
    </AuthProvider>
  </React.StrictMode>
);