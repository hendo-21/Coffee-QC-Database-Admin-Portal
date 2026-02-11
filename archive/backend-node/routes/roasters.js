const express = require('express');
const router = express.Router();
const db = require('../db-connector');

// READ (Joined with Locations to show names)
router.get('/', (req, res) => {
    const query = `
        SELECT roaster_id, roaster_name, Locations.location_name 
        FROM Roasters 
        JOIN Locations ON Roasters.location_id = Locations.location_id`;
    db.pool.query(query, (err, rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

// CREATE
router.post('/', (req, res) => {
    const { roaster_name, location_id } = req.body;
    db.pool.query("INSERT INTO Roasters (roaster_name, location_id) VALUES (?, ?)",
        [roaster_name, location_id], (err) => {
            if (err) res.status(500).send(err);
            else res.sendStatus(201);
        });
});

module.exports = router;