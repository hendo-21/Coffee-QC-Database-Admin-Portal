function Navigation() {
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
            <button className="resetButton">Reset Database</button>
        </nav>
    )
} export default Navigation;