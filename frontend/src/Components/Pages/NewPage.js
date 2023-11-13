import { clearPage } from '../../utils/render';

const NewPage = () => {
  clearPage();
  const newpage = document.querySelector('main');
  newpage.innerHTML = `

  <div id="mainSynthese">

    <form id="formPostSynthese">

      <h1> Publier une synthèse </h1>

      <div class="form-group">
        <label for="inputTitle">Titre</label>
        <input type="title" class="form-control" id="inputTitle" aria-describedby="titleHelp" placeholder="Entrez un titre">
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Entrez une description"></textarea>
      </div>

      <div class="form-group">
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
      </div>

      <button type="submit" class="btn btn-primary" id="buttonPostSynthese">Submit</button>

    </form>

  </div>

  `;
};

export default NewPage;
