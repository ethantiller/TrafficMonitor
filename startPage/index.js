 import { createAuth0Client } from '@auth0/auth0-spa-js';
//import { createAuth0Client } from './node_modules/@auth0/auth0-spa-js/dist/auth0-spa-js.production.js';

// const test = document.getElementById("test");
// test.addEventListener("click", () => {
//   alert("hi")
// });







const auth0Client = await createAuth0Client({
  domain: "dev-conofbnv2yt8x5si.us.auth0.com",
  clientId: "Jo9UAn6KnrmD5w6WoLsOuksoFznJ0wgT",  // From 0auth?
  authorizationParams: {
    redirect_uri: "http://127.0.0.1:5500/startPage/main.html"
  }
});


// async function loginButton(){

//   await auth0Client.loginWithRedirect();
// };

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", async () => {
  alert("hi");
  await auth0Client.loginWithRedirect();
});


if (window.location.search.includes("code=") || window.location.search.includes("error=")) {
  await auth0Client.handleRedirectCallback();
  window.history.replaceState({}, document.title, "/");
}


const isAuthenticated = await auth0Client.isAuthenticated();
if (isAuthenticated) {
  const user = await auth0Client.getUser();
  console.log(user);
}


const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  auth0Client.logout({ returnTo: "http://127.0.0.1:5500/startPage/index.html" });
});





///ETHAN"S CODE BELOW




// auth0.createAuth0Client({
//   domain: "dev-6af1rhk16075mjiz.us.auth0.com",
//   clientId: "ETEkszSpLvx32uEbCXy6ENPev09ekB3z",
//   authorizationParams: {
//     redirect_uri: "https://ethantiller.github.io/Stock-O-Clock/mainpage.html"
//   }
// }).then(async (auth0Client) => {
//   // Assumes a button with id "getstartedBtn" in the DOM
//   const loginButton = document.getElementById("getstartedBtn");

//   loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     auth0Client.loginWithRedirect();
//   });

//   if (location.search.includes("state=") && 
//       (location.search.includes("code=") || 
//       location.search.includes("error="))) {
//     await auth0Client.handleRedirectCallback();
//     window.history.replaceState({}, document.title, "/");
//   }

//   // Assumes a button with id "logout" in the DOM
//   const logoutButton = document.getElementById("logout");

//   logoutButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     auth0Client.logout();
//   });

// console.log("Right here")
//   const isAuthenticated = await auth0Client.isAuthenticated();
//   const userProfile = await auth0Client.getUser();

//   // Assumes an element with id "profile" in the DOM
 

// });