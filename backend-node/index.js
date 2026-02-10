require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL Database");
});

// 2. GET Locations (Read)
app.get('/api/locations', (req, res) => {
    db.query('SELECT * FROM Locations', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});


// 4. GET Roasters with Join
app.get('/api/roasters', (req, res) => {
    // We join 'roasters' (r) and 'Locations' (l) using city and country
    const sql = `
        SELECT r.roaster_id, r.roaster_name, r.email, l.city, l.country 
        FROM roasters r 
        JOIN locations l ON r.location_id = l.location_id`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            // If there's an error, send an empty array so React doesn't crash
            return res.status(500).json([]);
        }
        res.json(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});