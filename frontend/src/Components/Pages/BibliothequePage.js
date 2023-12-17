import { clearPage } from '../../utils/render';
import imageSynthese from '../../img/4882404-removebg-preview.png';
import { readAllDownloads, downloadSynthese, readAllSyntheses } from '../../models/syntheses';
import Navigate from '../Router/Navigate';
import { myMSALObj } from '../Azure/AzureConfig';


import '../../stylesheets/card.css';

const BibliothequePage = async () => {
  clearPage();
  const bibliotheque = document.querySelector('main');

  const downloads = await readAllDownloads();
  const syntheses = await readAllSyntheses();

  const Allsyntheses = [];

  const currentAccounts = myMSALObj.getAllAccounts();
  if(currentAccounts.length===0){
    Navigate('/');
    return;
  }


  for (let i = 0; i < downloads.length; i += 1) {
    if (downloads[i].etudiant_mail === currentAccounts[0].username) {
      let finded = false;
      for (let j = 0; j < Allsyntheses.length; j += 1) {
        if (Allsyntheses[j].synthese_id === parseInt(downloads[i].synthese_id, 10) ) {
          finded = true;
          break;
        }
      }
      if (!finded) {
        Allsyntheses.push(syntheses[downloads[i].synthese_id - 1]);
      }
    }
  }

  if (Allsyntheses?.length === undefined || Allsyntheses.length === 0 || downloads.length === 0) {
    bibliotheque.innerHTML = `<p class="p-5">Vous n'avez pas téléchargé de synthèse : (</p>`;
    return;
  }

  bibliotheque.innerHTML = `
    <section class="vgp-container">

        <section class="vgp-search">

        <div class="search-container">

                <form method="get">
                    <input type="text" placeholder="Search..." />
                    <input type="submit" value="Rechercher" />
                </form>

        </div>

        </section>

        <section class="vgp">

            <section class="vgp-card">


            ${Allsyntheses
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

                                    <h5 class="card-title"><a href="/" alt="titre synthese" >${element.titre}</a></h5>
                                    <p class="card-text"><a href="/" alt="nom utilisateur">Publié par : ${element.etudiant_nom}</a></p>

                                <div class="card-body-link d-flex justify-content-between align-items-center">
                                    <a href="#" class="btn btn-primary"><i class="bi bi-eye"></i></a>
                                    <div>
                                        <a href="#" class="btn btn-primary"><i class="bi bi-download" id="${element.synthese_id}"></i></a>
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

    const downloadButton = document.querySelector('a.btn-primary > i.bi-download');


      downloadButton.addEventListener('click', async (event) => {
        event.preventDefault();

        await downloadSynthese(downloadButton.id);
        Navigate('/');

    });


};

export default BibliothequePage;
