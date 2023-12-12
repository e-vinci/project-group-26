import { clearPage } from '../../utils/render';
import imageSynthese from '../../img/4882404-removebg-preview.png';

import '../../stylesheets/card.css';

const VinciGeniusPage = () => {
  clearPage();
  const vinciGenius = document.querySelector('main');
  vinciGenius.innerHTML = `


    <section class="vgp-container">

        <section class="vgp-search">

        <div class="search-container">

                <form method="get">
                    <input type="text" placeholder="Search..." />
                    <input type="submit" value="Rechercher" />
                </form>

            <div class="filter">

                <form method="get" id="filterForm">
                    <div class="filterSynthese">
                        <select name="filterSynthese" class="selectFilter">
                            <option value="annee">Année</option>
                            <option value="categorie">Catégorie</option>
                            <option value="classe">Classe</option>
                        </select>
                    </div>

                    <input type="submit" value="Filtrer"/>

                </form>

            </div>

        </div>

        </section>

        <section class="vgp">

            <section class="vgp-card">

                <div class="card-container row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    <div class="card col">
                        <a href="/">                
                            <div class="img">
                                <img src="${imageSynthese}" class="card-img-top" alt="...">
                            </div>
                        </a>
                        <div class="card-body">   

                                <h5 class="card-title"><a href="/" alt="LIEN POUR SYNTHESE" >Semaine If</a></h5>
                                <p class="card-text"><a href="/" alt="LIEN VERS UTILISATEUR">Publié par : user_158745</a></p>

                            <div class="card-body-link d-flex justify-content-between align-items-center">
                                <a href="#" class="btn btn-primary"><i class="bi bi-eye"></i></a>
                                <div>
                                    <a href="#" class="btn btn-primary"><i class="bi bi-download"></i></a>
                                    <a href="#" class="btn btn-primary"><i class="bi bi-star"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>

                <div class="card-container row row-cols-1 row-cols-md-2 row-cols-lg-4">
                    <div class="card col">
                        <a href="/">                
                            <div class="img">
                                <img src="${imageSynthese}" class="card-img-top" alt="...">
                            </div>
                        </a>
                        <div class="card-body">   

                                <h5 class="card-title"><a href="/" alt="LIEN POUR SYNTHESE" >Semaine For</a></h5>
                                <p class="card-text"><a href="/" alt="LIEN VERS UTILISATEUR">Publié par : user_158745</a></p>

                            <div class="card-body-link d-flex justify-content-between align-items-center">
                                <a href="#" class="btn btn-primary"><i class="bi bi-eye"></i></a>
                                <div>
                                    <a href="#" class="btn btn-primary"><i class="bi bi-download"></i></a>
                                    <a href="#" class="btn btn-primary"><i class="bi bi-star"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>

            </section>
        </section>


    </section>

    `;
};

export default VinciGeniusPage;
