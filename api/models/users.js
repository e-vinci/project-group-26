const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '../data/users.json');

// ------------------------------------Obtenir tous les utilisateurs
async function getAllUsers() {
  try {
    const data = parse(jsonDbPath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
}

// ------------------------------------Ajouter un utilisateur
async function addOneUser(name, email) {
  try {
    const users = await getAllUsers();

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      console.log('L\'utilisateur existe déjà');
      return;
    }

    const newUser = {
      name,
      email,
      canAccessSite: true,
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

// ------------------------------------Mettre à jour l'accès d'un utilisateur par email
async function updateAccessByEmail(email) {
  try {
    const users = await getAllUsers();

    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return { ...user, canAccessSite: false };
      }
      return user;
    });

    // Enregistrez les mises à jour dans le fichier JSON
    serialize(jsonDbPath, updatedUsers); // Ajustez le chemin en conséquence

    return updatedUsers;
  } catch (error) {
    console.error('Error updating access:', error);
    throw new Error('Internal Server Error');
  }
}

// ------------------------------------Vérifier l'accès de l'étudiant
async function getStudentAccessInfo(email) {
  try {
    const users = await getAllUsers();
    const user = users.find((usere) => usere.email === email);

    return user.canAccessSite;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'accès de l\'étudiant', error);
    return false;
  }
}

// ------------------------------------Obtenir le nombre d'étudiants
async function nbreStudent() {
  const jsonData = parse(jsonDbPath, 'utf-8'); // Replace with the correct path to your JSON file
  const numberOfStudents = jsonData.length - 1;
  return numberOfStudents;
}

module.exports = {
  getAllUsers,
  addOneUser,
  updateAccessByEmail,
  nbreStudent,
  getStudentAccessInfo,
};
