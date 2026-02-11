
function BrewerTypes ({ brewerTypes }) {
    return (
        <>
            <h2>Brewer Types</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Brewer ID</th>
                        <th>Brewer Type</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brewerTypes.map(brewerTypes => (
                        <tr key={brewerTypes.brewer_id}>
                            <td>{brewerTypes.brewer_id}</td>
                            <td>{brewerTypes.brewer_type}</td>
                            <td>MD Icons go here</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )

}

export default BrewerTypes;