import React from 'react';

function CoffeeLots({ lots }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Coffee Lots</h2>
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lot Number</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Elevation (m)</th>
                        <th>Process</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lots.map(lot => (
                        <tr key={lot.lot_id}>
                            <td>{lot.lot_id}</td>
                            <td>{lot.lot_number}</td>
                            <td>{lot.city}</td>
                            <td>{lot.country}</td>
                            <td>{lot.elevation}</td>
                            <td>{lot.process}</td>
                            <td>MD icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoffeeLots;