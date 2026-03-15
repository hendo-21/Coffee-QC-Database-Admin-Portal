// Citation for use of AI Tools:
// Date: 02/18/26
// Prompts used: 
//      Refactor to standalone page component from Coffees.jsx.
//      Refactor data fetching to use Promise.all() for concurrent fetching.
// AI Source: GitHub Copilot VSCode integration.

// Citation for use of AI Tools:
// Date: 03/14/26
// Prompts used for Edit finctionality: 
//    1. Review my code snippet. When the user clicks the Edit button, how do I limit editing to a single row? All row dropdowns become visible.
//    2. Refactor the selected section to use row-specific edit state.
// AI Source: GitHub Copilot VSCode integration. 

import React, { useState, useEffect } from 'react';

function CoffeeLotVarietals({ backendURL }) {
    // Init state for fetching table data
    const [lotVarietals, setLotVarietals] = useState([]);
    const [lots, setLots] = useState([]);
    const [varietals, setVarietals] = useState([]);

    // Init state for storing user selections in forms
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedVarietal, setSelectedVarietal] = useState("");

    // Track which specific row is currently being edited
    const [editingRowKey, setEditingRowKey] = useState(null);
    const [oldLotId, setOldLotId] = useState("");
    const [oldVarietalId, setOldVarietalId] = useState("");
    const [newVarietalId, setNewVarietalId] = useState("");

    // Load data
    const loadData = async () => {
        try {
            const [LotVarietalsRes, LotsRes, VarietalsRes] = await Promise.all([
                fetch(`${backendURL}/api/coffeelotvarietals`),
                fetch(`${backendURL}/api/coffeelots`),
                fetch(`${backendURL}/api/varietals`)
            ]);

            setLotVarietals(await LotVarietalsRes.json());
            setLots(await LotsRes.json());
            setVarietals(await VarietalsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Citation for use of AI Tools:
    // Date: 03/14/26
    // Prompts used: 
    //    1. Review my code snippet. When the user clicks the Edit button, how do I limit editing to a single row? All row dropdowns become visible.
    //    2. Refactor the selected section to use row-specific edit state.
    // AI Source: GitHub Copilot VSCode integration. 

    // Update association between a coffee lot and varietal (Update on M:N)
    const updateVarietal = async () => {
        const updatedRecord = {
            old_lot_id: Number(oldLotId),
            old_varietal_id: Number(oldVarietalId),
            new_lot_id: Number(oldLotId),
            new_varietal_id: Number(newVarietalId)
        };
        try {
            const response = await fetch(`${backendURL}/api/coffeelotvarietals/${oldLotId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRecord)
            });
            if (response.status === 200) {
                // Reload table data
                loadData();

                // Reset state for editing functionality
                setEditingRowKey(null);
                setOldLotId("");
                setOldVarietalId("");
                setNewVarietalId("");
            } else {
                alert("Failed to update record.");
                console.log("Failed to update record with status:", response.status);
            }
        } catch (err) {
            console.error("Error updating coffee lot varietal:", err);
        }
    };

    // Create a CoffeeLotVarietal record (Create on M:N)
    const addCoffeeLotVarietal = async () => {
        const lot = lots.find(l => l.lot_number === selectedLot);
        const lot_id = lot.lot_id;
        const varietal = varietals.find(v => v.varietal_name === selectedVarietal);
        const varietal_id = varietal.varietal_id;
        const newRecord = {lot_id, varietal_id};
        try {
            const response = await fetch(`${backendURL}/api/coffeelotvarietals`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord)
            });
            if(response.status === 200) {
                setSelectedLot("");
                setSelectedVarietal("");
                loadData();
            } else {
                alert("Failed to add record.");
                console.log("Failed to add record with status:", response.status)
            }
        } catch (err) {
            console.error("Error adding coffee lot varietal:", err)
        }
    }

    // Delete a record from CoffeeLotVarietals table (DELETE on M:N)
    const deleteCoffeeLotVarietal = async (lot_varietal_to_delete) => {
        if(window.confirm("Are you sure you want to delete this record?")) {
            try {
                const lot = lots.find(l => l.lot_number === lot_varietal_to_delete.lot_number);
                const lot_id = lot.lot_id;
                const varietal = varietals.find(v => v.varietal_name === lot_varietal_to_delete.varietal_name);
                const varietal_id = varietal.varietal_id;
                const response = await fetch(`${backendURL}/api/coffeelotvarietals/${lot_id}/${varietal_id}`, { method: "DELETE"})
                if(response.status === 204) {
                    loadData();
                }
            } catch (err) {
                console.error("Error deleting coffee lot varietal:", err);
            }
        }
    }

    return (
        <div className="pageContent">
            {/* Display the table */}
            <h2>View, Edit, Add, and Delete Coffee Lot Varietals</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Lot Number</th>
                        <th>Varietal Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                {/*
                Citation for use of AI Tools:
                Date: 03/14/26
                Prompts used: 
                    1. Review my code snippet. When the user clicks the Edit button, how do I limit editing to a single row? All row dropdowns become visible.
                    2. Refactor the selected section to use row-specific edit state.
                AI Source: GitHub Copilot VSCode integration. 
                */}
                <tbody>
                    {lotVarietals.map(lotvar => {
                        const rowKey = `${lotvar.lot_id}-${lotvar.varietal_id}`;
                        const isEditing = editingRowKey === rowKey;

                        return (
                        <tr key={rowKey}>
                            <td>{lotvar.lot_number}</td>
                            <td>{isEditing ?
                                    (<select value={newVarietalId} onChange={e => setNewVarietalId(e.target.value)}>
                                        {varietals.map(v => (
                                            <option key={v.varietal_id} value={v.varietal_id}>{v.varietal_name}</option>
                                        ))}
                                    </select>)
                                : (<>{lotvar.varietal_name}</>)
                                }
                            </td>
                            <td>
                                {isEditing ? (<button className="editButton"type="button" onClick={updateVarietal}>Save</button>)
                                : (<button className= "editButton" type="button" onClick={() => {
                                    setOldLotId(lotvar.lot_id);
                                    setOldVarietalId(lotvar.varietal_id);
                                    setNewVarietalId(lotvar.varietal_id);
                                    setEditingRowKey(rowKey);
                                }} disabled={editingRowKey !== null}>Edit</button>)
                                }
                            </td>
                            <td>
                                <button className="deleteButton" onClick={() => deleteCoffeeLotVarietal(lotvar)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>

            <hr/>

            {/* Form for CREATE in M:N */}

            <form onSubmit={ e => {e.preventDefault(); addCoffeeLotVarietal();} }>
                <h3>Add a Coffee Lot Varietal record</h3>
                <p>
                    <label>Lot Number:</label>
                    <select id="selectedLotNumber" value={selectedLot} onChange={e => setSelectedLot(e.target.value)} required>
                        <option value="">-- Select a Lot Number --</option>
                        {lots.map(l => (
                            <option key={l.lot_id} value={l.lot_number}>{l.lot_number}</option>
                        ))}
                    </select>
                </p>

                <p>
                    <label>Varietal Name:</label>
                    <select id="selectedVarietalName" value={selectedVarietal} onChange={e => setSelectedVarietal(e.target.value)} required>
                        <option value="">-- Select a Varietal --</option>
                        {varietals.map(v => (
                            <option key={v.varietal_id} value={v.varietal_name}>{v.varietal_name}</option>
                        ))}
                    </select>
                </p>

                <p>
                    <button type="submit">Add Coffee Lot Varietal</button>
                </p>

            </form>
        </div>
    );
}

export default CoffeeLotVarietals;
