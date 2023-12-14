const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const destinationDirectory = path.join(__dirname, '../..', 'files');
const {
  readAllSyntheses,
  createSynthese,
} = require('../models/uploads');

const router = express.Router();

if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


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
  const lien_synthese = req.file.path;
  const etudiant_mail = req?.body?.content?.trim().length !== 0 ? req.body.etudiant_mail : undefined;
  const etudiant_nom = req?.body?.content?.trim().length !== 0 ? req.body.etudiant_nom : undefined;
  const likes = 0;
  const telechargements = 0;
  if (!titre || !description || !annee || !section|| !cours|| !lien_synthese|| !etudiant_mail || !etudiant_nom) return res.sendStatus(400);
  const createdSynthese = createSynthese(titre, description, annee, section, cours, lien_synthese, etudiant_mail, etudiant_nom, likes, telechargements);

  return res.json(createdSynthese);
});

module.exports = router;
