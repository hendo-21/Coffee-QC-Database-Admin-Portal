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
                        <th>Edit</th>
                        <th>Delete</th>
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
                            <td>
                                    <button type='submit'>
                                        Edit
                                    </button>
                            </td>
                            <td>
                                    <button type='submit'>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoffeeLots;