import React, { useState, useEffect } from "react";

function BrewerTypes ({ backendURL }) {
    // Init state for storing user input
    const [brewerTypes, setBrewerTypes] = useState([]);

    // Load data
    const loadData = async () => {
        try {
            const brewerTypesRes = await fetch(`${backendURL}/api/brewertypes`);
            setBrewerTypes(await brewerTypesRes.json());
        } catch {
            console.error("Error fetching BrewerTypes", error);
        }
    };
    useEffect(() => {
        loadData()
    }, []);

    // TODO: POST to BrewerTy..pes table

    return (
        <div className="pageContent">
            <h2>View Brewer Types</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Brewer ID</th>
                        <th>Brewer Type</th>
                    </tr>
                </thead>
                <tbody>
                    {brewerTypes.map(brewerTypes => (
                        <tr key={brewerTypes.brewer_id}>
                            <td>{brewerTypes.brewer_id}</td>
                            <td>{brewerTypes.brewer_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add Brewer Type 
            <form className="brewerTypeForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Brewer Type
                        <input type="text" id="brewerType" name="brewerType" placeholder="Chemex" required 
                            onChange={ event => { setBrewerType(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Brewer Type
                </button>

                </div>
            </form> */}
        </div>
    )

}

export default BrewerTypes;