import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const navigate = useNavigate();

  return (
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin + window.location.pathname}
      >
        {children}
      </Auth0Provider>
  );
};

export default Auth;