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
                        <th>ID</th>
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
