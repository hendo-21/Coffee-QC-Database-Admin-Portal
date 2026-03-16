// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Citation for use of AI Tools:
// Date: 02/18/26
// Prompts used: 
//      Refactor to standalone page component from Coffees.jsx, maintain left-side nav layout, page, table, and form styling.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from "react";

function RecipeStatuses({ backendURL }) {
    // Init state to store user input
    const [recipeStatuses, setRecipeStatus] = useState([]);

    // Load Data
    const loadData = async () => {
        try {
            const recipeStatusesRes = await fetch(`${backendURL}/api/recipestatuses`);
            setRecipeStatus(await recipeStatusesRes.json());
        } catch (err) {
            console.error("Error fetching RecipeStatuses:", err);
        }
    };
    useEffect(() => {
        loadData()
    }, []);

    return (
        <div className="pageContent">
            <h2>View Recipe Statuses</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Status ID</th>
                        <th>Status Type</th>
                    </tr>
                </thead>
                <tbody>
                    {recipeStatuses.map(recipeStatuses => (
                        <tr key={recipeStatuses.status_id}>
                            <td>{recipeStatuses.status_id}</td>
                            <td>{recipeStatuses.status_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeStatuses;