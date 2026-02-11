import React, { useState } from "react";

function RecipeStatuses({ recipeStatuses }) {
    // Init state to store user input
    const [recipeStatus, setRecipeStatus] = useState('');

    // TODO: POST recipe status to db

    return (
        <>
            <h2>Recipe Statuses</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Status ID</th>
                        <th>Status Type</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipeStatuses.map(recipeStatuses => (
                        <tr key={recipeStatuses.status_id}>
                            <td>{recipeStatuses.status_id}</td>
                            <td>{recipeStatuses.status_type}</td>
                            <td>MD Icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add Recipe Status */}
            <form className="recipeStatusForm" onSubmit={event => {event.preventDefault();}}>
                <p>
                    <label>Recipe Status
                        <input type="text" id="recipeStatus" name="recipeStatus" required 
                            onChange={ event => { setRecipeStatus(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Recipe Status
                </button>
            </form>
        </>
    )
}

export default RecipeStatuses;