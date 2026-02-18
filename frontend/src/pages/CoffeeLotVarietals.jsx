import React, { useState, useEffect } from 'react';

function CoffeeLotVarietals({ backendURL }) {
    const [lotVarietals, setLotVarietals] = useState([]);
    const [lots, setLots] = useState([]);
    const [varietals, setVarietals] = useState([]);

    // Load data
    const loadData = async () => {
        try {
            const [LotVarietalsRes, LotsRes, VarietalsRes] = await Promise.all([
                fetch(`${backendURL}/api/coffeelotvarietals`),
                fetch(`${backendURL}/api/coffeelots`),
                fetch(`${backendURL}/api/varietals`)
            ]);

            setLotVarietals(await LotVarietalsRes.json());
            setLots(await LotsRes.json());
            setVarietals(await VarietalsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="pageContent">
            <h2>View Coffee Lot Varietals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Lot Number</th>
                        <th>Varietal Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(lotVarietals) && lotVarietals.map(lotvar => (
                        <tr key={`${lotvar.lot_number}-${lotvar.varietal_name}`}>
                            <td>{lotvar.lot_number}</td>
                            <td>{lotvar.varietal_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoffeeLotVarietals;
