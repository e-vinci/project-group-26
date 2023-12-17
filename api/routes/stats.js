const express = require('express');
const { getMonthlyStudentCounts } = require('../models/users');

const router = express.Router();

router.get('/monthlyStudentCounts', async (req, res) => {
  try {
    const monthlyCounts = await getMonthlyStudentCounts();
    res.json({ data: monthlyCounts });
  } catch (error) {
    console.error('Error getting monthly student counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
