// Citation for use of AI Tools:
// Date: 02/18/26
// Prompts used: refactored data fetching to use Promise.all() for concurrent fetching.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from 'react';

function BrewResults({ backendURL }) {
    // Init state for fetching tables
    const [brewResults, setBrewResults] = useState([]);
    const [brewRecipes, setBrewRecipes] = useState([]);
    const [coffees, setCoffees] = useState([]);
    const [recipeStatuses, setRecipeStatuses] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);


    // Init state for tracking user input
    const [selectedCoffee, setSelectedCoffee] = useState('');
    const [selectedCoffeeID, setSelectedCoffeeID] = useState('');
    const [selectedBrewRecipe, setSelectedBrewRecipe] = useState('');
    const [selectedBrewerType, setSelectedBrewerType] = useState('');
    const [dose, setDose] = useState('');
    const [bevYield, setYield] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [brewTime, setBrewTime] = useState('');
    const [tdsReading, setTdsReading] = useState('');
    const [extYield, setExtYield] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    // State for tracking Bulk Delete user input
    const [deleteCoffee, setDeleteCoffee] = useState('');
    const [deleteRecipe, setDeleteRecipe] = useState('');

    // Load Data
    const loadData = async () => {
        try{
            const [brewResultsRes, brewRecipeRes, coffeesRes, statusRes, brewerTypesRes] = await Promise.all([
                fetch(`${backendURL}/api/brewresults`),    
                fetch(`${backendURL}/api/brewrecipes`),
                fetch(`${backendURL}/api/coffees`),
                fetch(`${backendURL}/api/recipestatuses`),
                fetch(`${backendURL}/api/brewertypes`)
            ]);
            setBrewResults(await brewResultsRes.json());
            setBrewRecipes(await brewRecipeRes.json());
            setCoffees(await coffeesRes.json());
            setRecipeStatuses(await statusRes.json());
            setBrewerTypes(await brewerTypesRes.json());
        } catch {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        loadData()
    }, []);

    {/* Citation for use of AI Tools
    Date: 03/02/26
    Prompt used: 
        Add a useEffect hook to update the extYield state whenever dose, bevYield, or tdsReading changes, 
        and update the input value to use state instead of inline calculation.
    AI Source: Microsoft Copilot VSCode integration.
    */}
    useEffect(() => {
        if (dose && bevYield && tdsReading) {
            const calculated = ((tdsReading * bevYield) / dose).toFixed(2);
            setExtYield(calculated);
        } else {
            setExtYield('');
        }
    }, [dose, bevYield, tdsReading]);

    // Set coffee_id when user selects coffee in Add Brew Result form
    useEffect(() => {
        if(selectedCoffee) {
            const coffee = coffees.find(c => c.coffee_name === selectedCoffee);
            setSelectedCoffeeID(coffee.coffee_id);
        } else {
            setSelectedCoffeeID('');
        }
    }, [selectedCoffee]);

    // Auto fill the Add Brew Result form with data from the selected recipe
    const onRecipeSelect = (e) => {
        const recipeId = Number(e.target.value);
        setSelectedBrewRecipe(recipeId);
        const recipe = brewRecipes.find(r => r.recipe_id === recipeId);
        if(recipe) {
            setSelectedBrewerType(recipe.brewer_type);
            setDose(recipe.target_dose);
            setYield(recipe.target_yield);
            setGrindSize(recipe.target_grind_size);
            setWaterTemp(recipe.target_water_temp);
            setBrewTime(recipe.target_brew_time);
        }
    };

    // Add brew result to the database
    const addBrewResult = async () => {
        const newBrewResult = {
            selectedBrewRecipe,
            selectedCoffeeID,
            dose,
            bevYield,
            grindSize,
            waterTemp,
            brewTime,
            tdsReading,
            extYield,
            selectedRating
        }
        const response = await fetch(`${backendURL}/api/brewresults/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBrewResult)
        })
        if(response.status === 201) {
            const newRow = await response.json()
            console.log("Added brew result");

            {/* Citation for following code:
                Date: 03/02/26
                Adapted from: React ES6 Spread Operator
                Source URL: https://www.w3schools.com/react/react_es6_spread.asp */}

            // Add the new result to the brewResults state array to rerender with new records
            setBrewResults(brewResults => [...brewResults, newRow]);
        } else {
            console.log("Failed to add Brew Result");
        }   
    };

    // Handle user clicking Delete button on a record in the table
    const handleSingleDelete = async (result_id_to_delete) => {
        const rid = parseInt(result_id_to_delete);
        const deleteRes = await fetch(`${backendURL}/api/brewresults/${rid}`, { method: 'DELETE' });
        if(deleteRes.status === 200) {
            setBrewResults(brewResults => brewResults.filter(br => br.result_id !== rid));
        } else {
            console.log("Failed to delete Brew Result.");
        }
    };

    // Handle the user completing the Bulk Delete form
    const handleBulkDelete = async (delete_recipe_id, delete_coffee_id) => {
        const rid = parseInt(delete_recipe_id);
        const cid = parseInt(delete_coffee_id);
        const bulkDeleteRes = await fetch(`${backendURL}/api/brewresults/${rid}/${cid}`, { method: 'DELETE'});
        if(bulkDeleteRes.status === 204) {
            setBrewResults(brewResults => brewResults.filter(br => !((br.recipe_id === rid) && (br.coffee_id === cid))));
        } else {
            console.log("Failed to delete multiple Brew Result records");
        }
    }

    return (
        <div className="pageContent">
            <h2>View, Add, and Delete Brew Results</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Result ID</th>
                        <th>Recipe ID</th>
                        <th>Coffee Name</th>
                        <th>Roaster</th>
                        <th>Recipe Status</th>
                        <th>Brewer Type</th>
                        <th>Dose</th>
                        <th>Yield</th>
                        <th>Grind Size</th>
                        <th>Water Temp</th>
                        <th>Brew Time</th>
                        <th>TDS Reading</th>
                        <th>Ext Yield</th>
                        <th>Rating</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brewResults.map(bres => (
                        <tr key={bres.result_id}>
                            <td>{bres.result_id}</td>
                            <td>{bres.recipe_id}</td>
                            <td>{bres.coffee_name}</td>
                            <td>{bres.roaster}</td>
                            <td>{bres.recipe_status}</td>
                            <td>{bres.brewer}</td>
                            <td>{bres.actual_dose}</td>
                            <td>{bres.actual_yield}</td>
                            <td>{bres.actual_grind_size}</td>
                            <td>{bres.actual_water_temp}</td>
                            <td>{bres.actual_brew_time}</td>
                            <td>{bres.tds_reading}</td>
                            <td>{bres.ext_yield}</td>
                            <td>{bres.rating}</td>
                            <td>
                                    <button type='submit' onClick={() => handleSingleDelete(bres.result_id)}>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for bulk deleting Brew Results */}
            <form onSubmit={event => { event.preventDefault(); }}>
                <h3>Bulk Delete</h3>
                <p>Select a Coffee and Brew Recipe to delete all matching Brew Result records.</p>
                <p>Note: deleting a record from Coffees OR BrewRecipes will also remove all records that are associated with either the coffee or recipe.
                </p>
                <p>
                    <label>
                        <select value={deleteCoffee} onChange={event => setDeleteCoffee(event.target.value)} required>
                            <option value="">-- Select a Coffee --</option>
                            {coffees.map(c => (
                                <option key={c.coffee_id} value={c.coffee_id}>{c.coffee_name}</option>
                            ))}
                        </select>
                    </label>
                </p>

                <p>
                        <select value={deleteRecipe} onChange={event => setDeleteRecipe(event.target.value)} required>
                            <option value="">-- Select a Brew Recipe --</option>
                            {brewRecipes.map(br => (
                                <option key={br.recipe_id} value={br.recipe_id}>{br.recipe_id}</option>
                            ))}
                        </select>
                </p>

                <p>
                    <button onClick={() => handleBulkDelete(deleteRecipe, deleteCoffee)}>Delete Multiple Records</button>
                </p>
            </form>

            {/* Form for adding a Brew Result */}
            <form onSubmit={event => { event.preventDefault(); addBrewResult(); }}>
                <h3>Add Brew Result</h3>
                <p>
                    <label>Recipe ID
                        <select value={selectedBrewRecipe} onChange={event => onRecipeSelect(event)} required>
                            <option value="">-- Select a Recipe --</option>
                            {brewRecipes.map(r => (
                                    <option key={r.recipe_id} value={r.recipe_id}>{r.recipe_id}</option>
                                ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Coffee Name
                        <select value={selectedCoffee} onChange={event => setSelectedCoffee(event.target.value)} required>
                            <option value="">-- Select a Coffee --</option>
                            {coffees.map(coffee => (
                                    <option key={coffee.coffee_id} value={coffee.coffee_name}>{coffee.coffee_name}</option>
                                ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Brewer Type
                        <input type="text" id="brewerType" name="brewerType" value={selectedBrewerType}placeholder="autofills when recipe selected" readOnly></input>
                    </label> 
                </p>

                <p>
                    <label>Actual Dose
                        <input type="number" step="0.01" id="dose" name="dose" min="0" max="999.99" value={dose} placeholder="autofills when recipe selected" required 
                        onChange={ event => { setDose(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Yield
                        <input type="number" step="0.01" id="yield" name="yield" min="0" max="9999.99" value={bevYield} placeholder="autofills when recipe selected" required 
                        onChange={ event => { setYield(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Grind Size
                        <input type="number" step="0.01" id="grindSize" name="grindSize" min="0" max="99.99" value={grindSize} placeholder="autofills when recipe selected" required 
                        onChange={ event => { setGrindSize(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Water Temp
                        <input type="number" step="0.01" id="waterTemp" name="waterTemp" min="0" max="999.99" value={waterTemp} placeholder="autofills when recipe selected" required 
                        onChange={ event => { setWaterTemp(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Brew Time
                        <input type="text" id="brewTime" name="brewTime" min="0" value={brewTime} placeholder="autofills when recipe selected" required 
                        onChange={ event => { setBrewTime(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>TDS Reading
                        <input type="number" step="0.01" id="tdsReading" name="tdsReading" min="0" max="9.99" placeholder="ex. 1.43" required 
                        onChange={ event => { setTdsReading(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>EXT Yield
                        <input type="number" step="0.01" id="extYield" name="extYield" min="0" placeholder="auto-calculated" 
                        value={extYield} 
                        readOnly></input>
                    </label>
                </p>

                <p>
                    <label>Rating
                        <select value={selectedRating} onChange={event => setSelectedRating(event.target.value)} required>
                            <option value="">-- Select a rating --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                </p>
                
                <p>
                    <button type="submit">
                        Add Brew Result
                    </button>
                </p>
            </form>
        </div>
    )
} 

export default BrewResults;