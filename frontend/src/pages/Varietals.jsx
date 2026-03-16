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

import React, { useState, useEffect } from 'react';

function Varietals({ backendURL }) {
    // Init state for loading data
    const [varietals, setVarietals] = useState([]);

    // Init state for storing user input
    const [newVarietalName, setNewVarietalName] = useState("");

    // Load data
    const loadData = async () => {
        try {
            const response = await fetch(`${backendURL}/api/varietals`);
            const data = await response.json();
            setVarietals(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    // Add a new varetial to the db
    const addVarietal = async() => {
        const varietal_name = newVarietalName;
        const newVarietal = {varietal_name};      
        try{
            const response = await fetch(`${backendURL}/api/varietals`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVarietal)
            });
            if(response.status === 200) {
                setNewVarietalName("");
                loadData();
            } else {
                alert("Failed to add record.");
                console.log("Failed to add record with status:", response.status);
            }
        } catch (err) {
            console.error("Error adding varietal:", err)
        }
    };

    // Delete a record from the varietals table
    const deleteVarietal = async(varietalIdToDelete) => {
        if(window.confirm("Are you sure you want to delete this record? This will also delete associated records in Coffee Lot Varietals.")) {
            try {
                const varietal_id = Number(varietalIdToDelete);
                const response = await fetch(`${backendURL}/api/varietals/${varietal_id}`, { method: 'DELETE' });
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
            {/* Display the table */}
            <h2>View, Add and Delete Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Varietal ID</th>
                        <th>Varietal Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(varietals) && varietals.map(varietal => (
                        <tr key={varietal.varietal_id}>
                            <td>{varietal.varietal_id}</td>
                            <td>{varietal.varietal_name}</td>
                            <td>
                                <button className="deleteButton" onClick={() => deleteVarietal(varietal.varietal_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr/>

            {/* Display the add varietal form */}
            <form onSubmit={ e => {e.preventDefault(); addVarietal();} }>
                <h3>Add a Varietal</h3>
                <p>
                    <label>Varietal Name:</label>
                    <input 
                        id="varietalName"
                        type="text"
                        value={newVarietalName}
                        onChange={e => setNewVarietalName(e.target.value)}
                        placeholder="Enter unique varietal name"
                        required>
                    </input>
                </p>

                <p>
                    <button type="submit">Add Varietal</button>
                </p>

            </form>


        </div>
    );
}

export default Varietals;
