import React, {useState} from "react";

function BrewerTypes ({ brewerTypes }) {
    // Init state for storing user input
    const [brewerType, setBrewerType] = useState('');

    // TODO: POST to BrewerTypes table

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

            {/* Form to add Brewer Type */}
            <form className="brewerTypeForm" onSubmit={event => {event.preventDefault();}}>
                <p>
                    <label>Brewer Type
                        <input type="text" id="brewerType" name="brewerType" placeholder="Chemex" required 
                            onChange={ event => { setBrewerType(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Brewer Type
                </button>
            </form>
        </>
    )

}

export default BrewerTypes;