/* Roasters */
-- READ -- 
SELECT roaster_id, roaster_name, email, Locations.city, Locations.country
FROM Roasters
INNER JOIN Locations ON Roasters.location_id = Locations.location_id;

-- CREATE --
INSERT INTO Roasters (roaster_name, email, location_id)
VALUES (:roaster_name_input, :email_input, :location_id_from_dropdown);

-- Test query
INSERT INTO Roasters (roaster_name, email, location_id)
VALUES ('Test Roaster', 'test@test.com', 3);

-- UPDATE -- 
UPDATE Roasters
SET
	roaster_name = :new_roaster_name_input,
	email = :new_email_input,
	location_id = :new_location_id_from_dropdown
WHERE roaster_id = :roaster_id_to_update;

-- Test query
UPDATE Roasters
SET
	roaster_name = 'New Test Roaster Name',
	email = 'new_test@test.com',
	location_id = 1
WHERE roaster_id = 5;

-- DELETE --
DELETE FROM Roasters
WHERE roaster_id = :roaster_id_to_delete;

-- Test query
DELETE FROM Roasters
WHERE roaster_id = :roaster_id_to_delete;



/* RoastTypes */
--- READ --- 
SELECT * FROM RoastTypes;

-- CREATE --
INSERT INTO RoastTypes (roast_name) 
VALUES (:nameInput);

-- Test query
INSERT INTO RoastTypes (roast_name) 
VALUES ('French');

-- UPDATE -- 
UPDATE RoastTypes SET roast_name = :newNameInput 
WHERE roast__type_id = :roast_id_to_update;

-- Test query
UPDATE RoastTypes SET roast_name = 'City' 
WHERE roast_type_id = 5;

-- DELETE -- 
DELETE FROM RoastTypes WHERE roast_type_id = :roast_id_to_delete;

-- Test query
DELETE FROM RoastTypes WHERE roast_type_id = 5;



/* ProcessingStyles */
-- READ --
SELECT * FROM ProcessingStyles;

-- CREATE -- 
INSERT INTO ProcessingStyles (process_name)
VALUES (:nameInput);

-- Test query
INSERT INTO ProcessingStyles (process_name)
VALUES ('Yeast innoculated');

-- UPDATE --
UPDATE ProcessingStyles SET process_name = :newNameInput
WHERE process_id = :process_id_to_update;

-- Test query
UPDATE ProcessingStyles SET process_name = 'Co-fermented'
WHERE process_id = 5;

-- DELETE --
DELETE FROM ProcessingStyles WHERE process_id = :process_id_to_delete;

-- Test query
DELETE FROM ProcessingStyles WHERE process_id = 5;


/* BrewerTypes */
-- READ --
SELECT * FROM BrewerTypes;

-- CREATE -- 
INSERT INTO BrewerTypes (brewer_type) 
VALUES (:typeInput);

-- Test query
INSERT INTO BrewerTypes (brewer_type) 
VALUES ('April Hybrid');

-- UPDATE -- 
UPDATE BrewerTypes SET brewer_type = :newTypeInput
WHERE brewer_id = :brewer_id_to_update;

-- Test query
UPDATE BrewerTypes SET brewer_type = 'Origami'
WHERE brewer_id = 6;

-- DELETE -- 
DELETE FROM BrewerTypes WHERE brewer_id = :brewer_id_to_delete;

-- Test query
DELETE FROM BrewerTypes WHERE brewer_id = 6;


/* Locations */
-- READ --
SELECT * FROM Locations;

-- CREATE -- 
INSERT INTO Locations (city, country) 
VALUES (:typeInput, :typeInput);

-- Test query
INSERT INTO Locations (city, country) 
VALUES ('Los Angeles', 'USA');

-- UPDATE -- 
UPDATE Locations SET city = :newTypeInput, country = :newTypeInput
WHERE location_id = :location_id_to_update;

-- Test query
UPDATE Locations SET city = 'San Jose', country = 'USA'
WHERE location_id = 8;

-- DELETE --
DELETE FROM Locations WHERE location_id = :location_id_to_delete

-- Test query
DELETE FROM Locations WHERE location_id = 8;


/* Coffees */
-- READ --
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
INSERT INTO Coffees (coffee_name, roaster_id, lot_id, roast_type_id)
VALUES (
	:coffee_name_input,
	:roaster_id_from_dropdown,
	:lot_id_from_dropdown,
	:roast_type_id_from_dropdown
);

-- Test query
INSERT INTO Coffees (coffee_name, roaster_id, lot_id, roast_type_id)
VALUES (
	'New Coffee',
	1,
	3,
	2
);

-- UPDATE -- 
UPDATE Coffees 
SET
	coffee_name = :new_coffee_name_input,
	roaster_id = :new_roaster_id_from_dropdown,
	lot_id = :new_lot_id_from_dropdown,
	roaster_type_id = :new_roast_type_from_dropdown
WHERE coffee_id = :coffee_id_to_update;

-- Test query
UPDATE Coffees 
SET
	coffee_name = 'Updated Coffee Name',
	roaster_id = 1,
	lot_id = 3,
	roast_type_id = 3
WHERE coffee_id = 6;

-- DELETE --
DELETE FROM Coffees
WHERE coffee_id = 6;



/* Varietals */
-- READ --
SELECT * FROM Varietals;

-- CREATE -- 
INSERT INTO Varietals (varietal_name) 
VALUES (:typeInput);

-- Test query
INSERT INTO Varietals (varietal_name) 
VALUES ('Ethiopian landrace');

-- UPDATE -- 
UPDATE Varietals SET varietal_name = :newTypeInput
WHERE varietal_id = :varietal_id_to_update;

-- Test query
UPDATE Varietals SET varietal_name = 'Ethiopia landrace'
WHERE varietal_id = 10;

-- DELETE -- 
DELETE FROM Varietals WHERE varietal_id = :varietal_id_to_delete;

-- Test query
DELETE FROM Varietals WHERE varietal_id = 10;


/* CoffeeLots */
-- READ --
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

-- Test query
INSERT INTO CoffeeLots (lot_number, location_id, meters_elevation, process_id) 
VALUES (
    '123456',
    4,
    1625,
    1
);

-- UPDATE --
UPDATE CoffeeLots SET 
    lot_number = :lot_number_input,
    location_id = :location_id_from_dropdown,
    meters_elevation = :meters_elevation_input,
    process_id = :process_id_from_dropdown
WHERE lot_id = :lot_id_to_update;

-- Test query
UPDATE CoffeeLots SET 
    lot_number = '1200',
    location_id = 4,
    meters_elevation = 1650,
    process_id = 1
WHERE lot_id = 6;

-- DELETE -- 
DELETE FROM CoffeeLots WHERE lot_id = :lot_id_to_update;

-- Test query
DELETE FROM CoffeeLots WHERE lot_id = 6;



/* CoffeeLotVarietals */
-- READ --
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

-- Test query
INSERT INTO CoffeeLotVarietals (lot_id, varietal_id)
VALUES (
	5,
	5
);

-- UPDATE -- This is giving duplicate entry syntax error
UPDATE CoffeeLotVarietals
SET
	lot_id = new_lot_id_from_dropdown,
	varietal_id = new_varietal_id_from_dropdown
WHERE lot_id = :lot_id_to_update AND varietal_id_to_update;

-- DELETE --
DELETE FROM CoffeeLotVarietals
WHERE lot_id = :lot_id_to_delete AND varietal_id = :varietal_id_to_delete;

-- Test query
DELETE FROM CoffeeLotVarietals
WHERE lot_id = 5 AND varietal_id = 8;



/* BrewRecipes */
-- READ --
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

-- Test query
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
	2,
	13,
	200,
	14.5,
	95,
	'00:02:30',
	2
);

-- UPDATE -- 
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

-- Test query
UPDATE BrewRecipes
SET
	brewer_id = 2,
	target_dose = 12,
	target_yield = 200,
	target_grind_size = 14,
	target_water_temp = 95,
	target_brew_time = '00:02:15',
	status_id = 1
WHERE recipe_id = 5;

-- DELETE -- 
DELETE FROM BrewRecipes WHERE recipe_id = :recipe_id_to_delete;

-- Test query
DELETE FROM BrewRecipes WHERE recipe_id = 5;

/* BrewResults */
-- READ --
SELECT
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
INNER JOIN Locations ON CoffeeLots.location_id = Locations.location_id
INNER JOIN Roasters ON Coffees.roaster_id = Roasters.roaster_id
INNER JOIN BrewRecipes ON BrewResults.recipe_id = BrewRecipes.recipe_id
INNER JOIN RecipeStatuses ON BrewRecipes.status_id = RecipeStatuses.status_id
INNER JOIN BrewerTypes ON BrewRecipes.brewer_id = BrewerTypes.brewer_id;

-- CREATE -- 
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
    :coffee_id_input,
    :recipe_id_input,
    :actual_dose_input,
    :actual_yield_input,
    :actual_grind_size_input,
    :actual_water_temp_input,
    :actual_brew_time_input,
    :tds_reading_input,
    :computed_ext_yield,
    :rating_input
)

-- Test query
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
    2,
    3,
    14.9,
    242.25,
    10.00,
    94.30,
    '00:03:48',
    1.44,
    ROUND((1.44 * 242.25) / 14.9, 2),
    4
);

-- UPDATE --
UPDATE BrewResults
SET
    coffee_id = :coffee_id_input,
    recipe_id = :recipe_id_input,
    actual_dose = :actual_dose_input,
    actual_yield = :actual_yield_input,
    actual_grind_size = :actual_grind_size_input,
    actual_water_temp = :actual_water_temp_input,
    actual_brew_time = :actual_brew_time_input,
    tds_reading = :tds_reading_input,
    ext_yield = :computed_ext_yield,
    :rating_input
WHERE result_id = :result_id_to_update;

-- Test query
UPDATE BrewResults
SET
    coffee_id = 2,
    recipe_id = 3,
    actual_dose = 14.9,
    actual_yield = 242.25,
    actual_grind_size = 10.00,
    actual_water_temp = 94.30,
    actual_brew_time = '00:03:52',
    tds_reading = 1.54,
    ext_yield = ROUND((1.54 * 242.25) / 14.9, 2),
    rating = 5
WHERE result_id = 6; 

-- DELETE -- 
DELETE FROM BrewResults WHERE result_id = :result_id_to_delete;

-- Test query
DELETE FROM BrewResults WHERE result_id = 6;
