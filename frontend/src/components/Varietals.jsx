import React from 'react';

function Varietals({ varietals }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Varietals</h2>
            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Varietal Name</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {varietals.map(varietal => (
                        <tr key={varietal.varietal_id}>
                            <td>{varietal.varietal_id}</td>
                            <td>{varietal.varietal_name}</td>
                            <td>MD icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Varietals;