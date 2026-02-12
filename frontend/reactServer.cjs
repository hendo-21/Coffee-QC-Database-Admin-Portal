// ########################################
// ########## SETUP

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 1886;

// ########################################
// ########## ROUTE HANDLERS


// Citation for use of AI Tools
// Date: 02/12/26
// Prompt(s) used: 
//  - Why does "npm run stop_production" return "Forever cannot find process"?
//  - What does "PathError: Missing parameter name" mean in Express 5?
// AI Source: Google Gemini

// This code below provided in the explorations was causing issues
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
// Gemini generated code snippet to resolve production server issues
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// ########################################
// ########## LISTENER

 app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});