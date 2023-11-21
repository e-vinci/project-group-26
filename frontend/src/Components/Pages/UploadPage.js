import { clearPage } from '../../utils/render';
import '../../stylesheets/upload.css';


const UploadPage = () => {
  clearPage();
  const uploadPage = document.querySelector('main');
  uploadPage.innerHTML = `

  <div id="mainSynthese">

    <form id="formPostSynthese">

      <h1> Publier une synthèse </h1>

      <div class="form-group">
        
        <input type="title" class="form-control" id="inputTitle" aria-describedby="titleHelp" placeholder="Entrez un titre">
      </div>

      <div class="form-group">
        
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Entrez une description"></textarea>
      </div>

      <div class="form-group select">
        <select class="custom-select mr-sm-2" id="selectSynthese">
          <option selected>Année</option>
          <option value="1">1</option>
        </select>

        <select class="custom-select mr-sm-2" id="selectSynthese">
          <option selected>Section</option>
          <option value="1">BIN</option>
        </select>

        <select class="custom-select mr-sm-2" id="selectSynthese">
          <option selected>Cours</option>
          <option value="1">TMR</option>
        </select>
      </div>

      <div class="form-group">
        <input type="file" class="form-control" id="inputGroupFile01">
        <p> Les fichiers acceptés sont en jpg, pdf et png</p>
      </div>

      <button type="submit" class="btn btn-primary form-group" id="buttonPostSynthese">Submit</button>

    </form>

  </div>

  `;
};

export default UploadPage;