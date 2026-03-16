Authors: Ian Henderson & Nicholas Park

This is the term project for Oregon State University's CS340: Intro to Databases course.

## Code Citations

Grouped by page/file first, then date. For pages with both non-AI and AI citations, non-AI citations are listed first.

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
  <br>
  - Use of AI Tools:
  - - Date: 03/02/26
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
- Use of AI Tools:
  - Date: 02/12/26
  - Prompt(s) used:
    1. Why does "npm run stop_production" return "Forever cannot find process"?
    2. What does "PathError: Missing parameter name" mean in Express 5?
  - AI Source: Google Gemini

#### frontend/src/App.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompt used: refactor overloaded Coffees.jsx content into standalone page components while maintaining layout/styling.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/components/Navigation.jsx
- AI citations
  - Date: 02/18/26
  - Prompts used: left-side nav layout and standalone component refactor support.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/index.css
- AI citations
  - Date: 02/18/26
  - Prompts used include hover effect styling, footer positioning, left-side nav layout, and universal page wrapper styling.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/BrewerTypes.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/BrewRecipes.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/23/26
  - Prompts used: Promise.all() concurrent fetching refactor and dropdown population troubleshooting.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/BrewResults.jsx
- Non-AI citations
  - Date: 03/02/26
  - Adapted from: React ES6 Spread Operator.
  - Source URL: https://www.w3schools.com/react/react_es6_spread.asp
- AI citations
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
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompts used: standalone page refactor, Promise.all() concurrent fetching, and numeric-only key input handling.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/CoffeeLotVarietals.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompts used: standalone page refactor and Promise.all() concurrent fetching.
  - AI Source: GitHub Copilot VSCode integration.
  - Date: 03/14/26
  - Prompts used: row-specific edit-state refactor to limit editing to a single row.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Coffees.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompt used: refactor data fetching to Promise.all() for concurrent requests.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Locations.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/ProcessingStyles.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompt used: standalone page refactor from Coffees.jsx.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/RecipeStatuses.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompt used: standalone page refactor from Coffees.jsx.
  - AI Source: GitHub Copilot VSCode integration.

#### frontend/src/pages/Roasters.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/RoastTypes.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

#### frontend/src/pages/Varietals.jsx
- Non-AI citations
  - Date: 02/09/26
  - Front-end components adapted from "Exploration - Web Application Technology".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419
  - Date: 02/09/26
  - CUD operations adapted from "Exploration - Implementing CUD operations in your app".
  - Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436
- AI citations
  - Date: 02/18/26
  - Prompt used: standalone page refactor from Coffees.jsx.
  - AI Source: GitHub Copilot VSCode integration.


