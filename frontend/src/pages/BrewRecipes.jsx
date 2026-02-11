import React, { useState, useEffect } from 'react';
import BrewerTypes from '../components/BrewerTypes';
import RecipeStatuses from '../components/RecipeStatuses';

function BrewRecipes() {
    // Set state for fetching tables
    const [brewRecipes, setBrewRecipes] = useState([]);
    const [brewerTypes, setBrewerTypes] = useState([]);
    const [recipeStatuses, setBrewStatuses] = useState([]);

    // 1. Load data
    const loadData = async () => {
        try {
            const [brewRecipesRes, brewerTypesRes, recipeStatusesRes] = await Promise.all([
                fetch('/api/brewrecipes'),
                fetch('/api/brewertypes'),
                fetch('/api/recipestatuses')
            ]);
            setBrewRecipes(await brewRecipesRes.json());
            setBrewerTypes(await brewerTypesRes.json());
            setBrewStatuses(await recipeStatusesRes.json());
        } catch {
            console.error('Error fetching data:', error);
        };
    };
    useEffect(() => {
        loadData()
    }, []);

    return (
        <>
            <div>
                <h2>Page Description</h2>
                <p>Create, edit and delete brew recipes. On this page you also have acccess to dependant subtables.
                    Create brewer types as needed to build your recipe.
                </p>
                <hr style={{ margin: '40px 0' }} />

                <h2>Manage Brew Recipes</h2>


                {/* Table for BrewRecipes */}
                <table border="1">
                    <thead>
                        <tr>
                            <th>Brewer Type</th>
                            <th>Target Dose</th>
                            <th>Target Yield</th>
                            <th>Target Grind Size</th>
                            <th>Target Water Temp</th>
                            <th>Target Brew Time</th>
                            <th>Recipe Status</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brewRecipes.map(br => (
                            <tr key={br.recipe_id}>
                                <td>{br.brewer_type}</td>
                                <td>{br.target_dose}</td>
                                <td>{br.target_yield}</td>
                                <td>{br.target_grind_size}</td>
                                <td>{br.target_water_temp}</td>
                                <td>{br.target_brew_time}</td>
                                <td>{br.status}</td>
                                <td>MD Icons go here</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Table for Brewer Types */}
                <hr style={{ margin: '40px 0' }} />
                <BrewerTypes brewerTypes={brewerTypes} />

                {/* Table for Recipe Statuses */}
                <hr style={{ margin: '40px 0' }} />
                <RecipeStatuses recipeStatuses={recipeStatuses} />
            </div>
        </>
    )
} 

export default BrewRecipes;