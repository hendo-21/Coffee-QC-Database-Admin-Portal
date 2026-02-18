import React, { useState } from 'react';

function CoffeeLots({ lots, locations, processingStyles }) {
    // Init state for storing user input
    const [lotNumber, setLotNumber] = useState('');
    const [location, setLocation] = useState('');
    const [elevation, setElevation] = useState('');
    const [process, setProcesses] = useState('');

    return (
        <div style={{ padding: '20px' }}>
            <h2>Coffee Lots</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lot Number</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Elevation (m)</th>
                        <th>Process</th>
                    </tr>
                </thead>
                <tbody>
                    {lots.map(lot => (
                        <tr key={lot.lot_id}>
                            <td>{lot.lot_id}</td>
                            <td>{lot.lot_number}</td>
                            <td>{lot.city}</td>
                            <td>{lot.country}</td>
                            <td>{lot.elevation}</td>
                            <td>{lot.process}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add CoffeeLot
            <form className="coffeeLotForm" onSubmit={event => {event.preventDefault();}}>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1px',
                        alignItems: 'baseline',
                }}>

                <p>
                    <label>Lot Number</label>
                    <input type='text' name='lotNumber' id='lotNumber' placeholder='enter lot number' required
                        onChange={ event => { setLotNumber(event.target.value)}}>
                    </input>
                </p>

                <p>
                    <label>Location</label>
                    <select>
                        <option>-- Select Location --</option>
                        {locations.map(location => (
                            <option key={location.location_id} value={location.city}>
                                {location.city}
                            </option>
                        ))}
                    </select>
                </p>

                <p>
                    <label>Meters Elevation</label>
                    <input type="number" step="1" name="metersElevation" id="metersElevation" placeholder="enter meters elevation" required
                        onChange={ event => { setElevation(event.target.valueAsNumber)}}>
                    </input>
                </p>

                <p>
                    <label>Processing Style</label>
                    <select>
                        <option>-- Select Processing Style</option>
                        {processingStyles.map( processingStyle => (
                            <option key={processingStyle.process_id} value={processingStyle.process_name}>
                                {processingStyle.process_name}
                            </option>
                        ))}
                    </select>
                </p>

                <button type="submit">
                        Add Coffee Lot
                </button>

                </div>
            </form>  */}
        </div>
    );
}

export default CoffeeLots;