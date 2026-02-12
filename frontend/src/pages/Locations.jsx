import React, { useState, useEffect } from 'react';

function Locations() {
    const [locations, setLocations] = useState([]);
    const [newCity, setNewCity] = useState("");
    const [newCountry, setNewCountry] = useState("");

    // 1. Load data
    const loadLocations = async () => {
        const response = await fetch('/api/locations');
        const dbData = await response.json();
        setLocations(dbData);
    }
    useEffect(() => {
        loadLocations()
    }, [])

    // 2. Add a new location
    const addLocation = (e) => {
        e.preventDefault();
        const newLocation = {
            city: newCity,
            country: newCountry
        };

        fetch('/api/locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLocation)
        })
            .then(() => {
                setNewCity(""); // Clear input
                setNewCountry("");
                loadLocations(); // Refresh to show new data
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Page Description</h2>
            <p>
                Create, update, and delete locations from the database. Locations apply to Coffee Lots and Roasters.
            </p>
            <hr style={{ margin: '40px 0' }} />

            <h2>Manage Locations</h2>

            {/* Table for READ */}
            <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(loc => (
                        <tr key={loc.location_id}>
                            <td>{loc.location_id}</td>
                            <td>{loc.city}</td>
                            <td>{loc.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for CREATE */}
            <form onSubmit={addLocation}>
                <h3>Add New Location</h3>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'flex-end',
                }}>


                    <div>
                        <label>City: </label>
                        <input
                            value={newCity}
                            onChange={e => setNewCity(e.target.value)}
                            placeholder="Enter City"
                            required
                        />
                    </div>

                    <div>
                        <label>Country: </label>
                        <input
                            value={newCountry}
                            onChange={e => setNewCountry(e.target.value)}
                            placeholder="Enter Country"
                            required
                        />
                    </div>

                    <button type="submit">Add Location</button>
                </div>
            </form>
        </div>
    );
}

export default Locations;