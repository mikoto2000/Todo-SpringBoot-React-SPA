import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';

const oidcConfig = {
  authority: 'http://keycloak:8080/realms/myrealm',
  client_id: 'client-id',
  client_secret: 'client-secret',
  redirect_uri: 'http://localhost:5173/',
  post_logout_redirect_uri: 'http://localhost:5173/',
  scope: 'openid profile',
  response_type: 'code',
  onSigninCallback: () => {
    // クエリパラメータに色々な情報が載っているので、それを削除する
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

