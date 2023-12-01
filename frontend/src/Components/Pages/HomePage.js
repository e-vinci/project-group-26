// eslint-disable-next-line import/no-extraneous-dependencies

import {msalConfig,loginRequest,myMSALObj} from '../Game/AzureConfig';




const HomePage = () => {
  const main = document.querySelector('main');
  let btn=`<button type="button" id="SignIn" class="btn btn-secondary">
    </button>` 
   btn += `
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
  main.innerHTML = btn;

  const signInButton = document.getElementById("SignIn"); 
   const currentAccounts = myMSALObj.getAllAccounts();
if(currentAccounts.length===0){
  signInButton.innerHTML='Sign In'
}
else{
  signInButton.innerHTML='Sign out'
}


  console.log(currentAccounts);
 
  signInButton.addEventListener('click', () => {
      if (currentAccounts.length === 0)  {
console.log('before sign');
      signIn();
      console.log('after sign')
    } else {
      console.log('out')
      signOut();
      signInButton.innerHTML = "Sign In"; // Ajout de cette ligne pour rétablir le texte du bouton après la déconnexion
    }
  });
  
};
let username = "";




function selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
      if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
  }

function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}
/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });
function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(loginRequest);
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}
function showWelcomeMessage(userName) {
  const welcomeDiv = document.getElementById("WelcomeMessage");
  const cardDiv = document.getElementById("card-div");
  const signInButton = document.getElementById("SignIn");


  // Reconfigurez les éléments du DOM
  cardDiv.style.display = 'initial';
  welcomeDiv.innerHTML = `Bienvenue ${userName}`;
  signInButton.setAttribute("click", signOut);
      signInButton.innerHTML = "Sign Out";
}





export default HomePage;
