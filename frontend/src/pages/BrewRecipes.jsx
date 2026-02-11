import React, { useState, useEffect } from 'react';
import BrewerTypes from '../components/BrewerTypes';
import RecipeStatuses from '../components/RecipeStatuses';

function BrewRecipes() {
    // Init state for fetching tables
    const [brewRecipes, setBrewRecipes] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);
    const [recipeStatuses, setBrewStatuses] = useState([]);

    // Init state for tracking user input
    const [selectedBrewerType, setSelectedBrewerType] = useState([]);
    const [selectedRecipeStatus, setSelectedRecipeStatus] = useState([]);
    const [targetDose, setTargetDose] = useState('');
    const [targetYield, setTargetYield] = useState('');
    const [targetGrindSize, setTargetGrindSize] = useState('');
    const [targetWaterTemp, setTargetWaterTemp] = useState('');
    const [targetBrewTime, setTargetBrewTime] = useState('');

    // 1. Load data
    const loadData = async () => {
        try {
            const [brewRecipesRes, brewerTypesRes, recipeStatusesRes] = await Promise.all([
                fetch('/api/brewrecipes'),
                fetch('/api/brewertypes'),
                fetch('/api/recipestatuses')
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

    // TODO: POST new recipe to db


    return (
        <>
            <div>
                <h2>Page Description</h2>
                <p>Create, edit and delete brew recipes. On this page you also have acccess to dependant subtables.
                    Create brewer types as needed to build your recipe.
                </p>
                <hr style={{ margin: '40px 0' }} />

                <h2>Manage Brew Recipes</h2>


                {/* Table for BrewRecipes */}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Brewer Type</th>
                            <th>Target Dose</th>
                            <th>Target Yield</th>
                            <th>Target Grind Size</th>
                            <th>Target Water Temp</th>
                            <th>Target Brew Time</th>
                            <th>Recipe Status</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brewRecipes.map(br => (
                            <tr key={br.recipe_id}>
                                <td>{br.brewer_type}</td>
                                <td>{br.target_dose}</td>
                                <td>{br.target_yield}</td>
                                <td>{br.target_grind_size}</td>
                                <td>{br.target_water_temp}</td>
                                <td>{br.target_brew_time}</td>
                                <td>{br.status}</td>
                                <td>MD Icons go here</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Form for Brew Recipes */}
                <form onSubmit={event => { event.preventDefault(); }}>
                    <p>
                        <label>Brewer Types
                            <select value={selectedBrewerType} onChange={event => setSelectedBrewerType(event.target.value)} required>
                                <option value="">-- Select a Brewer Type --</option>
                                {brewerTypes && brewerTypes.length > 0 ? (
                                    brewerTypes.map(brewerTypes => (
                                        <option key={brewerTypes.brewer_id} value={brewerTypes.brewer_type}>
                                            {brewerTypes.brewer_type}
                                        </option>
                                    ))
                                ) : (
                                    <option key="loading" value="">Loading...</option>
                                )}
                            </select>
                        </label>
                    </p>

                    <p>
                        <label>Target Dose
                            <input type="number" step="0.01" id="targetDose" name="targetDose" min="0" placeholder="eg. 15.00" required 
                            onChange={ event => { setTargetDose(event.target.valueAsNumber) } }></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Yeild
                            <input type="number" step="0.01" id="targetYield" name="targetYield" min="0" placeholder="eg. 240.00" required 
                            onChange={ event => { setTargetYield(event.target.valueAsNumber) } }></input>
                        </label>
                    </p>
                    
                    <p>
                        <label>Target Grind Size
                            <input type="number" step="0.01" id="targetGrindSize" name="targetGrindSize" min="0" placeholder="eg. 14.00" required 
                            onChange={ event => { setTargetGrindSize(event.target.valueAsNumber) } }></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Water Temp
                            <input type="number" step="0.01" id="targetWaterTemp" name="targetWaterTemp" min="0" placeholder="eg. 96.00" required 
                            onChange={ event => { setTargetYield(event.target.valueAsNumber) } }></input>
                        </label>
                    </p>

                    <p>
                        <label>Target Brew Time
                            <input type="number" step="0.01" id="targetBrewTime" name="targetBrewTime" min="0" placeholder="eg. 00:04:00" required 
                            onChange={ event => { setTargetYield(event.target.valueAsNumber) } }></input>
                        </label>
                    </p>

                    <p>
                        <label>Recipe Statuses
                            <select value={selectedRecipeStatus} onChange={event => setSelectedRecipeStatus(event.target.value)} required>
                                <option value="">-- Select Recipe Status --</option>
                                {recipeStatuses && recipeStatuses.length > 0 ? (
                                    recipeStatuses.map(recipeStatuses => (
                                        <option key={recipeStatuses.status_id} value={recipeStatuses.status_type}>
                                                {recipeStatuses.status_type}
                                        </option>
                                    ))
                                ) : (
                                    <option key="loading" value="">Loading...</option>
                                )}
                            </select>
                        </label>
                    </p>

                    <button type="submit">
                        Add Brew Recipe
                    </button>
                </form>

                {/* Table for Brewer Types */}
                <hr style={{ margin: '40px 0' }} />
                <BrewerTypes brewerTypes={brewerTypes} />

                {/* Table for Recipe Statuses */}
                <hr style={{ margin: '40px 0' }} />
                <RecipeStatuses recipeStatuses={recipeStatuses} />
            </div>
        </>
    )
} 

export default BrewRecipes;