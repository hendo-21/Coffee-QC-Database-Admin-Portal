// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436


import React, { useState, useEffect } from 'react';

function RoastTypes({backendURL}) {
    const [roastTypes, setRoastTypes] = useState([]);

    // Load RoastTypes table
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