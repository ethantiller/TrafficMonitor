// index.js

document.addEventListener('DOMContentLoaded', (event) => {
  const auth0 = new Auth0Client({
      domain:  'dev-conofbnv2yt8x5si.us.auth0.com', // e.g., 'your-tenant.auth0.com'
      client_id: 'Jo9UAn6KnrmD5w6WoLsOuksoFznJ0wgT',
      redirect_uri: 'http://127.0.0.1:5500/main.html'
  });

  const loginButton = document.getElementById('loginButton');
  

  loginButton.addEventListener('click', async () => {
      try {
          await auth0.loginWithRedirect();
      } catch (error) {
          console.error('Error logging in:', error);
      }
  });

  const signinButton = document.getElementById('signinButton');
  

  signinButton.addEventListener('click', async () => {
      try {
          await auth0.loginWithRedirect();
      } catch (error) {
          console.error('Error logging in:', error);
      }
  });

  // Handle the redirect after login
  const handleRedirectCallback = async () => {
      try {
          await auth0.handleRedirectCallback();
          window.location.href = '/main.html';
      } catch (error) {
          console.error('Error handling redirect callback:', error);
      }
  };

  // Check if we are returning from Auth0 redirect
  if (window.location.search.includes('code=')) {
      handleRedirectCallback();
  }
});