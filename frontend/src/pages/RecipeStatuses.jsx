import React, { useState, useEffect } from "react";

function RecipeStatuses({ backendURL }) {
    // Init state to store user input
    const [recipeStatuses, setRecipeStatus] = useState([]);

    // Load Data
    const loadData = async () => {
        try {
            const recipeStatusesRes = await fetch(`${backendURL}/api/recipestatuses`);
            setRecipeStatus(await recipeStatusesRes.json());
        } catch {
            console.error("Error fetching RecipeStatuses", error);
        }
    };
    useEffect(() => {
        loadData()
    }, []);

    // TODO: POST recipe status to db

    return (
        <div className="pageContent">
            <h2>View Recipe Statuses</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Status ID</th>
                        <th>Status Type</th>
                    </tr>
                </thead>
                <tbody>
                    {recipeStatuses.map(recipeStatuses => (
                        <tr key={recipeStatuses.status_id}>
                            <td>{recipeStatuses.status_id}</td>
                            <td>{recipeStatuses.status_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add Recipe Status 
            <form className="recipeStatusForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Recipe Status
                        <input type="text" id="recipeStatus" name="recipeStatus" required 
                            onChange={ event => { setRecipeStatus(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Recipe Status
                </button>

                </div>
            </form> */}
        </div>
    )
}

export default RecipeStatuses;