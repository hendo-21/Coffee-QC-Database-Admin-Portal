// Citation for following code:
// Date: 02/09/26
// Code for the SETUP and LISTENER sections and READ routes were copied and adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Citation for use of AI Tools:
// Date: 03/02/26
// Prompts used: Explain parameterized queries, string interpolation, stored procedure OUT parameters. Iterative prompts below/in README.
// AI Source: GitHub Copilot VSCode integration.

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
// 1884
const PORT = 1884;


// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

// Read Locations table
app.get('/api/locations', asyncHandler(async (req, res) => {
    try {
        const [result] = await db.query('SELECT location_id, city, country FROM Locations');
        res.status(200).json(result);
    } catch (err) {
        console.error("SQL Error in Locations:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read Roasters table joined with Locations table
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

// Read BrewRecipes table joined with BrewerTypes and RecipeStatuses tables
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

// Read BrewerTypes table
app.get('/api/brewertypes', asyncHandler(async (req, res) => {
    try {
        const query = `SELECT brewer_id, brewer_type FROM BrewerTypes`;
        const [brewertypes] = await db.query(query);
        res.status(200).json(brewertypes)
    } catch (err) {
        console.error("SQL Error in BrewerTypes:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read BrewResults table joined with Coffees, CoffeeLots, Roasters, BrewRecipes, RecipeStatuses, and BrewerTypes tables
app.get('/api/brewresults', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT
                result_id,
                BrewRecipes.recipe_id,
                Coffees.coffee_id,
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

// Read RecipeStatuses table
app.get('/api/recipestatuses', asyncHandler(async (req, res) => {
    try {
        const query = `
            SELECT status_id, status_type FROM RecipeStatuses
            ORDER BY status_id ASC
            `;
        const [brewertypes] = await db.query(query);
        res.status(200).json(brewertypes)
    } catch (err) {
        console.error("SQL Error in RecipeStatuses:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read Coffees table joined with Roasters, CoffeeLots, and RoastTypes tables
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

// Read CoffeeLots table joined with Locations and ProcessingStyles tables
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
        return res.status(500).json({ error: err.message });
    }
}));

// Read Varietals table
app.get('/api/varietals', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT varietal_id, varietal_name FROM Varietals
        ORDER BY varietal_id ASC
        `;
        const [varietals] = await db.query(sql);

        return res.status(200).json(varietals || []);
    } catch (err) {
        console.error("SQL Error in Varietals:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read CoffeeLotVarietals table joined with CoffeeLots and Varietals tables
app.get('/api/coffeelotvarietals', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT
            CoffeeLotVarietals.lot_id,
            CoffeeLotVarietals.varietal_id,
            CoffeeLots.lot_number,
            Varietals.varietal_name
        FROM CoffeeLotVarietals
        JOIN CoffeeLots ON CoffeeLotVarietals.lot_id = CoffeeLots.lot_id
        JOIN Varietals ON CoffeeLotVarietals.varietal_id = Varietals.varietal_id
        ORDER BY CoffeeLots.lot_number ASC
        `;
        const [lotVarietals] = await db.query(sql);

        return res.status(200).json(lotVarietals || []);
    } catch (err) {
        console.error("SQL Error in CoffeeLotVarietals:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read ProcessingStyles table
app.get(`/api/processingstyles`, asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT process_id, process_name FROM ProcessingStyles
        ORDER BY process_id ASC
        `;
        const [processes] = await db.query(sql);

        return res.status(200).json(processes || []);
    } catch (err) {
        console.error("SQL Error in ProcessingStyles:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Read RoastTypes table
app.get('/api/roasttypes', asyncHandler(async (req, res) => {
    try {
        const sql = `
        SELECT roast_type_id, roast_name FROM RoastTypes
        ORDER BY roast_type_id ASC
        `;
        const [roastTypes] = await db.query(sql);

        return res.status(200).json(roastTypes || []);
    } catch (err) {
        console.error("SQL Error in RoastTypes:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// POST ROUTES

{/* Citation for use of AI Tools
Date: 03/02/26
Prompts used: 
    1. Explain escaping, string interpolation, and parameterized queries.
    2. Refactor snippet using parameterized queries.
    3. Explain why a stored procedure with OUT parameter does not return value to app like SELECT does.
AI Source: GitHub Copilot VSCode integration.
*/}

// Add a record to the Brew Results table (M:N Create)
app.post('/api/brewresults/', asyncHandler(async (req, res) => {
    try {
        const sql = `CALL sp_insert_brew_result(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            req.body.recipe_id,
            req.body.coffee_id,
            req.body.actual_dose,
            req.body.actual_yield,
            req.body.actual_grind_size,
            req.body.actual_water_temp,
            req.body.actual_brew_time,
            req.body.tds_reading,
            req.body.ext_yield,
            req.body.rating
        ];
        const result = await db.query(sql, values);

        // Get the newly added record and return it to frontend to render in table
        const added_result_sql = `SELECT
                result_id,
                BrewRecipes.recipe_id,
                Coffees.coffee_id,
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
            WHERE result_id = ${result[0][0][0]['result_id']}`
        const added_result = await db.query(added_result_sql);
        return res.status(201).json(added_result[0][0]);
    } catch (err) {
        console.error("SQL Error adding Brew Result:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Add a record to the Coffees table
app.post('/api/coffees/add', asyncHandler(async (req, res) => {
    try {
        const sql = `CALL sp_insert_coffee(?, ?, ?, ?)`
        const values = [
            req.body.coffee_name,
            req.body.roaster_id,
            req.body.roast_type_id,
            req.body.lot_id
        ];
        const result = await db.query(sql, values);

        // Get the added coffee
        const added_coffe_sql = `
            SELECT 
                coffee_id, 
                coffee_name,
                Roasters.roaster_name AS roaster,
                CoffeeLots.lot_number,
                RoastTypes.roast_name AS roast
            FROM Coffees
            INNER JOIN Roasters ON Coffees.roaster_id = Roasters.roaster_id
            INNER JOIN CoffeeLots ON Coffees.lot_id = CoffeeLots.lot_id
            INNER JOIN RoastTypes ON Coffees.roast_type_id = RoastTypes.roast_type_id
            WHERE Coffees.coffee_id = ${result[0][0][0]['coffee_id']}`
        const added_coffee_result = await db.query(added_coffe_sql);
        return res.status(200).json(added_coffee_result[0][0]);
    } catch (err){
        console.log("SQL error adding Coffee:", err.message)
        return res.send(500).json({error: err.message})
    }
}));

// Add a record to the CoffeeLotVarietals table (M:N Create)
app.post('/api/coffeelotvarietals', asyncHandler(async (req, res) => {
    try {
        const sql = "CALL sp_add_coffee_lot_varietal(?, ?)";
        const values = [
            req.body.lot_id,
            req.body.varietal_id
        ]
        await db.query(sql, values)
        return res.status(200).json({ message: "Coffee Lot Varietal record added successfully." });
    } catch (err) {
        console.log("SQL error adding CoffeeLotVarietals record:", err.message);
        return res.status(500).json({ error: err.message });
    }
}))

// Add a record to the CoffeeLot table
app.post('/api/coffeelots', asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const sql = "CALL sp_add_coffeelot(?, ?, ?, ?)";
        const values = [
            req.body.lot_number,
            req.body.location_id,
            req.body.meters_elevation,
            req.body.process_id
        ]
        await db.query(sql, values);
        return res.status(200).json({ message: "CoffeeLot record added successfully." });
    } catch (err) {
        console.log("SQL error adding CoffeeLot record:", err.message);
        return res.status(500).json({ error: err.message });
    }
}))

// Add a record to the Varietals table
app.post('/api/varietals', asyncHandler(async (req, res) => {
    try {
        const sql = `CALL sp_add_varietal(?)`;
        const values = [req.body.varietal_name];
        await db.query(sql, values);
        return res.status(200).json({ message: "Varietal record added successfully." });
    } catch (err) {
        console.log("SQL error adding CoffeeLotVarietals record:", err.message);
        return res.status(500).json({ error: err.message });
    }
}))


// Reset database
app.post('/api/reset-db', asyncHandler(async (req, res) => {
    try {
        const sql = "CALL sp_reset_db()";
        await db.query(sql);
        return res.status(200).json({ message: "Database reset successfully." });
    } catch (err) {
        console.error("SQL Error in Reset DB:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));


// PUT ROUTES

// Updates a Coffee Lot Varietal record (update on M:N with CoffeeLots and Varietals)
app.put('/api/coffeelotvarietals/:lot_id', asyncHandler( async(req,res) => {
    try {
        const sql = `CALL sp_update_coffee_lot_varietal(?, ?, ?, ?)`;
        const values = [
            req.params.lot_id,
            req.body.old_varietal_id,
            req.params.lot_id,
            req.body.new_varietal_id
        ];
        await db.query(sql, values);
        return res.status(200).json({ message: "Coffee lot varietal updated successfully." });
    } catch (err) {
        console.log("SQL error in sp_update_coffee_lot_varietals", err.message);
        return res.status(500).json({ error: err.message});
    }
}));

// Updates a brew recipe record. Cascades to brew results table
app.put('/api/brewrecipe/:recipe_id', asyncHandler( async (req, res) => {
    try {
        const sql = "CALL sp_update_brew_recipe(?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [
            req.params.recipe_id,
            req.body.brewer_id,
            req.body.target_dose,
            req.body.target_yield,
            req.body.target_grind_size,
            req.body.target_water_temp,
            req.body.target_brew_time,
            req.body.status_id
        ]
        const result = await db.query(sql, values);

        // Get updated recipe data
        const updated_recipe_sql = `
                SELECT
                recipe_id,
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
            WHERE BrewRecipes.recipe_id = ${result[0][0][0]['recipe_id']}
        `
        const updated_recipe_result = await db.query(updated_recipe_sql);
        res.status(200).json(updated_recipe_result[0][0]);
    } catch (err) {
        console.error("SQL error in update_brew_recipe:", err.message);
        res.status(500).json({ error: err.message });
    }
}));

// DELETE ROUTES

// Delete a record from the Coffee Lot Varietals table (Delete on M:N)
app.delete('/api/coffeelotvarietals/:lot_id/:varietal_id', asyncHandler(async (req, res) => {
    try{
        const sql = `CALL sp_delete_coffeelotvarietal(${req.params.lot_id}, ${req.params.varietal_id})`;
        await db.query(sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL error in sp_delete_coffeelotvarietal", err.message);
        return res.status(500).json({ error: err.message });
    }
}))

// Delete one brew result record from the table (Delete on M:N)
app.delete('/api/brewresults/:result_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_one_brew_result(${req.params.result_id})`;
        const query_result = await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in delete_one_brew_result:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Delete many brew result records from the table
app.delete('/api/brewresults/:recipe_id/:coffee_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_many_brew_results(${req.params.recipe_id}, ${req.params.coffee_id})`;
        await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in sp_delete_many_brew_results:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Delete one coffee record from the table. Cascades delete to brew results table
app.delete('/api/coffees/:coffee_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_coffee(${req.params.coffee_id})`;
        await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in sp_delete_coffee:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Delete one brew recipe record from the table. Cascades delete to brew results table
app.delete('/api/brewrecipes/:recipe_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_brew_recipe(${req.params.recipe_id})`;
        await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in sp_delete_brew_recipe:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Delete a coffee lot record. Cascades to CoffeeLotVarietals table
app.delete('/api/coffeelots/:lot_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_coffeelot(${req.params.lot_id})`;
        await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in sp_delete_coffeelot:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));

// Delete a varietal record. Cascades to CoffeeLotVarietals table
app.delete('/api/varietals/:varietal_id', asyncHandler(async (req, res) => {
    try {
        const call_sp_sql = `CALL sp_delete_varietal(${req.params.varietal_id})`;
        await db.query(call_sp_sql);
        return res.status(204).send();
    } catch (err) {
        console.error("SQL Error in sp_delete_varietal:", err.message);
        return res.status(500).json({ error: err.message });
    }
}));


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});