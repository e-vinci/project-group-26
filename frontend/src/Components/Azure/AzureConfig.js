// eslint-disable-next-line import/no-extraneous-dependencies
import { PublicClientApplication } from "@azure/msal-browser";





/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
const msalConfig = { 
    
    auth: {
        // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        clientId: "7ac8894d-877e-42d0-a46c-eac55b35fb5d",
        // Full directory URL, in the form of 
        authority: "https://login.microsoftonline.com/f7a15417-57cb-4855-8d36-064f95aada17",
        // Full redirect URL, in form of 
        redirectUri: "http://localhost:8080",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },

};
const myMSALObj = new PublicClientApplication(msalConfig);
await myMSALObj.initialize();
/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
    scopes: ["User.Read"]
  };
  
  /**
  * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
  * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
  */
  const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
  };

  export { msalConfig, loginRequest, tokenRequest, myMSALObj };