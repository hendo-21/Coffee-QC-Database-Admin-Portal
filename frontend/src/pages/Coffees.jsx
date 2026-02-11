import React, { useState, useEffect } from 'react';
import CoffeeLots from '../components/CoffeeLots';
import Varietals from '../components/Varietals';
import CoffeeLotVarietals from '../components/CoffeeLotVarietals';
import ProcessingStyles from '../components/ProcessingStyles';

function Coffees() {
    // Init state for fetching tables
    const [coffees, setCoffees] = useState([]);
    const [lots, setLots] = useState([]);
    const [varietals, setVarietals] = useState([]);
    const [lotVarietals, setCoffeeLotVarietals] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [roastTypes, setRoastTypes] = useState([]);
    const [roasters, setRoasters] = useState([]);

    // Init state for tracking user input
    const [newName, setNewName] = useState("");
    const [newRoasterId, setNewRoasterId] = useState("");
    const [newLotId, setNewLotId] = useState("");
    const [newRoastTypeId, setNewRoastTypeId] = useState("");

    // Load data
    const loadData = async () => {

        {/* Citation for use of AI Tools
        Date: 02/11/26
        Prompt(s) used: 
            - Can this code be refactored for greater efficiency?
            - Refactor this code using the concurrent fetching described.
        AI Source: Microsoft Copilot VSCode integration. Model: Claude Haiku 4.5.
        */}

        try {
            const [CoffeesRes, LotsRes, VarietalsRes, CoffeeLotVarietalsRes, ProcessesRes, RoastTypesRes, RoastersRes] = await Promise.all([
                fetch('/api/coffees'),
                fetch('/api/coffeelots'),
                fetch('/api/varietals'),
                fetch('/api/coffeelotvarietals'),
                fetch('/api/processingstyles'),
                fetch('/api/roasttypes'),
                fetch('/api/roasters')
            ]);

            setCoffees(await CoffeesRes.json());
            setLots(await LotsRes.json());
            setVarietals(await VarietalsRes.json());
            setCoffeeLotVarietals(await CoffeeLotVarietalsRes.json());
            setProcesses(await ProcessesRes.json());
            setRoastTypes(await RoastTypesRes.json());
            setRoasters(await RoastersRes.json());
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
            roaster_id: newRoasterId,
            lot_id: newLotId,
            roast_type_id: newRoastTypeId
        };

        fetch('/api/coffees', {
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


    {/* Citation for use of AI Tools
    Date: 02/11/26
    Prompt(s) used: 
        - Would it be better to have CoffeeLots, Varietals, CoffeeLotVarietals, 
        and ProcessingStyles as separate components that are imported into Coffees? Explain why.
        - Create individual component files for each function just mentioned. Import those components
        to this component (Coffees.jsx) and pass the data to each newly created component file as appropriate.
    AI Source: Microsoft Copilot VSCode integration. Model: Claude Haiku 4.5.
    */}
    return (
        <div style={{ padding: '20px' }}>
            <h2>Page Description</h2>
                <p>
                    Create, edit and delete Coffees. On this page you also have acccess to dependant subtables.
                </p>
                <p>
                    Create coffee lots, varietals, assign lots to varietals, and add processing styles as needed to populate dropdowns for Coffee record creation.
                </p>
            <hr style={{ margin: '40px 0' }} />

            <h2>Manage Coffees</h2>

            {/* Table for READ */}
            <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Coffee Name</th>
                        <th>Roaster</th>
                        <th>Lot Number</th>
                        <th>Roast Type</th>
                        <th>Edit / Delete</th>
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
                            <td>MD icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for CREATE */}
            <form onSubmit={addCoffee} style={{ marginTop: '20px' }}>
                <h3 style={{ marginBottom: '10px' }}>Add New Coffee</h3>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '10px',
                    alignItems: 'flex-end'
                }}>

                    <div>
                        <label>Coffee Name: </label>
                        <input
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            placeholder="Enter Coffee Name"
                            required
                        />
                    </div>

                    <div>
                        <label>Roaster: </label>
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
                    </div>

                    <div>
                        <label>Lot: </label>
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
                    </div>

                    <div>
                        <label>Roast Type: </label>
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
                    </div>

                    <button type="submit" style={{ padding: '5px 15px' }}>Add Coffee</button>
                </div>
            </form>

            <hr style={{ margin: '40px 0' }} />
            <CoffeeLots lots={lots} />

            <hr style={{ margin: '40px 0' }} />
            <Varietals varietals={varietals} />

            <hr style={{ margin: '40px 0' }} />
            <CoffeeLotVarietals lotVarietals={lotVarietals} />

            <hr style={{ margin: '40px 0' }} />
            <ProcessingStyles processes={processes} />
        </div>
    );
}

export default Coffees;