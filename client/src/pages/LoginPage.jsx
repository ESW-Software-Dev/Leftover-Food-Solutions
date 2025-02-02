import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div
      className="login-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f9bcbc, #f77f7f)',
        color: 'white',
        textAlign: 'center',
        margin: '0',
        position: 'absolute',
        top: '0',
        left: '0',
      }}
    >
      { }
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          padding: '40px 60px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', fontWeight: '700', color: '#541f1f' }}>
          Welcome to Leftover Food Solutions!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '25px', opacity: '0.9', color: '#541f1f' }}>
          Discover and share leftover food across campus! <br /> Log in with your Cornell email to get started.
        </p>

        <div style={{ width: '300px', margin: '0 auto' }}>
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={() => console.log('Login Failed')}
            style={{
              display: 'block',
              width: '100%',
              height: '45px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;