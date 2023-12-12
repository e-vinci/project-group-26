const express = require('express');
const multer = require('multer')
const upload = multer({
    dest: '/test',
})
const {
  readAllSyntheses,
  createSynthese,
} = require('../models/uploads');

const router = express.Router();

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const allSyntheses = readAllSyntheses();

  return res.json(allSyntheses);
});

// Create a film
router.post('/', upload.single('lienSynthese'), (req, res) => {
  const titre = req?.body?.titre?.trim()?.length !== 0 ? req.body.titre : undefined;
  const description = req?.body?.content?.trim().length !== 0 ? req.body.description : undefined;
  const annee = req?.body?.content?.trim().length !== 0 ? req.body.annee : undefined;
  const section = req?.body?.content?.trim().length !== 0 ? req.body.section : undefined;
  const cours = req?.body?.content?.trim().length !== 0 ? req.body.cours : undefined;
  const lien_synthese = req?.body?.content?.trim().length !== 0 ? req.body.lien_synthese : undefined;
  const etudiant_mail = req?.body?.content?.trim().length !== 0 ? req.body.etudiant_mail : undefined;
  const etudiant_nom = req?.body?.content?.trim().length !== 0 ? req.body.etudiant_nom : undefined;
  const likes =
    typeof req?.body?.likes !== 'number' || req.body.likes < 0
      ? undefined
      : req.body.likes;
  const telechargements = typeof req?.body?.telechargements !== 'number' || req.body.telechargements < 0 ? undefined : req.body.telechargements;
  if (!titre || !description || !annee || !section|| !cours|| !lien_synthese|| !etudiant_mail || !etudiant_nom) return res.sendStatus(400);

  fs.writeFile('./test', req.body.lien_synthese, (err) => {
    if (err) throw err;
    console.log('saved!');
  });
  console.log('ter!');

  const createdSynthese = createSynthese(titre, description, annee, section, cours, lien_synthese, etudiant_mail, etudiant_nom, likes, telechargements);

  return res.json(createdSynthese);
});

module.exports = router;
