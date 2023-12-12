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

    if (!addUserResponse.ok) {
        throw new Error(`Failed to add user: ${addUserResponse.status}`);
    }
    
    // Vous pouvez retourner des données supplémentaires si nécessaire
    // const responseData = await addUserResponse.json();
    // return responseData;
}

export default addUser;
