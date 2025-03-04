document.addEventListener('DOMContentLoaded', (event) => {
    const auth0 = new Auth0Client({
        domain: 'dev-conofbnv2yt8x5si.us.auth0.com',
        client_id: 'Jo9UAn6KnrmD5w6WoLsOuksoFznJ0wgT',
        redirect_uri: 'https://github.com/RevUC-2025/TrafficMonitor/main.html'
    });
  
    const loginButton = document.getElementById('loginButton');
    const signinButton = document.getElementById('signinButton');
  
    loginButton.addEventListener('click', async () => {
        try {
            await auth0.loginWithRedirect();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });
  
    signinButton.addEventListener('click', async () => {
        try {
            await auth0.loginWithRedirect();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });
  
    const handleRedirectCallback = async () => {
        try {
            await auth0.handleRedirectCallback();
            window.location.href = '/main.html';
        } catch (error) {
            console.error('Error handling redirect callback:', error);
        }
    };
  
    if (window.location.search.includes('code=')) {
        handleRedirectCallback();
    }
  });