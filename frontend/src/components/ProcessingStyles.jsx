import React from 'react';

function ProcessingStyles({ processes }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Processing Styles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Process Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map(process => (
                        <tr key={process.process_id}>
                            <td>{process.process_id}</td>
                            <td>{process.process_name}</td>
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

export default ProcessingStyles;