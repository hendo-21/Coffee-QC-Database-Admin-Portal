// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Citation for use of AI Tools:
// Date: 02/23/26
// Prompts used:
//      Refactor data fetching to use Promise.all() for concurrent fetching.
//      Troubleshooting assistance for populating dropdowns with data from multiple tables and parsing ids for delete operations.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from 'react';

function BrewRecipes({ backendURL }) {
    // Init state for fetching tables
    const [brewRecipes, setBrewRecipes] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);
    const [recipeStatuses, setBrewStatuses] = useState([]);

    // Init state for tracking user input
    const [selectedBrewRecipe, setSelectedBrewRecipe] = useState('');
    const [selectedBrewerType, setSelectedBrewerType] = useState('');
    const [selectedRecipeStatus, setSelectedRecipeStatus] = useState('');
    const [targetDose, setTargetDose] = useState('');
    const [targetYield, setTargetYield] = useState('');
    const [targetGrindSize, setTargetGrindSize] = useState('');
    const [targetWaterTemp, setTargetWaterTemp] = useState('');
    const [targetBrewTime, setTargetBrewTime] = useState('');

    // 1. Load data
    const loadData = async () => {
        try {
            const [brewRecipesRes, brewerTypesRes, recipeStatusesRes] = await Promise.all([
                fetch(`${backendURL}/api/brewrecipes`),
                fetch(`${backendURL}/api/brewertypes`),
                fetch(`${backendURL}/api/recipestatuses`)
            ]);
            setBrewRecipes(await brewRecipesRes.json());
            setBrewerTypes(await brewerTypesRes.json());
            setBrewStatuses(await recipeStatusesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        };
    };
    useEffect(() => {
        loadData()
    }, []);

    // Delete a Brew Recipe
    const handleRecipeDelete = async (deleteRecipeId) => {
        if(window.confirm("Are you sure you want to delete this brew recipe? It will delete all associated results in Brew Results.")) {
            try {
                const recipe_id = parseInt(deleteRecipeId);
                const deleteRes = await fetch(`${backendURL}/api/brewrecipes/${recipe_id}`, { method: 'DELETE' });
                if (deleteRes.status === 204) {
                    setBrewRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.recipe_id !== recipe_id));
                } else {
                    alert("Brew recipe deleted successfully.")
                    console.error("Failed to delete Brew Recipe record.", err);
                }
            } catch (err) {
                alert("Could not connect to the server");
                console.error("Connection error:", err);
            }
        }
    };

    // Fill form with existing data when recipe ID is selected
    const onRecipeSelect = async (e) => {
        const newRecipeID = Number(e.target.value);
        setSelectedBrewRecipe(newRecipeID);
        const recipe = brewRecipes.find(r => r.recipe_id === newRecipeID);
        const brewer = brewerTypes.find(bt => bt.brewer_type === recipe.brewer_type);
        const status = recipeStatuses.find(rs => rs.status_type === recipe.status);
        if (recipe) {
            setSelectedBrewerType(brewer.brewer_id)
            setTargetDose(Number(recipe.target_dose));
            setTargetYield(Number(recipe.target_yield));
            setTargetGrindSize(Number(recipe.target_grind_size));
            setTargetWaterTemp(Number(recipe.target_water_temp));
            setTargetBrewTime(recipe.target_brew_time);
            setSelectedRecipeStatus(status.status_id);
        }
    };

    // Update a brew recipe in the database
    const updateBrewRecipe = async () => {
        const recipe_id = Number(selectedBrewRecipe);
        const brewer_id = Number(selectedBrewerType);
        const target_dose = Number(targetDose);
        const target_yield = Number(targetYield);
        const target_grind_size = Number(targetGrindSize);
        const target_water_temp = Number(targetWaterTemp);
        const target_brew_time = targetBrewTime;
        const status_id = Number(selectedRecipeStatus);

        // Make the request
        const updatedRecipe = {
            brewer_id,
            target_dose,
            target_yield,
            target_grind_size,
            target_water_temp,
            target_brew_time,
            status_id
        };
        const response = await fetch (`${backendURL}/api/brewrecipe/${recipe_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedRecipe)
        });
        if (response.status === 200) {
            loadData();
        } else {
            console.log(`Error updating recipe. Error: ${response.status}.`)
        }

        // Clear the form
        setSelectedBrewRecipe("");
        setSelectedBrewerType("");
        setTargetDose("");
        setTargetYield("");
        setTargetGrindSize("");
        setTargetWaterTemp("");
        setTargetBrewTime("");
        setSelectedRecipeStatus("");
    } 

    return (
        <>
            <div className="pageContent">
                <h2>View, Edit and Delete Brew Recipes</h2>
                {/* Table for BrewRecipes */}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Recipe ID</th>
                            <th>Brewer Type</th>
                            <th>Target Dose</th>
                            <th>Target Yield</th>
                            <th>Target Grind Size</th>
                            <th>Target Water Temp</th>
                            <th>Target Brew Time</th>
                            <th>Recipe Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brewRecipes.map(br => (
                            <tr key={br.recipe_id}>
                                <td>{br.recipe_id}</td>
                                <td>{br.brewer_type}</td>
                                <td>{br.target_dose}</td>
                                <td>{br.target_yield}</td>
                                <td>{br.target_grind_size}</td>
                                <td>{br.target_water_temp}</td>
                                <td>{br.target_brew_time}</td>
                                <td>{br.status}</td>
                                <td>
                                    <button className="deleteButton" type='button' onClick={() => handleRecipeDelete(br.recipe_id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add a horizontal divider to the page to separate table from form */}
                <hr/>

                {/* Form for Edit Brew Recipes */}
                <form onSubmit={event => { event.preventDefault(); updateBrewRecipe(); }}>
                    <h3>Edit Brew Recipe</h3>
                    <p>Select a recipe via the Recipe ID dropdown and the other fields will auto-populate.</p>

                    <p>
                        <label>Recipe ID</label>
                        <select
                                value={selectedBrewRecipe}
                                onChange={event => {
                                    onRecipeSelect(event);
                                }}
                                required>
                                <option value="">-- Select a Recipe --</option>
                                {brewRecipes.map(br => (
                                    <option key={br.recipe_id} value={br.recipe_id}>
                                        {br.recipe_id}
                                    </option>
                                ))}
                        </select>
                    </p>

                    <p>
                        <label>Brewer Type</label>
                        <select value={selectedBrewerType} onChange={event => setSelectedBrewerType(event.target.value)} required>
                                <option value=""></option>
                                {brewerTypes.map(type => (
                                    <option key={type.brewer_id} value={type.brewer_id}>
                                        {type.brewer_type}
                                    </option>
                                ))}
                        </select>
                    </p>

                    <p>
                        <label>Target Dose</label>
                        <input type="number" step="0.01" id="targetDose" name="targetDose" value={targetDose} min="0" placeholder="eg. 15.00" required
                                onChange={event => { setTargetDose(event.target.value) }}></input>
                    </p>

                    <p>
                        <label>Target Yield</label>
                        <input type="number" step="0.01" id="targetYield" name="targetYield" value={targetYield} min="0" placeholder="eg. 240.00" required
                                onChange={event => { setTargetYield(event.target.value) }}></input>
                    </p>

                    <p>
                        <label>Target Grind Size</label>
                        <input type="number" step="0.01" id="targetGrindSize" name="targetGrindSize" value={targetGrindSize} min="0" placeholder="eg. 14.00" required
                                onChange={event => { setTargetGrindSize(event.target.value) }}></input>
                    </p>

                    <p>
                        <label>Target Water Temp</label>
                        <input type="number" step="0.01" id="targetWaterTemp" name="targetWaterTemp" value={targetWaterTemp} min="0" placeholder="eg. 96.00" required
                                onChange={event => { setTargetWaterTemp(event.target.value) }}></input>
                    </p>

                    <p>
                        <label>Target Brew Time</label>
                        <input type="text" step="0.01" id="targetBrewTime" name="targetBrewTime" value={targetBrewTime} min="0" placeholder="eg. 00:04:00" required
                                onChange={event => { setTargetBrewTime(event.target.value) }}></input>
                    </p>

                    <p>
                        <label>Recipe Statuses</label>
                        <select value={selectedRecipeStatus} onChange={event => setSelectedRecipeStatus(event.target.value)} required>
                                <option value="">-- Select Recipe Status --</option>
                                {recipeStatuses.map(status => (
                                    <option key={status.status_id} value={status.status_id}>
                                        {status.status_type}
                                    </option>
                                ))}
                        </select>
                    </p>

                    <p>
                        <button type="submit">
                            Save Changes
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default BrewRecipes;