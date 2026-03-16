// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

import React, { useState, useEffect } from 'react';

function Locations({ backendURL }) {
    const [locations, setLocations] = useState([]);

    // Load data
    const loadLocations = async () => {
        const response = await fetch(`${backendURL}/api/locations`);
        const dbData = await response.json();
        setLocations(dbData);
    }
    useEffect(() => {
        loadLocations()
    }, [])

    return (
        <div className="pageContent">
            <h2>View Locations</h2>

            {/* Table for READ */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Location ID</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(loc => (
                        <tr key={loc.location_id}>
                            <td>{loc.location_id}</td>
                            <td>{loc.city}</td>
                            <td>{loc.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Locations;