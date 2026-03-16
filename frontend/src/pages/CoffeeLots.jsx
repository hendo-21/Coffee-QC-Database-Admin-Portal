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
//      Refactor data fetching to use Promise.all() for concurrent fetching.
//      Refactor form input to only accept numerical key inputs.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from 'react';

function CoffeeLots({ backendURL }) {
    // Init state for loading table data
    const [lots, setLots] = useState([]);
    const [locations, setLocations] = useState([]);
    const [processingStyles, setProcessingStyles] = useState([]);

    // Init state for storing user input
    const [newLotNumber, setNewLotNumber] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newMetersElevation, setNewMetersElevation] = useState("");
    const [newProcess, setNewProcess] = useState("");

    // Load data
    const loadData = async () => {
        try {
            const [LotsRes, LocationsRes, ProcessingStylesRes] = await Promise.all([
                fetch(`${backendURL}/api/coffeelots`),
                fetch(`${backendURL}/api/locations`),
                fetch(`${backendURL}/api/processingstyles`)
            ]);

            setLots(await LotsRes.json());
            setLocations(await LocationsRes.json());
            setProcessingStyles(await ProcessingStylesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    // Add CoffeeLot to the database
    const addCoffeeLot = async () => {
        // Prepare variables for request body
        const lot_number = newLotNumber;
        const location_id = Number(newLocation);
        const meters_elevation = newMetersElevation;
        const process_id = Number(newProcess);
        const newCoffeeLotRecord = {
            lot_number,
            location_id,
            meters_elevation,
            process_id
        }
        
        // Post to db
        try{
            const response = await fetch(`${backendURL}/api/coffeelots`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCoffeeLotRecord)
            })
            if(response.status === 200) {
                setNewLotNumber("");
                setNewLocation("");
                setNewMetersElevation("");
                setNewProcess("");
                loadData();
            } else {
                alert("Failed to add record.");
                console.log("Failed to add record with status:", response.status);
            }
        } catch (err) {
            console.error("Error adding coffee lot varietal:", err)
        }
    };

    // Delete a CoffeeLot record from the database
    const deleteCoffeeLot = async(lotIdToDelete) => {
        if(window.confirm("Are you sure you want to delete this record? This will also delete associated records in Coffee Lot Varietals.")) {
            try {
                const lot_id = Number(lotIdToDelete);
                const response = await fetch(`${backendURL}/api/coffeelots/${lot_id}`, { method: 'DELETE' });
                if (response.status === 204) {
                    loadData();
                } else {
                    alert("Failed to delete coffee.");
                    console.log("Failed to delete coffee with status:", response.status);
                }
            } catch (err) {
                alert("Could not connect to the server.");
                console.error("Connection error:", err);
            }
        }
    };

    return (
        <div className="pageContent">
            <h2>View, Add and Delete Coffee Lots</h2>

            {/* Display table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Lot ID</th>
                        <th>Lot Number</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Elevation (m)</th>
                        <th>Process</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(lots) && lots.map(lot => (
                        <tr key={lot.lot_id}>
                            <td>{lot.lot_id}</td>
                            <td>{lot.lot_number}</td>
                            <td>{lot.city}</td>
                            <td>{lot.country}</td>
                            <td>{lot.elevation}</td>
                            <td>{lot.process}</td>
                            <td>
                                <button className="deleteButton" onClick={() => deleteCoffeeLot(lot.lot_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr/>

            {/* Form for adding a Coffee Lot */}
            <form onSubmit={ e => {e.preventDefault(); addCoffeeLot();} }>
                <h3>Add a Coffee Lot</h3>
                <p>
                    <label>Lot Number:</label>

                    {/* Citation for use of AI Tools:
                    Date: 02/18/26
                    Prompts used: Refactor this input snippet to preserve text-only input, but reject user key-inputs that 
                        are not numerical values 0-9.
                    AI Source: GitHub Copilot VSCode integration */}
                    <input 
                            id="newLotNumber"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={newLotNumber}
                            onKeyDown={(e) => {
                                const allowedKeys = [
                                    "Backspace",
                                    "Delete",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "Tab",
                                    "Home",
                                    "End"
                                ];

                                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setNewLotNumber(e.target.value.replace(/\D/g, ""))}
                            placeholder="Enter unique lot number"
                            required>
                    </input>
                </p>

                <p>
                    <label>Location:</label>
                    <select id="setLocation"
                        value={newLocation}
                        onChange={e => setNewLocation(e.target.value)}
                        required>
                        <option value="">-- Select a Location --</option>
                        {locations.map(l => (
                            <option key={l.location_id} value={l.location_id}>{`${l.city} ${l.country}`}</option>
                        ))}
                    </select>
                </p>

                <p>
                    <label>Meters Elevation:</label>
                    <input 
                        id="newMetersElevation"
                        type="number"
                        value={newMetersElevation}
                        onChange={e => setNewMetersElevation(e.target.value)}
                        placeholder="Enter meters elevation"
                        required>
                    </input>
                </p>

                <p>
                    <label>Process Style:</label>
                    <select id="setProcess"
                        value={newProcess}
                        onChange={e => setNewProcess(e.target.value)}
                        required>
                        <option value="">-- Select a Process Style --</option>
                        {processingStyles.map(p => (
                            <option key={p.process_id} value={p.process_id}>{p.process_name}</option>
                        ))}
                    </select>
                </p>

                <p>
                    <button type="submit">Add Coffee Lot</button>
                </p>

            </form>

        </div>
    );
}

export default CoffeeLots;
