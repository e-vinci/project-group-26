// eslint-disable-next-line import/no-extraneous-dependencies
import Typewriter from 'typewriter-effect/dist/core';
import { myMSALObj } from '../Azure/AzureConfig';
import { signIn, signOut } from '../Azure/Log';
// import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import '../../stylesheets/home.css';


const HomePage = () => {
  const main = document.querySelector('main');
  const mainOk = `

  <section class="home">
  
  <section class="main-container-home">

      <div class="home-data">

          <div class="bulle-info">
            <h5>Documents</h5>
            <h3><span style="color: #fbc72c;" >14 250</span></h3>
          </div>

          <div class="bulle-info">
            <h5>Etudiants</h5>
            <h3><span style="color: #fbc72c;" >5 418 </span></h3>
          </div>

          <div class="bulle-info">
            <h5>Documents</h5>
            <h3><span style="color: #fbc72c;" >5 418 </span></h3>
          </div>
    
      </div>

  </section>

  <section class="home-container">

      <div class="home-txt">

          <div class="introTxt">
            <h1 id="title"> <span style="color: #fbc72c;" >Vinci Genius</span> aux services des étudiants. </h1>
            <div class="bulle-info">
              <p id="presentation"></p>
            </div>
          </div>

      </div>

  </section>

  
  </section>
      
    

  `;

  main.innerHTML = mainOk; 




const signInButton = document.querySelector('#presentation');
  const currentAccounts = myMSALObj.getAllAccounts();
  
  if(currentAccounts.length===0){
    signInButton.innerHTML='Me Connecter'
  }
  else{
    signInButton.innerHTML='Me Deconnecter'
  } 
  // Ajoutez une variable pour représenter l'état de la connexion
  let isLoggedIn = currentAccounts.length > 0;

  // Mettez à jour l'état de la connexion en fonction de la longueur de currentAccounts
  const updateLoginStatus = () => {
    isLoggedIn = currentAccounts.length > 0;
  };

  signInButton.addEventListener('click', async () => {
    try {
      if (!isLoggedIn) {
        await signIn();
        currentAccounts.length = 1;
        updateLoginStatus(); // Mettez à jour l'état de la connexion
        Navbar();
      } else {
        await signOut();
        currentAccounts.length = 0;
        updateLoginStatus(); // Mettez à jour l'état de la connexion
      }
    } catch (error) {
      console.error("Error during sign-in/sign-out:", error);
    }
  }); 

  const app = document.querySelector('#presentation');
  const typewriter = new Typewriter(app, {
    loop: false,
    delay: 75,
  });
  
  typewriter
    .typeString('Salut Toi !')
    .pauseFor(300)
    .deleteAll()
    .typeString('Bienvenu sur <span style="color:#fbc72c;"> Vinci Genius</span>')
    .pauseFor(300)
    .deleteAll()
    .typeString('Connecte toi au plus vite pour profiter des synthèses d\'autre étudiants')
    .start();
};


export default HomePage;
