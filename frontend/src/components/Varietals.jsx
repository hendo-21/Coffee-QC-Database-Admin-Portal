import React, { useState } from 'react';

function Varietals({ varietals }) {
    // Init state for storing user input
    const [newVarietal, setNewVarietal] = useState('');

    //TODO: PUT updated varietal
    //TODO: POST new varietal
    //TODO: DELETE varietal

    return (
        <div style={{ padding: '20px' }}>
            <h2>Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Varietal Name</th>
                    </tr>
                </thead>
                <tbody>
                    {varietals.map(varietal => (
                        <tr key={varietal.varietal_id}>
                            <td>{varietal.varietal_id}</td>
                            <td>{varietal.varietal_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add Varietal
            <form className="recipeStatusForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Varietal
                        <input type="text" id="varietal" name="varietal" placeholder='varietal name'required 
                            onChange={ event => { setNewVarietal(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add New Varietal
                </button>

                </div>
            </form>  */}
        </div>
    );
}

export default Varietals;