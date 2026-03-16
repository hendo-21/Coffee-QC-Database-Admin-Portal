// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

import React, { useState, useEffect } from 'react';

function Roasters({backendURL}) {
    const [roasters, setRoasters] = useState([]);

    // Display roasters table
    const loadRoasters = async () => {
        const response = await fetch(`${backendURL}/api/roasters`);
        const dbData = await response.json();
        setRoasters(dbData);
    }
    useEffect(() => {
        loadRoasters()
    }, [])

    return (
        <div className="pageContent">
            <h2>View Roasters</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Roaster ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(roasters) && roasters.map(r => (
                        <tr key={r.roaster_id}>
                            <td>{r.roaster_id}</td>
                            <td>{r.roaster_name}</td>
                            <td>{r.email}</td>
                            <td>{r.city}</td>
                            <td>{r.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Roasters;