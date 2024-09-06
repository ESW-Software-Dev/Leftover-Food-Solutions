import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PageRouter from './PageRouter';
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='614765787838-9i69u469as2f91vlos97fh74mj167pf6.apps.googleusercontent.com'>
    <React.StrictMode>
      <PageRouter />
    </React.StrictMode>,
  </GoogleOAuthProvider>
);
