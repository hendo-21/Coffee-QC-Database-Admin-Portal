## Project Overview

This project is the result of a term-long group project focused on the application of relational database fundamentals. We were tasked with creating a RDBMS use case, desigining a moderately complex relational database, implementing a web application with CRUD operations for use by a database administrator. CUD operations were implemented for all M:N entity relationships to reinforce relational database concepts with an emphasis on data and referential integrity.

## RDBMS Context
California Coffee Co. is an award winning coffee shop in Southern California that is known for its exceptionally brewed drip coffee. This reputation is the result of a meticulous approach to sourcing coffees from the world’s best roasters and brewing standards. By sourcing coffees from the world’s best coffee roasters, as opposed to partnering with just one roaster, or roasting their own coffee, California Coffee Co ensures they are serving their customers the best coffees available. As California Coffee Co. scales and continues to brew high quality coffees, a relational database that tracks brewing performance across coffee roasters, their coffees, and the various brewing methods used at the shop is needed to eliminate data redundancy and ensure baristas have access to top recipes. California Coffee Co. serves exclusively single origin coffees, which are sourced by the roaster by lot, with each lot containing pertinent information relating to brewed coffee quality and flavor, such as coffee bean varietal, elevation, and processing style. A roasted coffee therefore consists of one lot, that may be made up of multiple coffee bean varietals, but is limited to a single processing style. California Coffee Co. needs to track this information in addition to brewed coffee results in order to achieve their mission. 
<br>
On any given week California Coffee Co. features 5-8 different roasters, each with 6-12 different coffees, and it uses 3-5 different brewing methods, brewing 100-300 coffees a day. This means it may serve over 100 different coffees from over 50 different roasters over the course of a year. California Coffee Co. will use this database to guide coffee purchasing decisions from its partner roasters, plan its brewed coffee menu, and optimize its brewed coffee recipes. In order to keep up with their continuous improvement, the database tracks the status of which brewing recipes are being tested, currently set as the active golden standard, or retired from production. When a brew recipe is changed or replaced, a new recipe with those details will be added to the table and the previous recipe’s status will be set to retired in order to preserve historical data. 

## Web App Demo
<video src="documentation/Project Demo.mp4" width="320" height="240" controls></video>

Operations featured:
- Read on all tables utilizing JOINs for user-friendly data
- Create on CoffeeLots, Varietals, CoffeeLotVarietals, BrewResults (feature in the two M:N relationships)
- Update on CoffeeLotVarietals and BrewRecipes (intersection tables resolve M:N relationships)
- Delete on Coffees, CoffeeLots, Varietals, CoffeeLotVarietals, BrewRecipes, BrewReults. Utilized CASCADE
- Reset database to sample data

## Authors
- Ian Henderson
- Nicholas Park

## Technologies Used
- NodeJS
- ReactJS
- MySQL
- MySQL Workbench

## What we learned
- Develop a use case and problem statement for a moderately complex relational database.
- Document this database using modeling notations.
- Database normalization best practices, and normalizing a database to 3NF.
- How to formulate SQL for data manipulation and PL/SQL for stored procedures, views, and functions.
- Formulating moderately complex SQL joins to display user friendly data on a web app.
- Design and implement a web app that implements CRUD operations within a relational database management system.
- Team development using a remote repository.

## Project Stucture

```text
project/
├── README.md
├── backend/      # NodeJS
│   ├── package.json
│   ├── server.js
│   └── database/
│       └── db-connector.js
├── documentation/
│   ├── DDL.sql    # Data definition queries
│   ├── DML.sql    # Data manipulation queries
│   ├── ERDs.pdf   # Entity relationship diagrams using crow's foot notation
│   ├── Schema.pdf # Readable schema diagram
│   └── PL.sql     # PL/SQL queries for stored procedures
└── frontend/      # ReactJS
    ├── index.html
    ├── package.json
    ├── reactServer.cjs
    ├── vite.config.js
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        └── pages/
```

