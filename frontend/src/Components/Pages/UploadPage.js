import { clearPage } from '../../utils/render';
import '../../stylesheets/upload.css';
import { addSynthese } from '../../models/syntheses';
import Navigate from '../Router/Navigate';
import { myMSALObj } from '../Azure/AzureConfig';
import isLogIn from '../Azure/IsLogIn';


const UploadPage = () => {
  isLogIn();
  clearPage();
  const uploadPage = document.querySelector('main');
  uploadPage.innerHTML = `

  <div id="mainSynthese">

    <form id="formPostSynthese" enctype="multipart/form-data">

      <h1> Publier une synthèse </h1>

      <div class="form-group">
        
        <input type="title" class="form-control" id="titre" aria-describedby="titleHelp" placeholder="Entrez un titre">
      </div>

      <div class="form-group">
        <textarea class="form-control" id="description" rows="3" placeholder="Entrez une description"></textarea>
      </div>

      <div class="form-group select">
        <select class="custom-select mr-sm-2" id="selectAnnee">
          <option selected>Année</option>
          <option value="1">1</option>
          <option value="1">2</option>
        </select>

        <select class="custom-select mr-sm-2" id="selectSection">
          <option selected>Section</option>
          <option value="1">BIN</option>
          <option value="1">ECO</option>
        </select>

        <select class="custom-select mr-sm-2" id="selectCours">
          <option selected>Cours</option>
          <option value="1">TMR</option>
          <option value="1">Gestion</option>
        </select>
      </div>

      <div class="form-group">
        <input type="file" class="form-control" id="lienSynthese" name="lienSynthese">
        <p> Les fichiers acceptés sont en jpg, pdf et png</p>
      </div>

      <input type="submit" class="btn btn-primary form-group" value="Upload"/>

    </form>

  </div>

  `;


  const currentAccounts = myMSALObj.getAllAccounts();

  const myForm = document.querySelector('form');
  const titre = document.querySelector('#titre');
  const description = document.querySelector('#description');
  const annee = document.querySelector('#selectAnnee');
  const section = document.querySelector('#selectSection');
  const cours = document.querySelector('#selectCours');
  const lienSynthese = document.querySelector('#lienSynthese');
  const user = currentAccounts[0];

  myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const syntheseCreated = {
      titre: titre.value,
      description: description.value,
      annee: annee.options[annee.selectedIndex].text,
      section: section.options[section.selectedIndex].text,
      cours: cours.options[cours.selectedIndex].text,
      lien_synthese: lienSynthese.files[0],
      etudiant_mail: user.username,
      etudiant_nom: user.name
    };

    await addSynthese(syntheseCreated);
    Navigate('/');
  });

 

};



export default UploadPage;