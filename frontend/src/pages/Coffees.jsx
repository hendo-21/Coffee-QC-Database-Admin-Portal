import React, { useState, useEffect } from 'react';

function Coffees({ backendURL }) {
    // Init state for fetching tables
    const [coffees, setCoffees] = useState([]);
    const [roastTypes, setRoastTypes] = useState([]);
    const [roasters, setRoasters] = useState([]);
    const [lots, setLots] = useState([]);

    // Init state for tracking user input
    const [newName, setNewName] = useState("");
    const [newRoasterId, setNewRoasterId] = useState("");
    const [newLotId, setNewLotId] = useState("");
    const [newRoastTypeId, setNewRoastTypeId] = useState("");

    // Load data
    const loadData = async () => {
        try {
            const [CoffeesRes, RoastTypesRes, RoastersRes, LotsRes] = await Promise.all([
                fetch(`${backendURL}/api/coffees`),
                fetch(`${backendURL}/api/roasttypes`),
                fetch(`${backendURL}/api/roasters`),
                fetch(`${backendURL}/api/coffeelots`)
            ]);

            setCoffees(await CoffeesRes.json());
            setRoastTypes(await RoastTypesRes.json());
            setRoasters(await RoastersRes.json());
            setLots(await LotsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData()
    }, [])

    // 2. Add a new coffee
    const addCoffee = (e) => {
        e.preventDefault();

        const newCoffee = {
            coffee_name: newName,
            roaster_id: Number(newRoasterId),
            lot_id: Number(newLotId),
            roast_type_id: Number(newRoastTypeId)
        };

        fetch(`${backendURL}/api/coffees/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoffee)
        })
            .then(() => {
                setNewName(""); // Clear input
                setNewRoasterId("");
                setNewLotId("");
                setNewRoastTypeId("");
                loadData(); // Refresh to show new data
            });
    };


    // 3. Delete a Coffee
    const handleCoffeeDelete = async (coffee_id_to_delete) => {
        const cid = parseInt(coffee_id_to_delete);
        const deleteRes = await fetch(`${backendURL}/api/coffees/${cid}`, { method: 'DELETE' });
        if (deleteRes.status === 204) {
            setCoffees(prevCoffees => prevCoffees.filter(coffee => coffee.coffee_id !== cid));
        } else {
            console.error("Failed to delete Coffee record.");
        }
    };

    {/* Citation for use of AI Tools
    Date: 02/11/26
    Prompt(s) used: 
        - Would it be better to have CoffeeLots, Varietals, CoffeeLotVarietals, 
        and ProcessingStyles as separate components that are imported into Coffees? Explain why.
        - Create individual component files for each function just mentioned using the form elements already in this file. 
        Import those components to this component (Coffees.jsx) and pass the data to each newly created component file as appropriate.
    AI Source: Microsoft Copilot VSCode integration. Model: Claude Haiku 4.5.
    */}
    return (
        <div className="pageContent">
            <h2>View, Add and Delete Coffees</h2>

            {/* Table for READ */}
            <table border="1" style={{ marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>Coffee ID</th>
                        <th>Coffee Name</th>
                        <th>Roaster</th>
                        <th>Lot Number</th>
                        <th>Roast Type</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {coffees.map(coffee => (
                        <tr key={coffee.coffee_id}>
                            <td>{coffee.coffee_id}</td>
                            <td>{coffee.coffee_name}</td>
                            <td>{coffee.roaster}</td>
                            <td>{coffee.lot_number}</td>
                            <td>{coffee.roast}</td>
                            <td>
                                <button type='button' onClick={() => handleCoffeeDelete(coffee.coffee_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for CREATE */}
            <form onSubmit={addCoffee} style={{ marginTop: '20px' }}>
                <h3>Add New Coffee</h3>
                <p>
                    <label>Coffee Name:
                        <input
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            placeholder="Enter Coffee Name"
                            required
                        />
                    </label>
                </p>

                <p>
                    <label>Roaster:
                        <select
                            value={newRoasterId}
                            onChange={e => setNewRoasterId(e.target.value)}
                            required
                        >
                            <option value="">Select Roaster</option>
                            {roasters.map(roaster => (
                                <option key={roaster.roaster_id} value={roaster.roaster_id}>
                                    {roaster.roaster_name}</option>
                            ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Lot:
                        <select
                            value={newLotId}
                            onChange={e => setNewLotId(e.target.value)}
                            placeholder="Enter Lot ID"
                            required
                        >
                            <option value="">Select Lot</option>
                            {lots.map(lot => (
                                <option key={lot.lot_id} value={lot.lot_id}>
                                    {lot.lot_number}</option>
                            ))}
                        </select>
                    </label>
                </p>

                <p>
                    <label>Roast Type:
                        <select
                            value={newRoastTypeId}
                            onChange={e => setNewRoastTypeId(e.target.value)}
                            placeholder="Enter Roast Type ID"
                            required
                        >
                            <option value="">Select Roast Type</option>
                            {roastTypes.map(roasttype => (
                                <option key={roasttype.roast_type_id} value={roasttype.roast_type_id}>
                                    {roasttype.roast_name}</option>
                            ))}
                        </select>
                    </label>
                </p>

                <p>
                    <button type="submit">Add Coffee</button>
                </p>
            </form>
        </div>
    );
}

export default Coffees;