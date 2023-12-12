const express = require('express');
const { getAllUsers, addOneUser, userExists } = require('../models/users');

const router = express.Router();

// Read a film from its id in the menu
router.get('/', async (req, res) => {
  try {
    const foundUser = await getAllUsers();

    if (!foundUser) return res.sendStatus(404);

    return res.json(foundUser);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check if a user with the given email already exists
router.post('/exists', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const exists = await userExists(email);
    return res.json({ exists });
  } catch (error) {
    console.error('Error checking user existence:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a user to data/users.json
router.post('/', async (req, res) => {
  try {
    // Assurez-vous que le corps de la requête contient les données nécessaires
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }

    // Vérifiez d'abord si l'utilisateur existe déjà
    const exists = await userExists(email);

    if (!exists) {
      // L'utilisateur n'existe pas encore, ajoutez-le
      await addOneUser(name, email);

      return res.status(201).json({ message: 'User added successfully' });
    }

    return res.status(409).json({ error: 'User already exists' });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
