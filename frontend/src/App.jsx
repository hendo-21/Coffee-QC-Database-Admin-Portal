import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Locations from './pages/Locations';
import Roasters from './pages/Roasters';
import Coffees from './pages/Coffees';
import CoffeeLots from './pages/CoffeeLots';
import Varietals from './pages/Varietals';
import CoffeeLotVarietals from './pages/CoffeeLotVarietals';
import ProcessingStyles from './pages/ProcessingStyles';
import RoastTypes from './pages/RoastTypes';
import BrewerTypes from './pages/BrewerTypes';
import RecipeStatuses from './pages/RecipeStatuses';
import BrewRecipes from './pages/BrewRecipes';
import BrewResults from './pages/BrewResults';
import CreateBrewResult from './pages/CreateBrewResult';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
// 1884
const backendPort = 1890;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
    const contentStyle = {
        flex: 1,
        padding: "20px"
    };

    return (
        <div className="pageContainer">
            <Navigation />
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/locations" element={<Locations backendURL={backendURL} />}/>
                    <Route path="/roasters" element={<Roasters backendURL={backendURL} />} />
                    <Route path="/coffees" element={<Coffees backendURL={backendURL}/>} />
                    <Route path="/coffeelots" element={<CoffeeLots backendURL={backendURL}/>} />
                    <Route path="/varietals" element={<Varietals backendURL={backendURL}/>} />
                    <Route path="/coffeelotvarietals" element={<CoffeeLotVarietals backendURL={backendURL}/>} />
                    <Route path="/processingstyles" element={<ProcessingStyles backendURL={backendURL}/>} />
                    <Route path="/roasttypes" element={<RoastTypes backendURL={backendURL}/>} />
                    <Route path="/brewertypes" element={<BrewerTypes backendURL={backendURL}/>} />
                    <Route path="/recipestatuses" element={<RecipeStatuses backendURL={backendURL}/>} />
                    <Route path="/brewrecipes" element={<BrewRecipes backendURL={backendURL}/>} />
                    <Route path="/brewresults" element={<BrewResults backendURL={backendURL}/>} />
                    <Route path="/create-brew-result" element={<CreateBrewResult backendURL={backendURL}/>} />
                </Routes>

                <footer><p>&copy; 2026 Ian Henderson & Nicholas Park</p></footer>
            </div>
        </div>
    );

} export default App;