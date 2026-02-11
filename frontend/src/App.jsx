import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Locations from './pages/Locations';
import Roasters from './pages/Roasters';
import Coffees from './pages/Coffees';
import BrewRecipes from './pages/BrewRecipes';
import BrewResults from './pages/BrewResults';
import CreateBrewRecipe from './pages/CreateBrewRecipe';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 1884;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/roasters" element={<Roasters />} />
                <Route path="/coffees" element={<Coffees />} />
                <Route path="/brewrecipes" element={<BrewRecipes />} />
                <Route path="/brewresults" element={<BrewResults />} />
                <Route path="/create-brew-result" element={<CreateBrewRecipe />} />
            </Routes>

            <footer><p>&copy; 2026 Ian Henderson & Nicholas Park</p></footer>
        </>
    );

} export default App;