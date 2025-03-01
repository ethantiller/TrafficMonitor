auth0.createAuth0Client({




    
    domain: "dev-6af1rhk16075mjiz.us.auth0.com",
    clientId: "ETEkszSpLvx32uEbCXy6ENPev09ekB3z",
    authorizationParams: {
      redirect_uri: "https://ethantiller.github.io/Stock-O-Clock/mainpage.html"
    }
  }).then(async (auth0Client) => {
    // Assumes a button with id "getstartedBtn" in the DOM
    const loginButton = document.getElementById("getstartedBtn");
  
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.loginWithRedirect();
    });
  
    if (location.search.includes("state=") && 
        (location.search.includes("code=") || 
        location.search.includes("error="))) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }
  
    // Assumes a button with id "logout" in the DOM
    const logoutButton = document.getElementById("logout");
  
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      auth0Client.logout();
    });
  
  console.log("Right here")
    const isAuthenticated = await auth0Client.isAuthenticated();
    const userProfile = await auth0Client.getUser();
  
    // Assumes an element with id "profile" in the DOM
   
  
  });