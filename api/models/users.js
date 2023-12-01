const fs = require('fs').promises;
// Pour utiliser les promesses avec fs
const jsonDbPath = `${__dirname}/../data/users.json`;

async function getAllUsers() {
  try {
    const data = await fs.readFile(jsonDbPath, 'utf-8');
    const users = JSON.parse(data);
    return users;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
}

// Ajoutez d'autres fonctions de modèle au besoin

module.exports = {
  getAllUsers,
  // Ajoutez d'autres fonctions de modèle au besoin
};
