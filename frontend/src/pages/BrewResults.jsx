import React, { useState, useEffect } from 'react';

function BrewResults({ backendURL }) {
    // Init state for fetching tables
    const [brewresults, setBrewResults] = useState([]);
    const [brewRecipes, setBrewRecipes] = useState([]);
    const [coffees, setCoffees] = useState([]);
    const [recipeStatuses, setRecipeStatuses] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);


    // Init state for tracking user input
    const [selectedCoffee, setSelectedCoffee] = useState('');
    const [selectedBrewRecipe, setSelectedBrewRecipe] = useState('');
    const [selectedBrewerType, setSelectedBrewerType] = useState('');
    const [dose, setDose] = useState('');
    const [bevYield, setYield] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [brewTime, setBrewTime] = useState('');
    const [tdsReading, setTdsReading] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

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

    // TODO
    const addBrewResult = async () => {
        // post data
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
                    {brewresults.map(bres => (
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
                                    <button type='submit'>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for Adding a Brew Result */}
            <form onSubmit={event => { event.preventDefault(); addBrewResult(); }}>
                <h3>Add Brew Result</h3>
                <p>
                    <label>Recipe ID
                        <select value={selectedBrewRecipe} onChange={event => setSelectedBrewRecipe(event.target.value)} required>
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
                        <input type="text" id="brewerType" name="brewerType" placeholder="autofills when recipe selected" readOnly></input>
                    </label>
                </p>

                <p>
                    <label>Actual Dose
                        <input type="number" step="0.01" id="dose" name="dose" min="0" placeholder="autofills when recipe selected" required 
                        onChange={ event => { setDose(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Yield
                        <input type="number" step="0.01" id="yield" name="yield" min="0" placeholder="autofills when recipe selected" required 
                        onChange={ event => { setYield(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Grind Size
                        <input type="number" step="0.01" id="grindSize" name="grindSize" min="0" placeholder="autofills when recipe selected" required 
                        onChange={ event => { setGrindSize(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Water Temp
                        <input type="number" step="0.01" id="waterTemp" name="waterTemp" min="0" placeholder="autofills when recipe selected" required 
                        onChange={ event => { setWaterTemp(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Actual Brew Time
                        <input type="number" step="0.01" id="brewTime" name="brewTime" min="0" placeholder="autofills when recipe selected" required 
                        onChange={ event => { setBrewTime(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>TDS Reading
                        <input type="number" step="0.01" id="tdsReading" name="tdsReading" min="0" placeholder="ex. 1.43" required 
                        onChange={ event => { setTdsReading(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                {/* Citation for use of AI Tools
                Date: 02/11/26
                Prompt used: 
                    Edit this label so that it autopopulates with a number that is calculated with the formula ((tdsReading * bevYield) / dose). 
                AI Source: Microsoft Copilot VSCode integration. Model: Claude Haiku 4.5
                */}
                <p>
                    <label>EXT Yield
                        <input type="number" step="0.01" id="extYield" name="extYield" min="0" placeholder="auto-calculated" 
                        value={dose && bevYield && tdsReading ? ((tdsReading * bevYield) / dose).toFixed(2) : ''} 
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
                        Add
                    </button>
                </p>
            </form>
        </div>
    )
} 

export default BrewResults;