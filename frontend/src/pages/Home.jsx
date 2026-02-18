import Navigation from '../components/Navigation';
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
                        <span>Manage location information for Roasters and Coffees.</span>
                    </Link>

                    <Link to="/roasters" >
                        <span className="homepageIndexElement">Roasters: </span>
                        <span>View roaster contact info and manage roasters.</span>
                    </Link>

                    <Link to="/coffees">
                        <span className="homepageIndexElement">Coffees:</span>
                        <span>Manage all origin-specific coffee information: Coffees, Coffee Lots, Coffee Lot Varietals, Varietals, and Processing Styles.</span>
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