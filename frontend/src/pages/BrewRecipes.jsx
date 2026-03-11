import React, { useState, useEffect } from 'react';
import BrewerTypes from './BrewerTypes';
import RecipeStatuses from './RecipeStatuses';

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
        } catch {
            console.error('Error fetching data:', error);
        };
    };
    useEffect(() => {
        loadData()
    }, []);

    // Delete a Brew Recipe
    const handleRecipeDelete = async (recipe_id_to_delete) => {
        const rid = parseInt(recipe_id_to_delete);
        const deleteRes = await fetch(`${backendURL}/api/brewrecipes/${rid}`, { method: 'DELETE' });
        if (deleteRes.status === 204) {
            setBrewRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.recipe_id !== rid));
        } else {
            console.error("Failed to delete Brew Recipe record.");
        }
    };

    // Fill form with existing data when recipe ID is selected
    const onRecipeSelect = async (e) => {
        const newRecipeID = Number(e.target.value);
        setSelectedBrewRecipe(newRecipeID);
        const recipe = brewRecipes.find(r => r.recipe_id === newRecipeID);
        if (recipe) {
            setSelectedBrewerType(recipe.brewer_type)
            setTargetDose(Number(recipe.target_dose));
            setTargetYield(Number(recipe.target_yield));
            setTargetGrindSize(Number(recipe.target_grind_size));
            setTargetWaterTemp(Number(recipe.target_water_temp));
            setTargetBrewTime(recipe.target_brew_time);
            setSelectedRecipeStatus(recipe.status);
        }
    };

    // Update a brew recipe in the database
    const updateBrewRecipe = async () => {
        // Get the status id
        const recipeStatus = recipeStatuses.find(rs => rs.status_type === selectedRecipeStatus);
        const rsId = recipeStatus.status_id;

        // Get the brewer id
        const brewerType = brewerTypes.find(bt => bt.brewer_type === selectedBrewerType);
        const btId = brewerType.brewer_id;

        // Make the request
        const updatedRecipe = {
            btId,
            targetDose,
            targetYield,
            targetGrindSize,
            targetWaterTemp,
            targetBrewTime,
            rsId
        };
        const response = await fetch (`${backendURL}/api/brewresults/${selectedBrewRecipe}`, {
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
                                    <button type='button' onClick={() => handleRecipeDelete(br.recipe_id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Form for Edit Brew Recipes */}
                <form onSubmit={event => { event.preventDefault(); updateBrewRecipe(); }}>
                    <h3>Edit Brew Recipe</h3>

                    <p>
                        <label>Recipe ID
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
                        </label>
                    </p>

                    <p>
                        <label>Brewer Type
                            <select value={selectedBrewerType} onChange={event => setSelectedBrewerType(event.target.value)} required>
                                <option value=""></option>
                                {brewerTypes.map(type => (
                                    <option key={type.brewer_id} value={type.brewer_type}>
                                        {type.brewer_type}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </p>

                    <p>
                        <label>Target Dose
                            <input type="number" step="0.01" id="targetDose" name="targetDose" value={targetDose} min="0" placeholder="eg. 15.00" required
                                onChange={event => { setTargetDose(event.target.valueAsNumber) }}></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Yield
                            <input type="number" step="0.01" id="targetYield" name="targetYield" value={targetYield} min="0" placeholder="eg. 240.00" required
                                onChange={event => { setTargetYield(event.target.valueAsNumber) }}></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Grind Size
                            <input type="number" step="0.01" id="targetGrindSize" name="targetGrindSize" value={targetGrindSize} min="0" placeholder="eg. 14.00" required
                                onChange={event => { setTargetGrindSize(event.target.valueAsNumber) }}></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Water Temp
                            <input type="number" step="0.01" id="targetWaterTemp" name="targetWaterTemp" value={targetWaterTemp} min="0" placeholder="eg. 96.00" required
                                onChange={event => { setTargetYield(event.target.valueAsNumber) }}></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Brew Time
                            <input type="text" step="0.01" id="targetBrewTime" name="targetBrewTime" value={targetBrewTime} min="0" placeholder="eg. 00:04:00" required
                                onChange={event => { setTargetYield(event.target.value) }}></input>
                        </label>
                    </p>

                    <p>
                        <label>Recipe Statuses
                            <select value={selectedRecipeStatus} onChange={event => setSelectedRecipeStatus(event.target.value)} required>
                                <option value="">-- Select Recipe Status --</option>
                                {recipeStatuses.map(status => (
                                    <option key={status.status_id} value={status.status_type}>
                                        {status.status_type}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </p>

                    <p>
                        <button type="submit">
                            Update Brew Recipe
                        </button>
                    </p>
                </form>
            </div>
        </>
    )
}

export default BrewRecipes;