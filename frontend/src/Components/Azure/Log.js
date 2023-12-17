import { msalConfig, loginRequest, myMSALObj } from './AzureConfig';
import Navigate from '../Router/Navigate';

let username = "";
/* Link:https://github.com/Azure-Samples/ms-identity-javascript-v2
 */

function selectAccount () {

   

    const currentAccounts = myMSALObj.getAllAccounts();
      if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
  }

/* Link:https://github.com/Azure-Samples/ms-identity-javascript-v2
*
*/

function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}
/* Link:https://github.com/Azure-Samples/ms-identity-javascript-v2
 */

myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });
async function signIn() {


    await myMSALObj.loginRedirect(loginRequest);
    Navigate('/vincigenius')
}

function signOut() {


    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
}

function getTokenRedirect(request) {

    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            if (error instanceof myMSALObj.InteractionRequiredAuthError) {
                return myMSALObj.acquireTokenRedirect(request);
            }
            return undefined
        });
}

// La fonction showWelcomeMessage doit être définie avant d'être utilisée
function showWelcomeMessage(userName) {
  const app = document.querySelector('#presentation');
  const signInButton = document.querySelector('#SignIn');

  // Reconfigurez les éléments du DOM
  app.innerHTML = `Bienvenue ${userName}`;
  signInButton.setAttribute("click", signOut);
      signInButton.innerHTML = "Me Deconnecter";
}


export { signIn, signOut,getTokenRedirect}


