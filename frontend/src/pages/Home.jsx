import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <div className="pageContent">
                <h2>Welcome to California Coffee Co.'s Coffee Quality Control database</h2>
                <h3 style={{marginBottom: "5px"}}>Index</h3>
                <div className="homepageIndex">
                    <Link to="/locations" >
                        <span className="homepageIndexElement">Locations: </span>
                        <span>View locations for Roasters and Coffee Lots.</span>
                    </Link>

                    <Link to="/roasters" >
                        <span className="homepageIndexElement">Roasters: </span>
                        <span>View roaster information.</span>
                    </Link>

                    <Link to="/coffees">
                        <span className="homepageIndexElement">Coffees:</span>
                        <span>View Coffees and delete them from the database.</span>
                    </Link>

                    <Link to="/coffeelots">
                        <span className="homepageIndexElement">Coffee Lots:</span>
                        <span>View Coffee lot information: location, elevation, and processing style.</span>
                    </Link>

                    <Link to="/varietals">
                        <span className="homepageIndexElement">Varietals:</span>
                        <span>View the varietals that compose the coffee lots.</span>
                    </Link>

                    <Link to="/coffeelotvarietals">
                        <span className="homepageIndexElement">Coffee Lot Varietals:</span>
                        <span>View the varietals that makeup each lot of coffee.</span>
                    </Link>

                    <Link to="/processingstyles">
                        <span className="homepageIndexElement">Processing Styles:</span>
                        <span>View the processing styles used for the available coffee lots.</span>
                    </Link>

                    <Link to="/roasttypes">
                        <span className="homepageIndexElement">Roast Types:</span>
                        <span>View the roast types used by the available roasters.</span>
                    </Link>

                    <Link to="/brewertypes">
                        <span className="homepageIndexElement">Brewer Types:</span>
                        <span>View the brewer types available for use in Brew Recipes.</span>
                    </Link>

                    <Link to="/recipestatuses">
                        <span className="homepageIndexElement">Recipe Statuses:</span>
                        <span>View the recipe statuses available for Brew Recipes.</span>
                    </Link>

                    <Link to="/brewrecipes">
                        <span className="homepageIndexElement">Brew Recipes: </span>
                        <span>Manage all brewing-recipe related information including Brewer Types and Recipe Statuses.</span>
                    </Link>

                    <Link to="/brewresults">
                        <span className="homepageIndexElement">Brew Results: </span>
                        <span>View and add Brew Results.</span>
                    </Link>
                </div>
            </div>
        </>
    )
} export default Home;