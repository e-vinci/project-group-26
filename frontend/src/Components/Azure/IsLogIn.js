import Navigate from '../Router/Navigate';
import { myMSALObj } from './AzureConfig';

function isLogIn() {
    const userAccounts = myMSALObj.getAllAccounts();

    if (userAccounts.length <= 0) {
        Navigate('/');
    }
}

export default isLogIn;
