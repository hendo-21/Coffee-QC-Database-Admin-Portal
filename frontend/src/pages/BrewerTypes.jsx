// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436


import React, { useState, useEffect } from "react";

function BrewerTypes ({ backendURL }) {
    // Init state for storing user input
    const [brewerTypes, setBrewerTypes] = useState([]);

    // Load data
    const loadData = async () => {
        try {
            const brewerTypesRes = await fetch(`${backendURL}/api/brewertypes`);
            setBrewerTypes(await brewerTypesRes.json());
        } catch (err) {
            console.error("Error fetching BrewerTypes:", err);
        }
    };
    useEffect(() => {
        loadData()
    }, []);

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
        </div>
    )

}

export default BrewerTypes;