import { tokenRequest } from "../Components/Azure/AzureConfig";
import { getTokenRedirect } from "../Components/Azure/Log";

const readAllSyntheses = async () => {
  try {
      const res = await fetch('/api/uploads');
      const syntheses = await res.json();
      return syntheses;
  } catch (err) {
      console.error('readAllSyntheses::error: ', err);
      throw err;
  }
};

const readAllDownloads = async () => {
  try {
      const res = await fetch('/api/downloads');
      const downloads = await res.json();
      return downloads;
  } catch (err) {
      console.error('readAllDownloads::error: ', err);
      throw err;
  }
};

const addSynthese = async (synthese) => {
  try {

    const tokenResponse = await getTokenRedirect(tokenRequest);
    const headers = new Headers();
    const bearer = `Bearer ${tokenResponse.idToken}`;
    headers.append("Authorization", bearer);

    const formData = new FormData();
    formData.append('titre', synthese.titre);
    formData.append('description', synthese.description);
    formData.append('annee', synthese.annee);
    formData.append('section', synthese.section);
    formData.append('cours', synthese.cours);
    formData.append('lienSynthese', synthese.lien_synthese);
    formData.append('etudiant_mail', synthese.etudiant_mail);
    formData.append('etudiant_nom', synthese.etudiant_nom);

    const options = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch('/api/uploads', options);

    const createdSynthese = await response.json();

    return createdSynthese;
  } catch (err) {
    console.error('addSynthese::error: ', err);
    throw err;
  }
};

const downloadSynthese = async (syntheseID, mail) => {
  try {

    // await fetch(`/api/uploads/download${syntheseID}?mail=${mail}`, options);
    window.open(`/api/uploads/download${syntheseID}?mail=${mail}`, '_blank');

  } catch (err) {
    console.error('downloadSynthese::error: ', err);
    throw err;
  }
};


export { readAllSyntheses, addSynthese, downloadSynthese, readAllDownloads };