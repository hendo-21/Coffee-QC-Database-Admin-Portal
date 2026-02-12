import React, { useState } from 'react';

function CoffeeLotVarietals({ lotVarietals, lots, varietals }) {
    // Init state for storing user input
    const [selectedCoffeLot, setSelectedCoffeeLot] = useState('');
    const [selectedVarietal, setSelectedVarietal] = useState('');


    return (
        <div style={{ padding: '20px' }}>
            <h2>Coffee Lot Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Lot Number</th>
                        <th>Varietal Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {lotVarietals.map(lotvar => (
                        <tr key={`${lotvar.lot_number}-${lotvar.varietal_name}`}>
                            <td>{lotvar.lot_number}</td>
                            <td>{lotvar.varietal_name}</td>
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

            {/* Form to add CoffeeLotVarietal */}
            <form className="coffeeLotVarietalForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Lot Number</label>
                    <select>
                        <option>-- Select Lot Number --</option>
                        {lots.map(lot => (
                            <option key={lot.lot_id} value={lot.lot_number}>
                                {lot.lot_number}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    <label>Varietal</label>
                    <select>
                        <option>-- Select Varietal --</option>
                        {varietals.map(varietal => (
                            <option key={varietal.varietal_id} value={varietal.varietal_name}>
                                {varietal.varietal_name}
                            </option>
                        ))}
                    </select>
                </p>

                <button type="submit">
                        Add Coffee Lot Varietal
                </button>

                </div>
            </form>
        </div>
    );
}

export default CoffeeLotVarietals;