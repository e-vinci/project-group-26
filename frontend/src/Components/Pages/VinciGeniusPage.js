import { clearPage } from '../../utils/render';
import imageSynthese from '../../img/4882404-removebg-preview.png';
import { readAllSyntheses} from '../../models/syntheses';
// import Navigate from '../Router/Navigate';
import isLogIn from '../Azure/IsLogIn';

import '../../stylesheets/card.css';

const VinciGeniusPage = async (synthesesTbl) => {
    isLogIn();
    clearPage();
    const vinciGenius = document.querySelector('main');

    const Allsyntheses = await readAllSyntheses();
    let syntheses = Allsyntheses;
    if (synthesesTbl){
        syntheses = synthesesTbl;
    }

    if (syntheses?.length === undefined || syntheses.length === 0) {
        vinciGenius.innerHTML = `<p class="p-5">No syntheses yet : (</p>`;
        return;
    }

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
                        <div class="filterSyntheseYear">
                            <select id= "filterSyntheseYear" name="filterSyntheseYear" class="selectFilter">
                                <option selected>Année</option>
                                <option value="1">1</option>
                                <option value="1">2</option>
                            </select>
                        </div>
                        <div class="filterSyntheseSection">
                            <select id= "filterSyntheseSection" name="filterSyntheseSection" class="selectFilter">
                                <option selected>Section</option>
                                <option value="1">BIN</option>
                                <option value="1">ECO</option>
                            </select>
                        </div>
                        <div class="filterSyntheseCours">
                            <select id= "filterSyntheseCours" name="filterSyntheseCours" class="selectFilter">
                                <option selected>Cours</option>
                                <option value="1">TMR</option>
                                <option value="1">Math</option>
                                <option value="1">Science</option>
                            </select>
                        </div>

                        <input type="submit" value="Filtrer"/>

                    </form>

                </div>

            </div>

            </section>

            <section class="vgp">

                <section class="vgp-card">


                ${syntheses
                    .map(
                    (element) => `
                        <div class="card-container row row-cols-1 row-cols-md-2 row-cols-lg-4">
                            <div class="card col">
                                <a href="/">                
                                    <div class="img">
                                        <img src="${imageSynthese}" class="card-img-top" alt="...">
                                    </div>
                                </a>
                                <div class="card-body">   

                                        <h5 class="card-title"><a href="/" alt="LIEN POUR SYNTHESE" >${element.titre}</a></h5>
                                        <p class="card-text"><a href="/" alt="LIEN VERS UTILISATEUR">Publié par : ${element.etudiant_nom}</a></p>

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
                    `,
                    )
                    .join('')}

                </section>
            </section>


        </section>

        `;

        const filterForm = document.querySelector('#filterForm');
        const filterSelectYear = document.querySelector('#filterSyntheseYear');
        const filterSelectSection = document.querySelector('#filterSyntheseSection');
        const filterSelectCours = document.querySelector('#filterSyntheseCours');
        let filteredSynthese = [];

        filterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const orderByYear = filterSelectYear.options[filterSelectYear.selectedIndex].text;
            const orderBySection = filterSelectSection.options[filterSelectSection.selectedIndex].text;
            const orderByCours = filterSelectCours.options[filterSelectCours.selectedIndex].text;

            for(let i=0;i<Allsyntheses.length;i+=1){
                if ((orderByYear === "Année" || Allsyntheses[i].annee === orderByYear) && (orderBySection === "Section" || Allsyntheses[i].section === orderBySection) &&(orderByCours === "Cours" || Allsyntheses[i].cours === orderByCours) ){
                    filteredSynthese.push(Allsyntheses[i]);
                }
            }

            VinciGeniusPage(filteredSynthese);
            
            /*
            if(filteredSynthese.length===0){
                VinciGeniusPage();

            }
            else{
                VinciGeniusPage(filteredSynthese);
            }
            */
            
            filteredSynthese = [];
            
        });


};

export default VinciGeniusPage;