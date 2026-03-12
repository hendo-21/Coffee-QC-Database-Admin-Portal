-- Ian Henderson, Nicholas Park 
-- CS340 Group 12: SoCal Schemas
-- California Coffee Co.

-- phpMyAdmin SQL Dump
-- version 5.2.3-1.el9.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 28, 2026 at 09:12 PM
-- Server version: 10.11.15-MariaDB-log
-- PHP Version: 8.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

--
-- Database: `cs340_parknic`
--

DELIMITER $$
--
-- Stored Procedures
--
DROP PROCEDURE IF EXISTS `sp_delete_brew_recipe`$$
CREATE PROCEDURE `sp_delete_brew_recipe` (IN `p_recipe_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Delete error!' AS result;
        ROLLBACK;
    END;

    START TRANSACTION;
        DELETE FROM BrewRecipes WHERE recipe_id = p_recipe_id;

    -- Return recipe_id of deleted record to rerender
    SELECT p_recipe_id AS deleted_recipe_id;

    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_delete_coffee`$$
CREATE PROCEDURE `sp_delete_coffee` (IN `p_coffee_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Delete error!' AS result;
        ROLLBACK;
    END;

    START TRANSACTION;
        DELETE FROM Coffees WHERE coffee_id = p_coffee_id;

    -- Return deleted ID to re-render table
    SELECT p_coffee_id AS deleted_coffee_id;

    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_delete_many_brew_results`$$
CREATE PROCEDURE `sp_delete_many_brew_results` (IN `p_recipe_id` INT, IN `p_coffee_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Bulk delete error!' AS result;
        ROLLBACK;
    END;

    START TRANSACTION;
        DELETE FROM BrewResults 
        WHERE recipe_id = p_recipe_id AND 
        coffee_id = p_coffee_id;

    -- Return recipe_id and coffee_id of deleted to rerender table
    SELECT p_recipe_id, p_coffee_id AS bulk_delete_result;

    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_delete_one_brew_result`$$
CREATE PROCEDURE `sp_delete_one_brew_result` (IN `p_result_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Delete error!' AS result;
        ROLLBACK;
    END;

    START TRANSACTION;
        DELETE FROM BrewResults WHERE result_id = p_result_id;

    SELECT p_result_id AS deleted_result_id;

    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_insert_brew_result`$$
CREATE PROCEDURE `sp_insert_brew_result` (IN `recipe_id` INT, IN `coffee_id` INT, IN `actual_dose` DECIMAL(5,2), IN `actual_yield` DECIMAL(6,2), IN `actual_grind_size` DECIMAL(4,2), IN `actual_water_temp` DECIMAL(5,2), IN `actual_brew_time` TIME, IN `tds_reading` DECIMAL(3,2), IN `ext_yield` DECIMAL(4,2), IN `rating` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- In case of an error, set the result_id to -99
        SET -99 AS result_id;
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO BrewResults (
        recipe_id,
        coffee_id,
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
        recipe_id,
        coffee_id,
        actual_dose,
        actual_yield,
        actual_grind_size,
        actual_water_temp,
        actual_brew_time,
        tds_reading,
        ext_yield,
        rating
    );

    SELECT LAST_INSERT_ID() AS result_id;
    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_insert_coffee`$$
CREATE PROCEDURE `sp_insert_coffee` (IN `p_coffee_name` VARCHAR(50), IN `p_roaster_id` INT, IN `p_roast_type_id` INT, IN `p_lot_id` INT)   BEGIN
    DECLARE new_coffee_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Error!' AS result;
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO Coffees (
        coffee_name,
        roaster_id,
        roast_type_id,
        lot_id
    )
    VALUES (
        p_coffee_name,
        p_roaster_id,
        p_roast_type_id,
        p_lot_id
    );
    
    -- Return the new record so that React can render at bottom of table
    SET new_coffee_id = LAST_INSERT_ID();
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
    WHERE Coffees.coffee_id = new_coffee_id;

    COMMIT;
END$$

DROP PROCEDURE IF EXISTS `sp_reset_db`$$
CREATE PROCEDURE `sp_reset_db` ()   BEGIN
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
END$$

DROP PROCEDURE IF EXISTS `sp_update_brew_recipe`$$
CREATE PROCEDURE `sp_update_brew_recipe` (IN `p_recipe_id` INT, IN `p_brewer_id` INT, IN `p_target_dose` DECIMAL(5,2), IN `p_target_yield` DECIMAL(6,2), IN `p_target_grind_size` DECIMAL(4,2), IN `p_target_water_temp` DECIMAL(5,2), IN `p_target_brew_time` TIME, IN `p_status_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Update error!' AS result;
        ROLLBACK;
    END;
    
    START TRANSACTION;
        UPDATE BrewRecipes
        SET
            brewer_id = p_brewer_id,
            target_dose = p_target_dose,
            target_yield = p_target_yield,
            target_grind_size = p_target_grind_size,
            target_water_temp = p_target_water_temp,
            target_brew_time = p_target_brew_time,
            status_id = p_status_id
        WHERE recipe_id = p_recipe_id;
    
    -- Return the updated recipe for React to render
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
        WHERE BrewRecipes.recipe_id = p_recipe_id;
    
    COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `BrewerTypes`
--

DROP TABLE IF EXISTS `BrewerTypes`;
CREATE TABLE `BrewerTypes` (
  `brewer_id` int(11) NOT NULL,
  `brewer_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BrewerTypes`
--

INSERT INTO `BrewerTypes` (`brewer_id`, `brewer_type`) VALUES
(1, 'Fetco'),
(2, 'April'),
(3, 'Kalita Wave'),
(4, 'Chemex'),
(5, 'V60');

-- --------------------------------------------------------

--
-- Table structure for table `BrewRecipes`
--

DROP TABLE IF EXISTS `BrewRecipes`;
CREATE TABLE `BrewRecipes` (
  `recipe_id` int(11) NOT NULL,
  `brewer_id` int(11) NOT NULL,
  `target_dose` decimal(5,2) NOT NULL,
  `target_yield` decimal(6,2) NOT NULL,
  `target_grind_size` decimal(4,2) NOT NULL,
  `target_water_temp` decimal(5,2) NOT NULL,
  `target_brew_time` time NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BrewRecipes`
--

INSERT INTO `BrewRecipes` (`recipe_id`, `brewer_id`, `target_dose`, `target_yield`, `target_grind_size`, `target_water_temp`, `target_brew_time`, `status_id`) VALUES
(1, 1, 120.50, 1700.00, 14.00, 96.00, '00:06:00', 1),
(2, 2, 15.00, 240.00, 12.00, 92.00, '00:02:30', 1),
(3, 3, 15.00, 240.00, 10.00, 94.00, '00:03:30', 2),
(4, 4, 45.00, 720.00, 12.50, 96.00, '00:05:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `BrewResults`
--

DROP TABLE IF EXISTS `BrewResults`;
CREATE TABLE `BrewResults` (
  `result_id` int(11) NOT NULL,
  `coffee_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `actual_dose` decimal(5,2) NOT NULL,
  `actual_yield` decimal(6,2) NOT NULL,
  `actual_grind_size` decimal(4,2) NOT NULL,
  `actual_water_temp` decimal(5,2) NOT NULL,
  `actual_brew_time` time NOT NULL,
  `tds_reading` decimal(3,2) NOT NULL,
  `ext_yield` decimal(4,2) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `BrewResults`
--

INSERT INTO `BrewResults` (`result_id`, `coffee_id`, `recipe_id`, `actual_dose`, `actual_yield`, `actual_grind_size`, `actual_water_temp`, `actual_brew_time`, `tds_reading`, `ext_yield`, `rating`) VALUES
(1, 3, 1, 120.50, 1623.50, 13.75, 95.50, '00:05:50', 1.54, 20.75, 3),
(2, 1, 2, 15.10, 247.65, 12.00, 92.30, '00:02:29', 1.34, 21.98, 4),
(3, 2, 3, 15.00, 239.75, 10.00, 94.23, '00:03:45', 1.44, 23.02, 5),
(4, 2, 2, 15.00, 241.25, 12.00, 92.50, '00:02:33', 1.54, 24.77, 3),
(5, 1, 1, 120.50, 1654.25, 14.00, 95.75, '00:06:05', 1.42, 19.49, 2);

-- --------------------------------------------------------

--
-- Table structure for table `CoffeeLots`
--

DROP TABLE IF EXISTS `CoffeeLots`;
CREATE TABLE `CoffeeLots` (
  `lot_id` int(11) NOT NULL,
  `lot_number` varchar(50) NOT NULL,
  `location_id` int(11) NOT NULL,
  `meters_elevation` int(11) NOT NULL,
  `process_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CoffeeLots`
--

INSERT INTO `CoffeeLots` (`lot_id`, `lot_number`, `location_id`, `meters_elevation`, `process_id`) VALUES
(1, '10246', 4, 1600, 1),
(2, '05229', 6, 1775, 2),
(3, '1123', 5, 1820, 1),
(4, '05215', 5, 1700, 3),
(5, '10246', 7, 1950, 1);

-- --------------------------------------------------------

--
-- Table structure for table `CoffeeLotVarietals`
--

DROP TABLE IF EXISTS `CoffeeLotVarietals`;
CREATE TABLE `CoffeeLotVarietals` (
  `lot_id` int(11) NOT NULL,
  `varietal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CoffeeLotVarietals`
--

INSERT INTO `CoffeeLotVarietals` (`lot_id`, `varietal_id`) VALUES
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 8),
(3, 9),
(4, 7),
(4, 9),
(5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Coffees`
--

DROP TABLE IF EXISTS `Coffees`;
CREATE TABLE `Coffees` (
  `coffee_id` int(11) NOT NULL,
  `coffee_name` varchar(50) NOT NULL,
  `roaster_id` int(11) NOT NULL,
  `roast_type_id` int(11) NOT NULL,
  `lot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Coffees`
--

INSERT INTO `Coffees` (`coffee_id`, `coffee_name`, `roaster_id`, `roast_type_id`, `lot_id`) VALUES
(1, 'Gichathaini', 3, 1, 1),
(2, 'Vinka', 2, 1, 2),
(3, 'Ramon Hernandez', 1, 2, 3),
(4, 'Stereo', 1, 3, 4),
(5, 'Tres de Mayo', 2, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Locations`
--

DROP TABLE IF EXISTS `Locations`;
CREATE TABLE `Locations` (
  `location_id` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`location_id`, `city`, `country`) VALUES
(1, 'Portland', 'USA'),
(2, 'Denver', 'USA'),
(3, 'Copenhagen', 'DNK'),
(4, 'Nyeri', 'KEN'),
(5, 'Santa Barbara', 'HND'),
(6, 'Loja', 'ECU'),
(7, 'Cajamarca', 'PER');

-- --------------------------------------------------------

--
-- Table structure for table `ProcessingStyles`
--

DROP TABLE IF EXISTS `ProcessingStyles`;
CREATE TABLE `ProcessingStyles` (
  `process_id` int(11) NOT NULL,
  `process_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ProcessingStyles`
--

INSERT INTO `ProcessingStyles` (`process_id`, `process_name`) VALUES
(1, 'Washed'),
(2, 'Anaerobic'),
(3, 'Natural'),
(4, 'Honey');

-- --------------------------------------------------------

--
-- Table structure for table `RecipeStatuses`
--

DROP TABLE IF EXISTS `RecipeStatuses`;
CREATE TABLE `RecipeStatuses` (
  `status_id` int(11) NOT NULL,
  `status_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RecipeStatuses`
--

INSERT INTO `RecipeStatuses` (`status_id`, `status_type`) VALUES
(1, 'Active'),
(2, 'Testing'),
(3, 'Retired');

-- --------------------------------------------------------

--
-- Table structure for table `Roasters`
--

DROP TABLE IF EXISTS `Roasters`;
CREATE TABLE `Roasters` (
  `roaster_id` int(11) NOT NULL,
  `roaster_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Roasters`
--

INSERT INTO `Roasters` (`roaster_id`, `roaster_name`, `email`, `location_id`) VALUES
(1, 'Heart', 'wholesale@heartroasters.com', 1),
(2, 'Prodigal', 'wholesale@prodigalcoffee.com', 2),
(3, 'Coffee Collective', 'coffee@coffeecollective.dk', 3),
(4, 'Prolog', 'wholesale@prologcoffee.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `RoastTypes`
--

DROP TABLE IF EXISTS `RoastTypes`;
CREATE TABLE `RoastTypes` (
  `roast_type_id` int(11) NOT NULL,
  `roast_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RoastTypes`
--

INSERT INTO `RoastTypes` (`roast_type_id`, `roast_name`) VALUES
(1, 'Light'),
(2, 'Medium'),
(3, 'Espresso'),
(4, 'Dark');

-- --------------------------------------------------------

--
-- Table structure for table `Varietals`
--

DROP TABLE IF EXISTS `Varietals`;
CREATE TABLE `Varietals` (
  `varietal_id` int(11) NOT NULL,
  `varietal_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Varietals`
--

INSERT INTO `Varietals` (`varietal_id`, `varietal_name`) VALUES
(6, 'Ecuador'),
(5, 'Loja'),
(9, 'Pacas'),
(1, 'Pink Bourbon'),
(2, 'Riuri 11'),
(8, 'Sidra'),
(3, 'SL28'),
(4, 'SL34'),
(7, 'Typica');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BrewerTypes`
--
ALTER TABLE `BrewerTypes`
  ADD PRIMARY KEY (`brewer_id`);

--
-- Indexes for table `BrewRecipes`
--
ALTER TABLE `BrewRecipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `brewer_id` (`brewer_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `BrewResults`
--
ALTER TABLE `BrewResults`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `coffee_id` (`coffee_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `CoffeeLots`
--
ALTER TABLE `CoffeeLots`
  ADD PRIMARY KEY (`lot_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `process_id` (`process_id`);

--
-- Indexes for table `CoffeeLotVarietals`
--
ALTER TABLE `CoffeeLotVarietals`
  ADD PRIMARY KEY (`lot_id`,`varietal_id`),
  ADD KEY `varietal_id` (`varietal_id`);

--
-- Indexes for table `Coffees`
--
ALTER TABLE `Coffees`
  ADD PRIMARY KEY (`coffee_id`),
  ADD KEY `roaster_id` (`roaster_id`),
  ADD KEY `roast_type_id` (`roast_type_id`),
  ADD KEY `lot_id` (`lot_id`);

--
-- Indexes for table `Locations`
--
ALTER TABLE `Locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `ProcessingStyles`
--
ALTER TABLE `ProcessingStyles`
  ADD PRIMARY KEY (`process_id`);

--
-- Indexes for table `RecipeStatuses`
--
ALTER TABLE `RecipeStatuses`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `Roasters`
--
ALTER TABLE `Roasters`
  ADD PRIMARY KEY (`roaster_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `RoastTypes`
--
ALTER TABLE `RoastTypes`
  ADD PRIMARY KEY (`roast_type_id`);

--
-- Indexes for table `Varietals`
--
ALTER TABLE `Varietals`
  ADD PRIMARY KEY (`varietal_id`),
  ADD UNIQUE KEY `varietal_name` (`varietal_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BrewerTypes`
--
ALTER TABLE `BrewerTypes`
  MODIFY `brewer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `BrewRecipes`
--
ALTER TABLE `BrewRecipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `BrewResults`
--
ALTER TABLE `BrewResults`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `CoffeeLots`
--
ALTER TABLE `CoffeeLots`
  MODIFY `lot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Coffees`
--
ALTER TABLE `Coffees`
  MODIFY `coffee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Locations`
--
ALTER TABLE `Locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ProcessingStyles`
--
ALTER TABLE `ProcessingStyles`
  MODIFY `process_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `RecipeStatuses`
--
ALTER TABLE `RecipeStatuses`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Roasters`
--
ALTER TABLE `Roasters`
  MODIFY `roaster_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `RoastTypes`
--
ALTER TABLE `RoastTypes`
  MODIFY `roast_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Varietals`
--
ALTER TABLE `Varietals`
  MODIFY `varietal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `BrewRecipes`
--
ALTER TABLE `BrewRecipes`
  ADD CONSTRAINT `BrewRecipes_ibfk_1` FOREIGN KEY (`brewer_id`) REFERENCES `BrewerTypes` (`brewer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BrewRecipes_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `RecipeStatuses` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `BrewResults`
--
ALTER TABLE `BrewResults`
  ADD CONSTRAINT `BrewResults_ibfk_1` FOREIGN KEY (`coffee_id`) REFERENCES `Coffees` (`coffee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BrewResults_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `BrewRecipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `CoffeeLots`
--
ALTER TABLE `CoffeeLots`
  ADD CONSTRAINT `CoffeeLots_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoffeeLots_ibfk_2` FOREIGN KEY (`process_id`) REFERENCES `ProcessingStyles` (`process_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `CoffeeLotVarietals`
--
ALTER TABLE `CoffeeLotVarietals`
  ADD CONSTRAINT `CoffeeLotVarietals_ibfk_1` FOREIGN KEY (`lot_id`) REFERENCES `CoffeeLots` (`lot_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoffeeLotVarietals_ibfk_2` FOREIGN KEY (`varietal_id`) REFERENCES `Varietals` (`varietal_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Coffees`
--
ALTER TABLE `Coffees`
  ADD CONSTRAINT `Coffees_ibfk_1` FOREIGN KEY (`roaster_id`) REFERENCES `Roasters` (`roaster_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Coffees_ibfk_2` FOREIGN KEY (`roast_type_id`) REFERENCES `RoastTypes` (`roast_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Coffees_ibfk_3` FOREIGN KEY (`lot_id`) REFERENCES `CoffeeLots` (`lot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Roasters`
--
ALTER TABLE `Roasters`
  ADD CONSTRAINT `Roasters_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- re-enable foreign key checks and commits
SET FOREIGN_KEY_CHECKS=1;
COMMIT;