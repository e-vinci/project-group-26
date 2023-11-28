// eslint-disable-next-line import/no-extraneous-dependencies

import {msalConfig,loginRequest,myMSALObj} from '../Game/AzureConfig';




const HomePage = () => {
  const main = document.querySelector('main');
  
  const azure = `
    <button type="button" id="SignIn" class="btn btn-secondary">
      Sign In
    </button>
  </div>
  <br>
  <h2 class="card-header text-center">Vinci Genius </h2>
  <br>
  <div class="row" style="margin:auto">
    <div id="card-div" class="col-md-3" style="display:none">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title" id="WelcomeMessage">Please sign-in to see your profile and read your mails</h5>
        </div>
      </div>
    </div>
  </div>`;

  main.innerHTML = azure;

  const signInButton = document.getElementById("SignIn");
  const currentAccounts = myMSALObj.getAllAccounts();
  console.log(currentAccounts);
 
  signInButton.addEventListener('click', () => {
      if (currentAccounts.length === 0)  {
        console.log(currentAccounts);
      signIn();
      signInButton.innerHTML = "Sign Out";
      currentAccounts.length += 1;
    } else {
      console.log(currentAccounts);
      signOut();
      signInButton.innerHTML = "Sign In"; // Ajout de cette ligne pour rétablir le texte du bouton après la déconnexion
    }
  });
  
};
let username = "";

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

function selectAccount() {

  /**
   * See here for more info on account retrieval: 
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */

  const currentAccounts = myMSALObj.getAllAccounts();
  if (currentAccounts.length === 0) {
      return;
  } if (currentAccounts.length > 1) {
      // Add choose account code here
      console.warn("Multiple accounts detected.");
  } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].username;
  }
}

function handleResponse(response) {

  /**
   * To see the full list of response object properties, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
   */

  if (response !== null) {
      username = response.account.username;
      showWelcomeMessage(username);
      
  } else {
      selectAccount();
  }
}
let isInteractionInProgress = false;

function signIn() {
  // Vérifiez si une interaction d'authentification est en cours
  if (isInteractionInProgress) {
    console.warn("Une interaction d'authentification est en cours. Attendez la fin avant de vous déconnecter.");
    return;
  }

  isInteractionInProgress = true;

  myMSALObj.loginPopup(loginRequest)
    .then((authResponse) => {
      handleResponse(authResponse);
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion :", error);
    })
    .finally(() => {
      isInteractionInProgress = false;
    });
}



// La fonction showWelcomeMessage doit être définie avant d'être utilisée
function showWelcomeMessage(userName) {
  const welcomeDiv = document.getElementById("WelcomeMessage");
  const cardDiv = document.getElementById("card-div");

  // Reconfigurez les éléments du DOM
  cardDiv.style.display = 'initial';
  welcomeDiv.innerHTML = `Bienvenue ${userName}`;
}
function signOut() {
  // Vérifiez si une interaction d'authentification est en cours
  if (isInteractionInProgress) {
    console.warn("Une interaction d'authentification est en cours. Attendez la fin avant de vous déconnecter.");
    return;
  }

  const accounts = myMSALObj.getAllAccounts();

  if (accounts.length === 0) {
    console.warn("Aucun compte connecté.");
    return;
  }

  const logoutRequest = {
    account: accounts[0],
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri
  };

  // Définissez l'interaction en cours avant de commencer le processus de déconnexion
  isInteractionInProgress = true;

  myMSALObj.logoutPopup(logoutRequest)
    .then(() => {
      console.log("Utilisateur déconnecté avec succès !");
    })
    .finally(() => {
      // Réinitialisez le drapeau d'interaction après la déconnexion
      isInteractionInProgress = false;
    });
}




export default HomePage;
