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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brewerTypes.map(brewerTypes => (
                        <tr key={brewerTypes.brewer_id}>
                            <td>{brewerTypes.brewer_id}</td>
                            <td>{brewerTypes.brewer_type}</td>
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

            {/* Form to add Brewer Type */}
            <form className="brewerTypeForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Brewer Type
                        <input type="text" id="brewerType" name="brewerType" placeholder="Chemex" required 
                            onChange={ event => { setBrewerType(event.target.value) } }></input>
                    </label>
                </p>

                <button type="submit">
                        Add Brewer Type
                </button>

                </div>
            </form>
        </>
    )

}

export default BrewerTypes;