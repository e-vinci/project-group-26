const express = require('express');
const router = express.Router();
const Synthese = require("../models/syntheses.js");

router.get('/', (req, res) => {
    const stats = Synthese.getAllSyntheses();
    res.render('/new', {syntheses: stats});
});

module.exports = router;
