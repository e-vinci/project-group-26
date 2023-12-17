import { addUser, getStudentAccessInfo }  from '../../models/users'

import { msalConfig, loginRequest, myMSALObj } from './AzureConfig';
import Navigate from '../Router/Navigate';

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



  async function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        const canAccessSite = await getStudentAccessInfo(username);
        console.log(canAccessSite)        
        addUser(response.account);

        if (canAccessSite === true) {
            console.log('L\'étudiant a accès au site.');
            showWelcomeMessage(username);
        } else {
            console.log('L\'étudiant n\'a pas accès au site.');
            Navigate('/notallowed');
            console.log('L\'étudiant n\'a pas accès au site.');
        }
    } else {
        selectAccount();
    }
}

function getTokenRedirect(request) {

    request.account = myMSALObj.getAccountByUsername(username);

    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using redirect");
            if (error instanceof myMSALObj.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenRedirect(request);
            }
            return undefined
        });
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
async function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    await myMSALObj.loginRedirect(loginRequest);
    Navigate('/vincigenius')
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

// La fonction showWelcomeMessage doit être définie avant d'être utilisée
function showWelcomeMessage(userName) {
  const app = document.querySelector('#presentation');
  const signInButton = document.querySelector('#SignIn');

  // Reconfigurez les éléments du DOM
  app.innerHTML = `Bienvenue ${userName}`;
  signInButton.setAttribute("click", signOut);
      signInButton.innerHTML = "Me Deconnecter";
}


export { signIn, signOut,getTokenRedirect }

