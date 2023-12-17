const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '../data/annouce.json');

async function getAllAnnouce() {
  try {
    const data = parse(jsonDbPath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
}

async function addAnnouce(title, content) {
  try {
    const annonce = await getAllAnnouce();

    const newAnnonce = { title, content };

    annonce.push(newAnnonce);

    serialize(jsonDbPath, annonce);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
    throw error;
  }
}

module.exports = {
  getAllAnnouce,
  addAnnouce,
};
