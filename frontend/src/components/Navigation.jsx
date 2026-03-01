function Navigation() {

    const handleResetDatabase = async () => {
        if (window.confirm("Are you sure you want to reset the database?")) {
            try {
                const response = await fetch('/api/reset-db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    alert("Database reset successfully.");
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    alert("Error: " + errorData.error);
                }
            } catch (err) {
                console.error("Connection error:", err);
                alert("Could not reach the server");
            }

        }
    };


    return (
        <nav>
            <a href="/"><span>Home</span></a>
            <a href="/locations"><span>Locations</span></a>
            <a href="/roasters"><span>Roasters</span></a>
            <a href="/coffees"><span>Coffees</span></a>
            <a href="/coffeelots"><span>Coffee Lots</span></a>
            <a href="/varietals"><span>Varietals</span></a>
            <a href="/coffeelotvarietals"><span>Coffee Lot Varietals</span></a>
            <a href="/processingstyles"><span>Processing Styles</span></a>
            <a href="/roasttypes"><span>Roast Types</span></a>
            <a href="/brewertypes"><span>Brewer Types</span></a>
            <a href="/recipestatuses"><span>Recipe Statuses</span></a>
            <a href="/brewrecipes"><span>Brew Recipes</span></a>
            <a href="/brewresults"><span>Brew Results</span></a>
            <button className="resetButton" onClick={handleResetDatabase}>Reset Database</button>
        </nav>
    )
} export default Navigation;