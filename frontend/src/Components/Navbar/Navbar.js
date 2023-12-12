import '../../stylesheets/navbar.css';
import Logo from '../../img/favicon-0.png';

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `

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
          <a class="nav-link" data-uri="/"><i class="bi bi-house"></i>Accueil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-uri="/upload"><i class="bi bi-upload"></i>Upload</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-uri="/"><i class="bi bi-bookmark"></i>Bibliothèque</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-uri="/"><i class="bi bi-chat"></i>Chat</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-uri="/dashboard">Dashboard</a>
        </li>   

        <!-- Ajout d'une nouvelle nav-item "Mon Profil" visible sur des écrans de taille inférieure à 1000px -->
        <li class="nav-item d-lg-none">
          <a class="nav-link" data-uri="/profil"><i class="bi bi-person"></i>Mon Profil</a>
        </li>
      </ul>

      <!-- Ajout d'une nouvelle div pour afficher "Mon Profil" sur des écrans de taille supérieure à 1000px -->
      <div class="d-none d-lg-block ms-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
          <a class="nav-link" data-uri="/profil"><i class="bi bi-person"></i>Mon Profil</a>
          </li>
        </ul>
      </div>

    </div>

  </div>
</nav>
`;
         
  navbarWrapper.innerHTML = navbar;
  
};

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarIcon = document.querySelector('.navbar-toggler i');

  navbarToggler.addEventListener('click', () => {
    // Toggle entre les classes d'icône Bootstrap
    navbarIcon.classList.toggle('bi-list');
    navbarIcon.classList.toggle('bi-x');
  });
});



export default Navbar;
