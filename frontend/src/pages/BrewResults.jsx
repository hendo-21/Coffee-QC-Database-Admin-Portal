import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BrewResults() {
    // Init state for fetching tables
    const [brewresults, setBrewResults] = useState([]);

    // Init navigate to nav to add brew result form on button click
    const navigate = useNavigate();

    // Load Data
    const loadData = async () => {
        try{
            const brewResultsRes = await fetch('/api/brewresults');
            setBrewResults(await brewResultsRes.json());
        } catch {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        loadData()
    }, []);

    // Rneder CreateBrewResult component (add form)
    const handleAddClick = async () => {
        navigate('/create-brew-result')
    }

    return (
        <>
            <div>
                <h2>Manage Brew Results</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Recipe ID</th>
                            <th>Coffee Name</th>
                            <th>Roaster</th>
                            <th>Recipe Status</th>
                            <th>Brewer Type</th>
                            <th>Dose</th>
                            <th>Yield</th>
                            <th>Grind Size</th>
                            <th>Water Temp</th>
                            <th>Brew Time</th>
                            <th>TDS Reading</th>
                            <th>Ext Yield</th>
                            <th>Rating</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brewresults.map(bres => (
                            <tr key={bres.result_id}>
                                <td>{bres.recipe_id}</td>
                                <td>{bres.coffee_name}</td>
                                <td>{bres.roaster}</td>
                                <td>{bres.recipe_status}</td>
                                <td>{bres.brewer}</td>
                                <td>{bres.actual_dose}</td>
                                <td>{bres.actual_yield}</td>
                                <td>{bres.actual_grind_size}</td>
                                <td>{bres.actual_water_temp}</td>
                                <td>{bres.actual_brew_time}</td>
                                <td>{bres.tds_reading}</td>
                                <td>{bres.ext_yield}</td>
                                <td>{bres.rating}</td>
                                <td>MD Icons go here</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={handleAddClick} style={{padding: '1rem', margin: '1rem'}}>
                    Add Brew Result
                </button>
            </div>
        </>
    )
} 

export default BrewResults;