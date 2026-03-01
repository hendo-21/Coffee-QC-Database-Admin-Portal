import React, { useState, useEffect } from 'react';

function RoastTypes({backendURL}) {
    const [roastTypes, setRoastTypes] = useState([]);

    // 1. Load data
    const loadRoastTypes = async () => {
        try {
            const response = await fetch(`${backendURL}/api/roasttypes`);
            const data = await response.json();
            setRoastTypes(data);
        } catch (err) {
            console.error("Error fetching roast types:", err);
        }
    };

    useEffect(() => {
        loadRoastTypes();
    }, []);

    return (
        <div className="pageContent">
            <h2>View Roast Types</h2>
            <table border="1" style={{ width: '500px' }}>
                <thead>
                    <tr>
                        <th>Roast ID</th>
                        <th>Roast Type</th>
                    </tr>
                </thead>
                <tbody>
                    {roastTypes.map(roasttype => (
                        <tr key={roasttype.roast_type_id}>
                            <td>{roasttype.roast_type_id}</td>
                            <td>{roasttype.roast_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default RoastTypes;