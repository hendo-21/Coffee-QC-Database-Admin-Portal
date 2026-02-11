const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// READ
router.get('/', (req, res) => {
    db.pool.query("SELECT * FROM Locations", (err, rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

// CREATE
router.post('/', (req, res) => {
    const { location_name } = req.body;
    db.pool.query("INSERT INTO Locations (location_name) VALUES (?)", [location_name], (err) => {
        if (err) res.status(500).send(err);
        else res.sendStatus(201);
    });
});

module.exports = router;