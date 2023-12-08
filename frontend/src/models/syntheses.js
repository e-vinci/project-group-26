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
      const options = {
        method: 'POST',
        body: JSON.stringify(synthese),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch('/api/uploads', options);
  
      const createdSynthese = await response.json();
  
      return createdSynthese;
    } catch (err) {
      console.error('addSynthese::error: ', err);
      throw err;
    }
  };

export { readAllSyntheses, addSynthese };