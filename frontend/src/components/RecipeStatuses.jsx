function RecipeStatuses({ recipeStatuses }) {
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
        </>
    )
}

export default RecipeStatuses;