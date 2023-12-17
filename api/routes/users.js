const express = require('express');
const {
  getAllUsers, addOneUser, updateAccessByEmail, getStudentAccessInfo, nbreStudent,
} = require('../models/users');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  console.log('on est arrivé dans la méthode GET/');
  try {
    const foundUsers = await getAllUsers();

    if (!foundUsers) return res.sendStatus(404);

    // Mettez à jour la liste pour inclure la propriété canAccessSite
    const updatedUsers = foundUsers.map((user) => ({ ...user, canAccessSite: true }));

    return res.json(updatedUsers);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Mettre à jour canAccessSite côté serveur
router.put('/updateAccess/:email', async (req, res) => {
  console.log('on est arrivé dans la méthode /updateAccess/:email');
  try {
    const userEmail = req.params.email;

    // Appeler la méthode de mise à jour de l'accès
    const updatedUsers = await updateAccessByEmail(userEmail);

    // Utilisez la variable mise à jour dans la réponse JSON
    return res.json(updatedUsers);
  } catch (error) {
    console.error('Error updating access:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a user
router.post('/', async (req, res) => {
  console.log('on est arrivé dans la méthode POST/');
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }

    await addOneUser(name, email);
    return res.sendStatus(200);
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/pageRequiringAccess', async (req, res) => {
  console.log('on est arrivé dans la méthode GET/pageRequiringAccess');

  try {
    const valeur = await getStudentAccessInfo(req.query.email);
    console.log('email', req.query.email);
    console.log('valeur', valeur);
    return res.json(valeur);
  } catch (error) {
    console.error('Error getting acces:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/numberOfStudents', async (req, res) => {
  try {
    const nbre = await nbreStudent();
    return res.json(nbre);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
