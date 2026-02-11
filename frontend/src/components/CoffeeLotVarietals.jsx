import React from 'react';

function CoffeeLotVarietals({ lotVarietals }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Coffee Lot Varietals</h2>
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Lot Number</th>
                        <th>Varietal Name</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lotVarietals.map(lotvar => (
                        <tr key={`${lotvar.lot_number}-${lotvar.varietal_name}`}>
                            <td>{lotvar.lot_number}</td>
                            <td>{lotvar.varietal_name}</td>
                            <td>MD icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoffeeLotVarietals;