// eslint-disable-next-line import/no-unresolved
import Typewriter from 'typewriter-effect/dist/core';
import '../../stylesheets/home.css';
import annoucementForm from './DashboardPage'

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

          <div class="link">
            <h3>Participe dès maintenant</h3>
            <a href="/vincigenius"><button class="btn btn-primary">Me Connecter</button></a>
          </div>

      </div>

  </section>

  
  </section>
      
    

  `;

  main.innerHTML = mainOk; 

  const app = document.querySelector('#presentation')
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
annoucementForm();

export default HomePage;