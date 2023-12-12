const express = require('express');

const router = express.Router();
const userModel = require('../models/users');
const annoucementModel = require('../../frontend/models/dashboards'); // Assurez-vous que le chemin d'importation est correct

// ... Reste de votre code ...

// Récupération de tout les utilisateurs pour le select
router.get('/', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/api/sendAnnouncement', async (req, res) => {
  const { title, content } = req.body;

  // Utilisez la fonction du modèle pour envoyer l'annonce
  try {
    await annoucementModel.sendAnnouncement(title, content);
    res.status(200).send('Annonce envoyée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'annonce.', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'envoi de l\'annonce' });
  }
});

// Autres routes ou contrôleurs pour d'autres opérations

module.exports = router;
