// index.js

document.addEventListener('DOMContentLoaded', (event) => {
  const auth0 = new Auth0Client({
      domain:  'dev-h2kl7dklje1ovh16.us.auth0.com', // e.g., 'your-tenant.auth0.com'
      client_id: 'IZD9ObtBRNHd1IXlJY3avZqTkpB3Fs4r',
      redirect_uri: 'https://revuc-2025.github.io/TrafficMonitor/main.html'
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