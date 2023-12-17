import { clearPage } from '../../utils/render';
import image from '../../img/4882404-removebg-preview.png'
import '../../stylesheets/card.css';
import '../../stylesheets/profil.css';
import { myMSALObj } from '../Azure/AzureConfig';
import Navigate from '../Router/Navigate';


const ProfilPage = async () => {
    clearPage();

    const currentAccounts = myMSALObj.getAllAccounts();
    if(currentAccounts.length===0){
      Navigate('/');
      return;
    }

    const profilPage = document.querySelector('main');
    profilPage.innerHTML = `

    
    <section class="profil-container">

      <section class="profil">
        <div class="profil-top">

            <div class="pdp">
              <img src="${image}" alt="PhotoDeProfil">
            </div>

            <div class="username d-flex justify-content-center align-items-center flex-column">
              <h3 id="name"></h3>
              <h6 id="username"></h6>
            </div>

        </div>
      </section>

      <hr class="w-75 mx-auto">

    </section>
    
    `;

    // Mettez à jour le contenu de l'élément #name en fonction des informations de connexion
    const userAccounts = myMSALObj.getAllAccounts();

  if (userAccounts.length > 0) {
    const user = userAccounts[0];
    const usernamenameElement = document.querySelector('#username');
    const nameElement = document.querySelector('#name');

    // Assurez-vous que l'élément #name existe avant de mettre à jour son contenu
    if (nameElement) {
      nameElement.innerHTML = user.name;
    }
    if (usernamenameElement) {
      usernamenameElement.innerHTML = user.username;
    }
  }
}


export default ProfilPage;