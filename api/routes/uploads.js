const express = require('express');
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
router.post('/', (req, res) => {
  const titre = req?.body?.titre?.trim()?.length !== 0 ? req.body.titre : undefined;
  const description = req?.body?.content?.trim().length !== 0 ? req.body.description : undefined;
  const annee = req?.body?.content?.trim().length !== 0 ? req.body.annee : undefined;
  const section = req?.body?.content?.trim().length !== 0 ? req.body.section : undefined;
  const cours = req?.body?.content?.trim().length !== 0 ? req.body.cours : undefined;
  const lien_synthese = "test_lien";
  const etudiant_mail = req?.body?.content?.trim().length !== 0 ? req.body.etudiant_mail : undefined;
  const likes =
    typeof req?.body?.likes !== 'number' || req.body.likes < 0
      ? undefined
      : req.body.likes;
  const telechargements =
    typeof req?.body?.telechargements !== 'number' || req.body.telechargements < 0 ? undefined : req.body.telechargements;
    console.log("titre: "+titre)
    console.log(!titre)
    console.log("description: "+description)
    console.log(!description)
    console.log("annee: "+annee)
    console.log(!annee)
    console.log("section: "+section)
    console.log(!section)
    console.log("cours: "+cours)
    console.log(!cours)
    console.log("lien_synthese: "+lien_synthese)
    console.log(!lien_synthese)
    console.log("etudiant_mail: "+etudiant_mail)
    console.log(!etudiant_mail)
    console.log("likes: "+likes)
    console.log(!likes)
    console.log("telechargements: "+telechargements)
    console.log(!telechargements)

    if (!titre || !description || !annee || !section|| !cours|| !lien_synthese|| !etudiant_mail) return res.sendStatus(400);
  console.log("CREATED--------------------------------------7527-278-3278-3-73-78-378-3-783-78-378-3-")
  const createdSynthese = createSynthese(titre, description, annee, section, cours, lien_synthese, etudiant_mail, likes, telechargements);

  return res.json(createdSynthese);
});

module.exports = router;
