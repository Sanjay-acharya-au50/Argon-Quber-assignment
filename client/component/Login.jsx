// GoogleLoginButton.js

import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = 'http://localhost:5000/auth/linkedin';
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Linkedin</button>
  );
};

export default GoogleLoginButton;
