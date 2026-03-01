// Citation for following code:
// Date: 02/09/26
// Copied from:
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// ########################################
// ########## SETUP
require('dotenv').config();

// asyncHandler
const asyncHandler = require('express-async-handler');

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = 1884;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

// GET Locations
app.get('/api/locations', asyncHandler(async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Locations');
        res.status(200).json(result);
    } catch (err) {
        console.error("SQL Error in Locations:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// GET Roasters with Join
app.get('/api/roasters', asyncHandler(async (req, res) => {
    // We join 'roasters' (r) and 'Locations' (l) using city and country
    try {
        const sql = `
            SELECT roaster_id, roaster_name, email, city, country
            FROM Roasters
            JOIN Locations ON Roasters.location_id = Locations.location_id
            `;
        const [roasters] = await db.query(sql);
        res.status(200).json(roasters)
    } catch (err) {
        console.error("SQL Error in Roasters:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// GET BrewRecipes
app.get('/api/brewrecipes', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT recipe_id,
                BrewerTypes.brewer_type,
                target_dose,
                target_yield,
                target_grind_size,
                target_water_temp,
                target_brew_time,
                RecipeStatuses.status_type AS status
            FROM BrewRecipes
            INNER JOIN BrewerTypes ON BrewRecipes.brewer_id = BrewerTypes.brewer_id
            INNER JOIN RecipeStatuses ON BrewRecipes.status_id = RecipeStatuses.status_id
            `;
        const [brewrecipes] = await db.query(query);
        res.status(200).json(brewrecipes)
    } catch (err) {
        console.error("SQL Error in BrewRecipes:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// GET BrewerTypes
app.get('/api/brewertypes', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT * FROM BrewerTypes
            `;
        const [brewertypes] = await db.query(query);
        res.status(200).json(brewertypes)
    } catch (err) {
        console.error("SQL Error in BrewerTypes:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// GET BrewResults
app.get('/api/brewresults', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT
                result_id,
                BrewRecipes.recipe_id,
                Coffees.coffee_name AS coffee_name,
                Roasters.roaster_name AS roaster,
                RecipeStatuses.status_type AS recipe_status,
                BrewerTypes.brewer_type AS brewer,
                actual_dose,
                actual_yield,
                actual_grind_size,
                actual_water_temp,
                actual_brew_time,
                tds_reading,
                ext_yield,
                rating	
            FROM BrewResults
            INNER JOIN Coffees ON BrewResults.coffee_id = Coffees.coffee_id
            INNER JOIN CoffeeLots ON Coffees.lot_id = CoffeeLots.lot_id
            INNER JOIN Roasters ON Coffees.roaster_id = Roasters.roaster_id
            INNER JOIN BrewRecipes ON BrewResults.recipe_id = BrewRecipes.recipe_id
            INNER JOIN RecipeStatuses ON BrewRecipes.status_id = RecipeStatuses.status_id
            INNER JOIN BrewerTypes ON BrewRecipes.brewer_id = BrewerTypes.brewer_id
            ORDER BY result_id
            `;
        const [brewresults] = await db.query(query);
        res.status(200).json(brewresults)
    } catch (err) {
        console.error("Error executing queries:", err);
        res.status(500).send("An error occurred while executing the database queries.");
    }
}));

// GET RecipeStatuses
app.get('/api/recipestatuses', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT * FROM RecipeStatuses
            ORDER BY status_id ASC
            `;
        const [brewertypes] = await db.query(query);
        res.status(200).json(brewertypes)
    } catch (err) {
        console.error("SQL Error in RecipeStatuses:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// GET Coffees
app.get('/api/coffees', asyncHandler(async (req, res) => {
    try {
        const sql = `
            SELECT
            coffee_id,
            coffee_name,
            Roasters.roaster_name AS roaster,
            CoffeeLots.lot_number,
            RoastTypes.roast_name AS roast
            FROM Coffees
            JOIN Roasters ON Coffees.roaster_id = Roasters.roaster_id
            JOIN CoffeeLots ON Coffees.lot_id = CoffeeLots.lot_id
            JOIN RoastTypes ON Coffees.roast_type_id = RoastTypes.roast_type_id
            ORDER BY Coffees.coffee_id ASC
        `;
        const [coffees] = await db.query(sql);

        return res.status(200).json(coffees || []);

    } catch (err) {
        console.error("SQL Error in Coffees:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// GET CoffeeLots
app.get('/api/coffeelots', asyncHandler(async (req, res) => {
    try {
        const sql = `
            SELECT
            lot_id,
            lot_number,
            Locations.city AS city,
            Locations.country AS country,
            meters_elevation AS elevation,
            ProcessingStyles.process_name AS process
            FROM CoffeeLots
            JOIN Locations ON CoffeeLots.location_id = Locations.location_id
            JOIN ProcessingStyles ON CoffeeLots.process_id = ProcessingStyles.process_id
            ORDER BY CoffeeLots.lot_id ASC
        `;
        const [lots] = await db.query(sql);

        return res.status(200).json(lots || []);
    } catch (err) {
        console.error("SQL Error in CoffeeLots:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// GET Varietals
app.get('/api/varietals', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT * FROM Varietals
        ORDER BY varietal_id ASC
        `;
        const [varietals] = await db.query(sql);

        return res.status(200).json(varietals || []);
    } catch (err) {
        console.error("SQL Error in Varietals:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// GET CoffeeLotVarietals
app.get('/api/coffeelotvarietals', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT
            CoffeeLots.lot_number, Varietals.varietal_name
        FROM CoffeeLotVarietals
        JOIN CoffeeLots ON CoffeeLotVarietals.lot_id = CoffeeLots.lot_id
        JOIN Varietals ON CoffeeLotVarietals.varietal_id = Varietals.varietal_id
        ORDER BY CoffeeLots.lot_number ASC
        `;
        const [lotVarietals] = await db.query(sql);

        return res.status(200).json(lotVarietals || []);
    } catch (err) {
        console.error("SQL Error in CoffeeLotVarietals:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// GET ProcessingStyles
app.get(`/api/processingstyles`, asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT * FROM ProcessingStyles
        ORDER BY process_id ASC
        `;
        const [processes] = await db.query(sql);

        return res.status(200).json(processes || []);
    } catch (err) {
        console.error("SQL Error in ProcessingStyles:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// GET RoastTypes
app.get('/api/roasttypes', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT * FROM RoastTypes
        ORDER BY roast_type_id ASC
        `;
        const [roastTypes] = await db.query(sql);

        return res.status(200).json(roastTypes || []);
    } catch (err) {
        console.error("SQL Error in RoastTypes:", err.message);
        return res.status(500).json({ err: err.message });
    }
}));

// POST ROUTES

// PUT ROUTES

// DELETEROUTES


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});