import React from 'react';

function Varietals({ varietals }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Varietal Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {varietals.map(varietal => (
                        <tr key={varietal.varietal_id}>
                            <td>{varietal.varietal_id}</td>
                            <td>{varietal.varietal_name}</td>
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

export default Varietals;