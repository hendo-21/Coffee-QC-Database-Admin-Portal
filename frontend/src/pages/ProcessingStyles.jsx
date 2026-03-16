// Citation for following code:
// Date: 02/09/26
// Code for the front end components adapted from "Exploration - Web Application Technology".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

// Citation for following code:
// Date: 02/09/26
// Code for the CUD operations adapted from "Exploration - Implementing CUD operations in your app".
// Source URL: https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

// Citation for use of AI Tools:
// Date: 02/18/26
// Prompts used: 
//      Refactor to standalone page component from Coffees.jsx, maintain left-side nav layout, page, table, and form styling.
// AI Source: GitHub Copilot VSCode integration.

import React, { useState, useEffect } from 'react';

function ProcessingStyles({ backendURL }) {
    const [processingStyles, setProcessingStyles] = useState([]);

    // Load data
    const loadData = async () => {
        try {
            const response = await fetch(`${backendURL}/api/processingstyles`);
            const data = await response.json();
            setProcessingStyles(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="pageContent">
            <h2>View Processing Styles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Process ID</th>
                        <th>Process Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(processingStyles) && processingStyles.map(process => (
                        <tr key={process.process_id}>
                            <td>{process.process_id}</td>
                            <td>{process.process_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProcessingStyles;
