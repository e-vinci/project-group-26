/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

import { myMSALObj } from '../Azure/AzureConfig';
import { signOut, signIn } from '../Azure/Log';


import '../../stylesheets/navbar.css';
import Logo from '../../img/favicon-0.png';


const Navbar = () => {

  const navbarWrapper = document.querySelector('#navbarWrapper');
  navbarWrapper.innerHTML = `

  <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
  <div class="container-fluid">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>

    <!-- Logo tout à fait à gauche -->
    <a class="navbar-brand d-none d-lg-block" href="#">                                
    <img src="${Logo}" alt="...">
    </a>

    <!-- Liens de navigation -->
    <div class="collapse navbar-collapse flex-column flex-sm-row" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-uri="/vincigenius"><i class="bi bi-house"></i>Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-uri="/upload"><i class="bi bi-upload"></i>Upload</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-uri="/dashboard"><i class="bi bi-bookmark"></i>Dashboard</a>
        </li>

        <!-- Ajout d'une nouvelle nav-item "Mon Profil" visible sur des écrans de taille inférieure à 1000px -->
        <li class="nav-item d-lg-none">
          <a class="nav-link" data-uri="/profil"><i class="bi bi-person"></i>Mon Profil</a>
        </li>
        <li class="nav-item d-lg-none">
          <a><i class="bi bi-box-arrow-right"></i><button class="btn btn-primary"></button></a>
        </li>

      </ul>

      <!-- Ajout d'une nouvelle div pour afficher "Mon Profil" sur des écrans de taille supérieure à 1000px -->
      <div class="d-none d-lg-block ms-auto">
        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item">
          <a class="nav-link" data-uri="/profil"><i class="bi bi-person"></i>Mon Profil</a>
          </li>
          <li class="nav-item-log">
          <button class="btn btn-primary" id="SignIn"></button>
          </li>
        </ul>
      </div>

    </div>

  </div>
</nav> 
` 
;

  const signInButton = document.querySelector('#SignIn');
  const userAccounts = myMSALObj.getAllAccounts();

  if (userAccounts.length <= 0) {
    signInButton.innerHTML='Me Connecter';
      signInButton.addEventListener('click', () => {
      signIn();
    }) 
  } else {
    signInButton.innerHTML='Me Deconnecter';
      signInButton.addEventListener('click', () => {
      signOut();
    }) 
  }

  // CHANGE L'ICON HAMBURGER
  const initializeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarIcon = document.querySelector('.navbar-toggler i');

    if (navbarToggler && navbarIcon) {
      navbarToggler.addEventListener('click', () => {
        // Toggle entre les classes d'icône Bootstrap
        navbarIcon.classList.toggle('bi-list');
        navbarIcon.classList.toggle('bi-x');
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
  });

};




export default Navbar;