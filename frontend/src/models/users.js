async function addUser(user) {
    const addUserResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Ajoutez d'autres en-têtes si nécessaire
        },
        body: JSON.stringify({
            name: user.name, // Utilisez le nom d'utilisateur comme nom
            email: user.username, // Utilisez le nom d'utilisateur comme email
            // Ajoutez d'autres champs si nécessaire
        }),
        // Autres options de configuration si nécessaire
    });
    
    console.log('Response from server:', addUserResponse);


    if (!addUserResponse.ok) {
        throw new Error(`Failed to add user: ${addUserResponse.status}`);
    }
    
    // Vous pouvez retourner des données supplémentaires si nécessaire
    // const responseData = await addUserResponse.json();
    // return responseData;
}


async function getStudentAccessInfo (email){
    console.log('on est arrivé dans la méthode getStudentAccessInfo', email);
    try {
        console.log('on est arrivé dans la méthode getStudentAccessInfo', email);
        const response = await fetch(`/api/users/pageRequiringAccess?email=${email}`);

            
        ;
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        const canAccessSite = await response.json();
        console.log('canAccessSite', canAccessSite);
        return canAccessSite;

    } catch (err) {
      console.error('canAccessSite::error: ', err);
      throw err;
    }
  };    



async function modificationOfStudentAccessInfo(email) {
    try {
        const addUserResponse = await fetch(`/api/users/updateAccess/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        console.log('Response from server:', addUserResponse);

        if (!addUserResponse.ok) {
            throw new Error(`Failed to update access: ${addUserResponse.status}`);
        }
    } catch (error) {
        console.error('Error updating access:', error);
        throw error; // Rejetez l'erreur pour que l'appelant puisse la gérer
    }
}

async function fetchNumberOfStudents() {
    try {
        const response = await fetch('/api/users/numberOfStudents');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching number of students:', error);
        throw error; // You can choose to handle the error or propagate it
    }
}



export { addUser,
        getStudentAccessInfo, 
        modificationOfStudentAccessInfo,
        fetchNumberOfStudents };
