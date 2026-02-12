import React, { useState } from 'react';

function ProcessingStyles({ processingStyles }) {
    // Init state for storing user input
    const [processingStyle, setProcessingStyle] = useState('');

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
                    {processingStyles.map(process => (
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

            {/* Form to add Processing Style */}
            <form className="recipeStatusForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Processing Style
                        <input type="text" id="processingStyle" name="processingStyle" required 
                            onChange={ event => { setProcessingStyle(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Processing Style
                </button>

                </div>
            </form>
        </div>
    );
};

export default ProcessingStyles;