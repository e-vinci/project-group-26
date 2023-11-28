const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/syntheses.json');

function readAllSyntheses() {
  const syntheses = parse(jsonDbPath);

  return syntheses;
}

function createSynthese(titre, description, annee, section, cours, lien_synthese, etudiant_mail, likes, telechargements) {
  const syntheses = parse(jsonDbPath);

  const createdSynthese = {
    synthese_id: getNextId(),
    titre,
    description,
    annee,
    section,
    cours,
    lien_synthese,
    etudiant_mail,
    likes,
    telechargements,
  };

  syntheses.push(createdSynthese);

  serialize(jsonDbPath, syntheses);

  return createdSynthese;
}

function getNextId() {
  const syntheses = parse(jsonDbPath);
  const lastItemIndex = syntheses?.length !== 0 ? syntheses.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = syntheses[lastItemIndex]?.synthese_id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
    readAllSyntheses,
    createSynthese,
};
