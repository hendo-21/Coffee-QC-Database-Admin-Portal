import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBrewResult({ backendURL}) {
    // Init state for fetching data from required tables for dropdowns
    const [coffees, setCoffees] = useState([]);
    const [recipeStatuses, setRecipeStatuses] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);

    // Init state for tracking user input
    const [selectedCoffee, setSelectedCoffee] = useState('');
    const [selectedRecipeStatus, setSelectedRecipeStatus] = useState('');
    const [selectedBrewerType, setSelectedBrewerType] = useState('');
    const [dose, setDose] = useState('');
    const [bevYield, setYield] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [waterTemp, setWaterTemp] = useState('');
    const [brewTime, setBrewTime] = useState('');
    const [tdsReading, setTdsReading] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    // Initialize navigate to nav back to BrewResults on submit
    const navigate = useNavigate();

    // Load data
     useEffect(() => {
        const fetchData = async () => {
            try {
                const [coffeesRes, statusRes, brewerTypesRes] = await Promise.all([
                    fetch(`${backendURL}/api/coffees`),
                    fetch(`${backendURL}/api/recipestatuses`),
                    fetch(`${backendURL}/api/brewertypes`)
                ]);                
                setCoffees(await coffeesRes.json());
                setRecipeStatuses(await statusRes.json());
                setBrewerTypes(await brewerTypesRes.json());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // TODO
    const addBrewResult = async () => {
        // post data
        navigate('/brew-results')
    }

    return (
        <>
            <h2>Create Brew Result</h2>
            <form onSubmit={event => { event.preventDefault(); addBrewResult(); }}>
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
                    <label>Recipe Status
                        <select value={selectedRecipeStatus} onChange={event => setSelectedRecipeStatus(event.target.value)} required>
                            <option value="">-- Select a Recipe Status --</option>
                            {recipeStatuses.map(status => (
                                    <option key={status.status_id} value={status.status_id}>{status.status_type}</option>
                                ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Brewer Type
                        <select value={selectedBrewerType} onChange={event => setSelectedBrewerType(event.target.value)} required>
                            <option value="">-- Select a Brewer Type --</option>
                            {brewerTypes.map(type => (
                                    <option key={type.brewer_id} value={type.brewer_id}>{type.brewer_type}</option>
                                ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Dose
                        <input type="number" step="0.01" id="dose" name="dose" min="0" placeholder="min: 0.00" required 
                        onChange={ event => { setDose(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Yield
                        <input type="number" step="0.01" id="yield" name="yield" min="0" placeholder="min: 0.00" required 
                        onChange={ event => { setYield(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Grind Size
                        <input type="number" step="0.01" id="grindSize" name="grindSize" min="0" placeholder="min: 0.00" required 
                        onChange={ event => { setGrindSize(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Water Temp
                        <input type="number" step="0.01" id="waterTemp" name="waterTemp" min="0" placeholder="min: 0.00" required 
                        onChange={ event => { setWaterTemp(event.target.valueAsNumber) } }></input>
                    </label>
                </p>

                <p>
                    <label>Brew Time
                        <input type="number" step="0.01" id="brewTime" name="brewTime" min="0" placeholder="min:sec ex. 4:00" required 
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

                <button type="submit">
                    Add
                </button>
            </form>
        </>
    )
} 

export default CreateBrewResult;