import React, { useState, useEffect } from 'react';

function CoffeeLots({ backendURL }) {
    const [lots, setLots] = useState([]);
    const [locations, setLocations] = useState([]);
    const [processingStyles, setProcessingStyles] = useState([]);

    // Load data
    const loadData = async () => {
        try {
            const [LotsRes, LocationsRes, ProcessingStylesRes] = await Promise.all([
                fetch(`${backendURL}/api/coffeelots`),
                fetch(`${backendURL}/api/locations`),
                fetch(`${backendURL}/api/processingstyles`)
            ]);

            setLots(await LotsRes.json());
            setLocations(await LocationsRes.json());
            setProcessingStyles(await ProcessingStylesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="pageContent">
            <h2>View Coffee Lots</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lot Number</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Elevation (m)</th>
                        <th>Process</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(lots) && lots.map(lot => (
                        <tr key={lot.lot_id}>
                            <td>{lot.lot_id}</td>
                            <td>{lot.lot_number}</td>
                            <td>{lot.city}</td>
                            <td>{lot.country}</td>
                            <td>{lot.elevation}</td>
                            <td>{lot.process}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoffeeLots;
