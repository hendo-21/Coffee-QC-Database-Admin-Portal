import React, { useState, useEffect } from 'react';

function Roasters({backendURL}) {
    const [roasters, setRoasters] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({ roaster_name: '', location_id: '' });

    // Display roasters
    const loadRoasters = async () => {
        const response = await fetch(`${backendURL}/api/roasters`);
        const dbData = await response.json();
        setRoasters(dbData);
    }
    useEffect(() => {
        loadRoasters()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${backendURL}/api/roasters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(() => window.location.reload());
    };

    return (
        <div>
            <h2>Page Description</h2>
                <p>
                    Create, edit and delete Roasters from the database.
                </p>
            <hr style={{ margin: '40px 0' }} />

            <h2>Manage Roasters</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(roasters) && roasters.map(r => (
                        <tr key={r.roaster_id}>
                            <td>{r.roaster_name}</td>
                            <td>{r.email}</td>
                            <td>{r.city}</td>
                            <td>{r.country}</td>
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

            <h3>Add New Roaster</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" onChange={e => setFormData({ ...formData, roaster_name: e.target.value })} />
                <select onChange={e => setFormData({ ...formData, location_id: e.target.value })}>
                    <option value="">Select Location</option>
                    {locations.map(l =>
                        <option key={l.location_id} value={l.location_id}>
                            {l.city}, {l.country}
                        </option>)}
                </select>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Roasters;