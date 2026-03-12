// Citation for use of AI Tools:
// Date: 02/18/26
// Prompts used: refactored to standalone page component from Coffees.jsx, left-side nav layout, table min-width.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from 'react';

function Varietals({ backendURL }) {
    const [varietals, setVarietals] = useState([]);

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

    return (
        <div className="pageContent">
            <h2>View Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Varietal ID</th>
                        <th>Varietal Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(varietals) && varietals.map(varietal => (
                        <tr key={varietal.varietal_id}>
                            <td>{varietal.varietal_id}</td>
                            <td>{varietal.varietal_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Varietals;
