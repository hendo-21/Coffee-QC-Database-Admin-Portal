## Project Overview

We were tasked with desigining a relathional database and implementing a web application for use by a database administrator. This was the context for the RDBMS that we envisioned:

California Coffee Co. is an award winning coffee shop in Southern California, that is known for its exceptionally brewed drip coffee. This reputation is the result of a meticulous approach to sourcing coffees from the world’s best roasters, and brewing standards. By sourcing coffees from the world’s best coffee roasters, as opposed to partnering with just one roaster, or roasting their own coffee, California Coffee Co ensures they are serving their customers the best coffees available. As California Coffee Co. scales and continues to brew high quality coffees, a relational database that tracks brewing performance across coffee roasters, their coffees, and the various brewing methods used at the shop is needed to eliminate data redundancy and ensure baristas have access to top recipes. California Coffee Co. serves exclusively single origin coffees, which are sourced by the roaster by lot, with each lot containing pertinent information relating to brewed coffee quality and flavor, such as coffee bean varietal, elevation, and processing style. A roasted coffee therefore consists of one lot, that may be made up of multiple coffee bean varietals, but is limited to a single processing style. California Coffee Co. needs to track this information in addition to brewed coffee results in order to achieve their mission.
On any given week California Coffee Co. features 5-8 different roasters, each with 6-12 different coffees, and it uses 3-5 different brewing methods, brewing 100-300 coffees a day. This means it may serve over 100 different coffees from over 50 different roasters over the course of a year. California Coffee Co. will use this database to guide coffee purchasing decisions from its partner roasters, plan its brewed coffee menu, and optimize its brewed coffee recipes. In order to keep up with their continuous improvement, the database tracks the status of which brewing recipes are being tested, currently set as the active golden standard, or retired from production. When a brew recipe is changed or replaced, a new recipe with those details will be added to the table and the previous recipe’s status will be set to retired in order to preserve historical data. 

Questions California Coffee Co. hopes to answer these questions with this database:
- Which coffees, roasters, and/or brew methods produce the best outcomes?
- Are there brewing methods that consistently produce poor results, and need to be changed?
- Are there particular coffee origins or processing styles that produce better outcomes than others?
- If there are a series of poor brewing results for a particular coffee, can those results be isolated to a particular lot number?
- How is brewing performance related to lot-specific origin information such as varietals, processing style, and elevation?



## Authors
- Ian Henderson
- Nicholas Park

## Technologies Used
- NodeJS
- React
- MySQL
- MySQL Workbench

## What we learned
- Develop a use case and problem statement for a moderately complex relational database.
- Document this database using modeling notations.
- Database normalization best practices, and normalizing a database to 3NF.
- How to formulate SQL for data manipulation and PL/SQL for stored procedures, views, and functions.
- Formulating moderately complex SQL joins to display user friendly data on a web app.
- Design and implement a web app that implements CRUD operations within a relational database management system.

## Project Stucture

```text
project/
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   └── database/
│       └── db-connector.js
├── documentation/
│   ├── DDL.sql
│   ├── DML.sql
│   └── PL.sql
└── frontend/
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

## Code Citations

Citations for use of AI are summarized below alongside complete citations for class materials used. See referenced files for more detail.

### Backend
#### backend/database/db-connector.js
  - Date: 02/09/26
    - Copied from class exploration.
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

#### backend/server.js
  - Date: 02/09/26
    - SETUP, LISTENER, and READ routes copied/adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
  ###### Use of AI Tools:
  - Date: 03/02/26
    - Prompts used include parameterized queries, string interpolation, and stored procedure OUT parameter behavior.
    - AI Source: GitHub Copilot VSCode integration.

#### documentation/DML.sql
  - Date: 02/12/26
    - Queries and user input representation adapted from bsg_sample_data_manipulation_queries.sql.
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323336?module_item_id=26243423

#### documentation/PL.sql
  - Date: 02/27/26
    - All SPs adapted from PL/SQL Assignment starter code (plsql_student_shell_files).
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/assignments/10323329

### Frontend
#### frontend/reactServer.cjs
###### Use of AI tools:
  - Date: 02/12/26
    - Prompt(s) used:
      - Why does "npm run stop_production" return "Forever cannot find process"?
      - What does "PathError: Missing parameter name" mean in Express 5?
    - AI Source: Google Gemini

#### frontend/src/App.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: refactor overloaded Coffees.jsx content into standalone page components while maintaining layout/styling.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/components/Navigation.jsx
###### Use of AI tools:
  - Date: 02/18/26
    - Prompts used: left-side nav layout and standalone component refactor support.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/index.css
###### Use of AI tools:
  - Date: 02/18/26
    - Prompts used include hover effect styling, footer positioning, left-side nav layout, and universal page wrapper styling.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/BrewerTypes.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/BrewRecipes.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/23/26
    - Prompts used: Promise.all() concurrent fetching refactor and dropdown population troubleshooting.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/BrewResults.jsx
  - Date: 03/02/26
    - Adapted from: React ES6 Spread Operator.
    - Source URL: https://www.w3schools.com/react/react_es6_spread.asp
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: Promise.all() concurrent fetching refactor.
    - AI Source: GitHub Copilot VSCode integration.
  - Date: 03/02/26
    - Prompt used: useEffect-based extYield calculation/state update support.
    - AI Source: Microsoft Copilot VSCode integration.
  - Date: 03/14/26
    - Prompt used: input fields display numeric values to 2 decimal points.
    - AI Source: Microsoft Copilot VSCode integration.

#### frontend/src/pages/CoffeeLots.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompts used: standalone page refactor, Promise.all() concurrent fetching, and numeric-only key input handling.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/CoffeeLotVarietals.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompts used: standalone page refactor and Promise.all() concurrent fetching.
    - AI Source: GitHub Copilot VSCode integration.
  - Date: 03/14/26
    - Prompts used: row-specific edit-state refactor to limit editing to a single row.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Coffees.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: refactor data fetching to Promise.all() for concurrent requests.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Locations.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/ProcessingStyles.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: standalone page refactor from Coffees.jsx.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/RecipeStatuses.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: standalone page refactor from Coffees.jsx.
    - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Roasters.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/RoastTypes.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/Varietals.jsx
  - Date: 02/09/26
    - Front-end components adapted from "Exploration - Web Application Technology".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
    - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
    - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
###### Use of AI tools:
  - Date: 02/18/26
    - Prompt used: standalone page refactor from Coffees.jsx.
    - AI Source: GitHub Copilot VSCode integration.


