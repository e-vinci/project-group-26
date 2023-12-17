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

const addSynthese = async (synthese) => {
    try {
      const tokenResponse = await getTokenRedirect(tokenRequest);
      
      const options = {
        method: 'POST',
        body: JSON.stringify(synthese),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse.idToken}`
        },
      };
  
      const response = await fetch('/api/uploads', options);

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const createdSynthese = await response.json();
  
      return createdSynthese;
    } catch (err) {
      console.error('addSynthese::error: ', err);
      throw err;
    }
  };

export { readAllSyntheses, addSynthese };