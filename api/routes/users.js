const express = require('express');

const router = express.Router();
const userModel = require('../models/users');

router.get('/', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Autres routes ou contrôleurs pour d'autres opérations

module.exports = router;
