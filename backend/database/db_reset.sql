DROP PROCEDURE IF EXISTS sp_reset_db;

DELIMITER / /

CREATE PROCEDURE sp_reset_db()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;

    -- Drop all tables
    DROP TABLE IF EXISTS `CoffeeLotVarietals`;
    DROP TABLE IF EXISTS `BrewResults`;
    DROP TABLE IF EXISTS `BrewRecipes`;
    DROP TABLE IF EXISTS `Coffees`;
    DROP TABLE IF EXISTS `Roasters`;
    DROP TABLE IF EXISTS `CoffeeLots`;
    DROP TABLE IF EXISTS `Locations`;
    DROP TABLE IF EXISTS `ProcessingStyles`;
    DROP TABLE IF EXISTS `RoastTypes`;
    DROP TABLE IF EXISTS `Varietals`;
    DROP TABLE IF EXISTS `BrewerTypes`;
    DROP TABLE IF EXISTS `RecipeStatuses`;

    -- Recreate Tables
    CREATE TABLE `BrewerTypes` (
        `brewer_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `brewer_type` VARCHAR(50) NOT NULL
    );

    CREATE TABLE `RecipeStatuses` (
        `status_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `status_type` VARCHAR(10) NOT NULL
    );

    CREATE TABLE `Locations` (
        `location_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `city` VARCHAR(50) NOT NULL,
        `country` VARCHAR(50) NOT NULL
    );

    CREATE TABLE `ProcessingStyles` (
        `process_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `process_name` VARCHAR(50) NOT NULL
    );

    CREATE TABLE `RoastTypes` (
        `roast_type_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `roast_name` VARCHAR(50) NOT NULL
    );

    CREATE TABLE `Varietals` (
        `varietal_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `varietal_name` VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE `CoffeeLots` (
        `lot_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `lot_number` VARCHAR(50) NOT NULL,
        `location_id` INT(11) NOT NULL,
        `meters_elevation` INT(11) NOT NULL,
        `process_id` INT(11) NOT NULL,
        FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`process_id`) REFERENCES `ProcessingStyles` (`process_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE `Roasters` (
        `roaster_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `roaster_name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `location_id` INT(11) NOT NULL,
        FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE `Coffees` (
        `coffee_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `coffee_name` VARCHAR(50) NOT NULL,
        `roaster_id` int(11) NOT NULL,
        `roast_type_id` INT(11) NOT NULL,
        `lot_id` INT(11) NOT NULL,
        FOREIGN KEY (`roaster_id`) REFERENCES `Roasters` (`roaster_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`roast_type_id`) REFERENCES `RoastTypes` (`roast_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`lot_id`) REFERENCES `CoffeeLots` (`lot_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE `BrewRecipes` (
        `recipe_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `brewer_id` INT(11) NOT NULL,
        `target_dose` DECIMAL(5,2) NOT NULL,
        `target_yield` DECIMAL(6,2) NOT NULL,
        `target_grind_size` DECIMAL(4,2) NOT NULL,
        `target_water_temp` DECIMAL(5,2) NOT NULL,
        `target_brew_time` TIME NOT NULL,
        `status_id` INT(11) NOT NULL,
        FOREIGN KEY (`brewer_id`) REFERENCES `BrewerTypes` (`brewer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`status_id`) REFERENCES `RecipeStatuses` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE `BrewResults` (
        `result_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `coffee_id` INT(11) NOT NULL,
        `recipe_id` INT(11) NOT NULL,
        `actual_dose` DECIMAL(5,2) NOT NULL,
        `actual_yield` DECIMAL(6,2) NOT NULL,
        `actual_grind_size` DECIMAL(4,2) NOT NULL,
        `actual_water_temp` DECIMAL(5,2) NOT NULL,
        `actual_brew_time` TIME NOT NULL,
        `tds_reading` DECIMAL(3,2) NOT NULL,
        `ext_yield` DECIMAL(4,2) NOT NULL,
        `rating` INT(11) NOT NULL,
        FOREIGN KEY (`coffee_id`) REFERENCES `Coffees` (`coffee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`recipe_id`) REFERENCES `BrewRecipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE `CoffeeLotVarietals` (
        `lot_id` INT(11) NOT NULL,
        `varietal_id` INT(11) NOT NULL,
        PRIMARY KEY (`lot_id`, `varietal_id`),
        FOREIGN KEY (`lot_id`) REFERENCES `CoffeeLots` (`lot_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (`varietal_id`) REFERENCES `Varietals` (`varietal_id`) ON DELETE CASCADE ON UPDATE CASCADE
    );


    -- Insert sample data
    INSERT INTO `BrewerTypes` (`brewer_type`) 
    VALUES 
        ('Fetco'), 
        ('April'), 
        ('Kalita Wave'), 
        ('Chemex'), 
        ('V60');

    INSERT INTO `RecipeStatuses` (`status_type`) 
    VALUES 
        ('Active'), 
        ('Testing'), 
        ('Retired');

    INSERT INTO `Locations` (`city`, `country`) 
    VALUES 
        ('Portland', 'USA'), 
        ('Denver', 'USA'), 
        ('Copenhagen', 'DNK'), 
        ('Nyeri', 'KEN'), 
        ('Santa Barbara', 'HND'), 
        ('Loja', 'ECU'), 
        ('Cajamarca', 'PER');

    INSERT INTO `ProcessingStyles` (`process_name`) 
    VALUES 
        ('Washed'), 
        ('Anaerobic'), 
        ('Natural'), 
        ('Honey');

    INSERT INTO `RoastTypes` (`roast_name`) 
    VALUES 
        ('Light'), 
        ('Medium'), 
        ('Espresso'), 
        ('Dark');

    INSERT INTO `Varietals` (`varietal_name`) 
    VALUES 
        ('Pink Bourbon'), 
        ('Riuri 11'), 
        ('SL28'), 
        ('SL34'), 
        ('Loja'), 
        ('Ecuador'), 
        ('Typica'), 
        ('Sidra'), 
        ('Pacas');
    
    INSERT INTO `CoffeeLots` (`lot_number`, `location_id`, `meters_elevation`, `process_id`) 
    VALUES 
        ('10246', 4, 1600, 1), 
        ('05229', 6, 1775, 2), 
        ('1123', 5, 1820, 1), 
        ('05215', 5, 1700, 3), 
        ('10246', 7, 1950, 1);

    INSERT INTO `Roasters` (`roaster_name`, `email`, `location_id`) 
    VALUES 
        ('Heart', 'wholesale@heartroasters.com', 1), 
        ('Prodigal', 'wholesale@prodigalcoffee.com', 2), 
        ('Coffee Collective', 'coffee@coffeecollective.dk', 3), 
        ('Prolog', 'wholesale@prologcoffee.com', 3);

    INSERT INTO `Coffees` (`coffee_name`, `roaster_id`, `roast_type_id`, `lot_id`) 
    VALUES 
        ('Gichathaini', 3, 1, 1), 
        ('Vinka', 2, 1, 2), 
        ('Ramon Hernandez', 1, 2, 3), 
        ('Stereo', 1, 3, 4),
        ('Tres de Mayo', 2, 3, 5);

    INSERT INTO `BrewRecipes` (`brewer_id`, `target_dose`, `target_yield`, `target_grind_size`, `target_water_temp`, `target_brew_time`, `status_id`) 
    VALUES 
        (1, 120.50, 1700.00, 14.00, 96.00, '00:06:00', 1), 
        (2, 15.00, 240.00, 12.00, 92.00, '00:02:30', 1), 
        (3, 15.00, 240.00, 10.00, 94.00, '00:03:30', 2), 
        (4, 45.00, 720.00, 12.50, 96.00, '00:05:00', 2);

    INSERT INTO `BrewResults` (`coffee_id`, `recipe_id`, `actual_dose`, `actual_yield`, `actual_grind_size`, `actual_water_temp`, `actual_brew_time`, `tds_reading`, `ext_yield`, `rating`) 
    VALUES 
        (3, 1, 120.50, 1623.50, 13.75, 95.50, '00:05:50', 1.54, 20.75, 3), 
        (1, 2, 15.10, 247.65, 12.00, 92.30, '00:02:29', 1.34, 21.98, 4), 
        (2, 3, 15.00, 239.75, 10.00, 94.23, '00:03:45', 1.44, 23.02, 5), 
        (2, 2, 15.00, 241.25, 12.00, 92.50, '00:02:33', 1.54, 24.77, 3), 
        (1, 1, 120.50, 1654.25, 14.00, 95.75, '00:06:05', 1.42, 19.49, 2);

    INSERT INTO `CoffeeLotVarietals` (`lot_id`, `varietal_id`) 
    VALUES 
        (1, 2), 
        (1, 3), 
        (1, 4), 
        (2, 5), 
        (2, 8), 
        (3, 9), 
        (4, 7), 
        (4, 9), 
        (5, 7);

    SET FOREIGN_KEY_CHECKS = 1;
END //

DELIMITER;