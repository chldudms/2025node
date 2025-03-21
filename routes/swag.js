const express = require("express");

const router = express.Router();


// GET /swag
router.get('/', (req, res) => {
    res.send('get, swag!\n');
});


// GET /swag/:person
router.get('/:person', (req, res) => {
  res.send(req.params.person);
});


// POST /swag
router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;