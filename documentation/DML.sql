-- Authors: Ian Henderson & Nicholas Park
-- Group 12: Socal Schemas


-- Citation for following code:
-- Date: 02/12/26
-- Queries and user input representation adapted from bsg_sample_data_manipulation_queries.sql
-- Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323336?module_item_id=26243423


-- CUD implementation are on the listed entities below. Read implemented for all entities.
-- Leaving in non-implemented CUD queries per Lindsey Clement, ULA, recc, and for future development.
-- CUD entities:
-- -- CREATE:
-- -- -- Coffees - M:N relationship with BrewRecipes
-- -- -- BrewResults - also acts as intersection table that resolves M:N between Coffees and BrewRecipes
-- -- UPDATE: 
-- -- -- BrewRecipes (M:N with Coffees)
-- -- DELETE: 
-- -- -- Coffees (M:N with BrewRecipes) 
-- -- -- BrewRecipes (M:N with Coffees)
-- -- -- BrewResults

-- User inputs are denoted with the character : 


/* Roasters */
-- READ -- for populating Roasters page; join with Locations for better UX
SELECT roaster_id, roaster_name, email, Locations.city, Locations.country
FROM Roasters
INNER JOIN Locations ON Roasters.location_id = Locations.location_id;

-- CREATE --
INSERT INTO Roasters (roaster_name, email, location_id)
VALUES (:roaster_name_input, :email_input, :location_id_from_dropdown);

-- UPDATE -- 
UPDATE Roasters
SET
	roaster_name = :new_roaster_name_input,
	email = :new_email_input,
	location_id = :new_location_id_from_dropdown
WHERE roaster_id = :roaster_id_to_update;

-- DELETE --
DELETE FROM Roasters
WHERE roaster_id = :roaster_id_to_delete;


/* RoastTypes */
--- READ --- to populate Roast Types page 
SELECT roast_type_id, roast_name 
FROM RoastTypes;

-- CREATE --
INSERT INTO RoastTypes (roast_name) 
VALUES (:nameInput);

-- UPDATE -- 
UPDATE RoastTypes SET roast_name = :newNameInput 
WHERE roast__type_id = :roast_id_to_update;

-- DELETE -- 
DELETE FROM RoastTypes WHERE roast_type_id = :roast_id_to_delete;


/* ProcessingStyles */
-- READ -- to populate the Processing Styles page
SELECT process_id, process_name
FROM ProcessingStyles;

-- CREATE -- 
INSERT INTO ProcessingStyles (process_name)
VALUES (:nameInput);

-- UPDATE --
UPDATE ProcessingStyles SET process_name = :newNameInput
WHERE process_id = :process_id_to_update;

-- DELETE --
DELETE FROM ProcessingStyles WHERE process_id = :process_id_to_delete;


/* BrewerTypes */
-- READ -- to populate the Brewer Types page
SELECT brewer_id, brewer_type
FROM BrewerTypes;

-- CREATE -- 
INSERT INTO BrewerTypes (brewer_type) 
VALUES (:typeInput);

-- UPDATE -- 
UPDATE BrewerTypes SET brewer_type = :newTypeInput
WHERE brewer_id = :brewer_id_to_update;

-- DELETE -- 
DELETE FROM BrewerTypes WHERE brewer_id = :brewer_id_to_delete;


/* Locations */
-- READ -- to populate the Locations page
SELECT location_id, city, country 
FROM Locations;

-- CREATE -- 
INSERT INTO Locations (city, country) 
VALUES (:typeInput, :typeInput);

-- UPDATE -- 
UPDATE Locations SET city = :newTypeInput, country = :newTypeInput
WHERE location_id = :location_id_to_update;

-- DELETE --
DELETE FROM Locations WHERE location_id = :location_id_to_delete


/* Coffees */
-- READ -- 
-- to populate the Coffees page; join with Roasters, CoffeeLots, and RoastTypes
-- in order to present pertinent origin and roast information to user
SELECT 
	coffee_id, 
	coffee_name,
	Roasters.roaster_name AS roaster,
	CoffeeLots.lot_number,
	RoastTypes.roast_name AS roast
FROM Coffees
INNER JOIN Roasters ON Coffees.roaster_id = Roasters.roaster_id
INNER JOIN CoffeeLots ON Coffees.lot_id = CoffeeLots.lot_id
INNER JOIN RoastTypes ON Coffees.roast_type_id = RoastTypes.roast_type_id;

-- CREATE -- 
-- add a coffee to the database (M:N relationship addition)
INSERT INTO Coffees (coffee_name, roaster_id, lot_id, roast_type_id)
VALUES (
	:coffee_name_input,
	:roaster_id_from_dropdown,
	:lot_id_from_dropdown,
	:roast_type_id_from_dropdown
);

-- UPDATE -- 
UPDATE Coffees 
SET
	coffee_name = :new_coffee_name_input,
	roaster_id = :new_roaster_id_from_dropdown,
	lot_id = :new_lot_id_from_dropdown,
	roaster_type_id = :new_roast_type_from_dropdown
WHERE coffee_id = :coffee_id_to_update;

-- DELETE --
-- disassociate a Coffee from a Brew Method (M:N relationship deletion) with CASCADE
DELETE FROM Coffees
WHERE coffee_id = :coffee_id_to_delete;



/* Varietals */
-- READ -- for populating the Varietals page
SELECT varietal_id, varietal_name 
FROM Varietals;

-- CREATE -- 
INSERT INTO Varietals (varietal_name) 
VALUES (:typeInput);

-- UPDATE -- 
UPDATE Varietals SET varietal_name = :newTypeInput
WHERE varietal_id = :varietal_id_to_update;

-- DELETE -- 
DELETE FROM Varietals WHERE varietal_id = :varietal_id_to_delete;

/* CoffeeLots */
-- READ -- for populating the CoffeeLots page
SELECT
	lot_id,
	lot_number,
	Locations.city AS city,
	Locations.country AS country,
	meters_elevation,
	ProcessingStyles.process_name AS process
FROM CoffeeLots
INNER JOIN Locations ON CoffeeLots.location_id = Locations.location_id
INNER JOIN ProcessingStyles ON CoffeeLots.process_id = ProcessingStyles.process_id;

-- CREATE -- 
INSERT INTO CoffeeLots (lot_number, location_id, meters_elevation, process_id) 
VALUES (
    :lot_number_input,
    :location_id_from_dropdown,
    :meters_elevation_input,
    :process_id_from_dropdown
);

-- UPDATE --
UPDATE CoffeeLots SET 
    lot_number = :lot_number_input,
    location_id = :location_id_from_dropdown,
    meters_elevation = :meters_elevation_input,
    process_id = :process_id_from_dropdown
WHERE lot_id = :lot_id_to_update;

-- DELETE -- 
DELETE FROM CoffeeLots WHERE lot_id = :lot_id_to_update;


/* CoffeeLotVarietals */
-- READ -- for populating the CoffeeLotVarietals page
-- joins CoffeeLots and Varietals to FKs as user-friendly names
SELECT CoffeeLots.lot_number, Varietals.varietal_name
FROM CoffeeLotVarietals
INNER JOIN CoffeeLots ON CoffeeLotVarietals.lot_id = CoffeeLots.lot_id
INNER JOIN Varietals ON CoffeeLotVarietals.varietal_id = Varietals.varietal_id;

-- CREATE --
INSERT INTO CoffeeLotVarietals (lot_id, varietal_id)
VALUES (
	:lot_id_from_dropdown,
	:varietal_id_from_dropdown
);

-- UPDATE --
UPDATE CoffeeLotVarietals
SET
	lot_id = new_lot_id_from_dropdown,
	varietal_id = new_varietal_id_from_dropdown
WHERE lot_id = :lot_id_to_update AND varietal_id_to_update;

-- DELETE --
DELETE FROM CoffeeLotVarietals
WHERE lot_id = :lot_id_to_delete AND varietal_id = :varietal_id_to_delete;


/* BrewRecipes */
-- READ -- for populating the BrewRecipes page
-- joins BrewerTypes and RecipeStatuses to display FKs for user-friendly names
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
INNER JOIN RecipeStatuses ON BrewRecipes.status_id = RecipeStatuses.status_id;

-- CREATE --
INSERT INTO BrewRecipes (
    brewer_id,
    target_dose, 
    target_yield, 
    target_grind_size, 
    target_water_temp, 
    target_brew_time, 
    status_id
)
VALUES (
	brewer_id = :brewer_id_from_dropdown,
	target_dose = :target_dose_input,
	yield_input = :yield_input,
	grind_size_input = :grind_size_input,
	water_temp_input = :water_temp_input,
	brew_time_input = :brew_time_input,
	status_id = :status_id_from_dropdown
);

-- UPDATE -- update a brew recipe's data based on submission of Edit Brew Recipe form
-- (M:N relationship update with CASCADE)
UPDATE BrewRecipes
SET
	brewer_id = :new_brewer_id_from_dropdown,
	target_dose = :new_target_dose_input,
	target_yield = :new_yield_input,
	target_grind_size = new_grind_size_input,
	target_water_temp = new_water_temp_input,
	target_brew_time = new_brew_time_input,
	status_id = new_status_id_from_dropdown
WHERE recipe_id = :recipe_id_to_update;

-- DELETE -- 
DELETE FROM BrewRecipes WHERE recipe_id = :recipe_id_to_delete;

/* BrewResults */
-- READ -- for populating the Brew Results page
-- joins multiple tables to present FKs as user-friendly names
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
INNER JOIN BrewerTypes ON BrewRecipes.brewer_id = BrewerTypes.brewer_id;

-- CREATE -- associate a Coffee with a BrewRecipe via form submission
-- (M:N relationship addition)
INSERT INTO BrewResults (
    coffee_id,
    recipe_id,
    actual_dose,
    actual_yield,
    actual_grind_size,
    actual_water_temp,
    actual_brew_time,
    tds_reading,
    ext_yield,
    rating
)
VALUES (
    :coffee_id_dropdown_input,
    :recipe_id_dropdown_input,
    :actual_dose_input,
    :actual_yield_input,
    :actual_grind_size_input,
    :actual_water_temp_input,
    :actual_brew_time_input,
    :tds_reading_input,
    :computed_ext_yield,
    :rating_input
)

-- UPDATE --
UPDATE BrewResults
SET
    coffee_id = :coffee_id_dropdown_input,
    recipe_id = :recipe_id_dropdown_input,
    actual_dose = :actual_dose_input,
    actual_yield = :actual_yield_input,
    actual_grind_size = :actual_grind_size_input,
    actual_water_temp = :actual_water_temp_input,
    actual_brew_time = :actual_brew_time_input,
    tds_reading = :tds_reading_input,
    ext_yield = :computed_ext_yield,
    :rating_input
WHERE result_id = :result_id_to_update;

-- DELETE -- delete a Brew Result
DELETE FROM BrewResults WHERE result_id = :result_id_to_delete;

-- DELETE -- disassociate a Coffee from a BrewRecipe (M:N relationship deletion)
DELETE FROM BrewResults WHERE coffee_id 
= :coffee_id_from_coffee_brew_results AND recipe_id
= :brew_recipes_from_brew_results;