// Environment variables will be injected here by the build script
const AUTH0_DOMAIN = "dev-h2kl7dklje1ovh16.us.auth0.com";
const AUTH0_CLIENT_ID = "IZD9ObtBRNHd1IXlJY3avZqTkpB3Fs4r";
const AUTH0_REDIRECT_URI = "https://revuc-2025.github.io/TrafficMonitor/main.html";

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Auth0 with environment variables
    const auth0 = new Auth0Client({
        domain: AUTH0_DOMAIN,
        client_id: AUTH0_CLIENT_ID,
        redirect_uri: AUTH0_REDIRECT_URI
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