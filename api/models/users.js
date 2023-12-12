const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '../data/users.json');

async function getAllUsers() {
  try {
    const data = parse(jsonDbPath, 'utf-8');
    console.log('Utilisateurs récupérés avec succès', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
}

async function addOneUser(name, username) {
  try {
    const users = await getAllUsers();

    const newUser = {
      name,
      username,
    };

    // Ajoutez le nouvel utilisateur à la liste
    users.push(newUser);

    // Écrivez la liste mise à jour dans le fichier JSON
    serialize(jsonDbPath, users);

    console.log('Utilisateur ajouté avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    throw error;
  }
}

async function userExists(email) {
  try {
    const data = await getAllUsers();
    const existingUser = data.find((user) => user.email === email);
    return !!existingUser;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
}

// Ajoutez d'autres fonctions de modèle au besoin

module.exports = {
  getAllUsers,
  addOneUser,
  userExists,
};
