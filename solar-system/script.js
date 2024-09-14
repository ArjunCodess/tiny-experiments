const planets = [
    { name: 'Mercury', color: '#8c7e6d', size: 8, orbitSize: 60, description: 'The smallest planet, closest to the sun. It has a rocky surface and extreme temperature variations.' },
    { name: 'Venus', color: '#e3bb76', size: 12, orbitSize: 80, description: 'Often called Earth\'s twin due to similar size and mass. It has a toxic atmosphere and is the hottest planet.' },
    { name: 'Earth', color: '#4f97dd', size: 12, orbitSize: 100, description: 'Our home planet, the only known world to harbor life. It\'s covered mostly by water and has a life-sustaining atmosphere.' },
    { name: 'Mars', color: '#d1693f', size: 10, orbitSize: 120, description: 'Known as the Red Planet. It has the largest volcano and canyon in the solar system.' },
    { name: 'Jupiter', color: '#e0ae6f', size: 24, orbitSize: 160, description: 'The largest planet, a gas giant with a Great Red Spot storm that has raged for over 150 years.' },
    { name: 'Saturn', color: '#f7e2a1', size: 20, orbitSize: 200, description: 'Famous for its distinctive ring system. It\'s the least dense planet and could float in water.' },
    { name: 'Uranus', color: '#9fc4e5', size: 16, orbitSize: 240, description: 'An ice giant that rotates on its side, causing extreme seasonal variations.' },
    { name: 'Neptune', color: '#3e54e8', size: 16, orbitSize: 280, description: 'The windiest planet, with speeds reaching 1,200 mph. It has a dynamic storm system called the Great Dark Spot.' },
];

let selectedPlanet = null;
let focusedPlanet = null;

function generateStarsAndPlanets() {
    const solarSystem = document.getElementById('solarSystem');

    // Generate stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite`;
        solarSystem.appendChild(star);
    }

    // Generate planets and orbits
    planets.forEach((planet, index) => {
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = planet.orbitSize * 2 + 'px';
        orbit.style.height = planet.orbitSize * 2 + 'px';
        solarSystem.appendChild(orbit);

        const planetContainer = document.createElement('div');
        planetContainer.className = 'planet-container';
        planetContainer.style.animation = `orbit ${15 + index * 5}s linear infinite`;
        planetContainer.style.zIndex = planets.length - index; // Add this line

        const planetElement = document.createElement('div');
        planetElement.className = 'planet';
        planetElement.style.width = planet.size + 'px';
        planetElement.style.height = planet.size + 'px';
        planetElement.style.backgroundColor = planet.color;
        planetElement.style.top = `-${planet.size / 2}px`;
        planetElement.style.left = `${planet.orbitSize - planet.size / 2}px`;

        planetElement.addEventListener('mouseenter', () => handlePlanetHover(planet.name));
        planetElement.addEventListener('mouseleave', () => handlePlanetHover(null));
        planetElement.addEventListener('click', (event) => {
            event.stopPropagation();
            handlePlanetClick(planet.name);
        });

        planetContainer.appendChild(planetElement);
        solarSystem.appendChild(planetContainer);
    });
}

function handlePlanetHover(planetName) {
    const planetInfo = document.getElementById('planetInfo');
    if (planetName && !focusedPlanet) {
        planetInfo.textContent = planetName;
        planetInfo.style.display = 'block';
        selectedPlanet = planetName;
    } else {
        planetInfo.style.display = 'none';
        selectedPlanet = null;
    }
}

function handlePlanetClick(planetName) {
    focusedPlanet = planetName;
    updatePlanetFocus();
}

function updatePlanetFocus() {
    const focusedPlanetInfo = document.getElementById('focusedPlanetInfo');
    const planetElements = document.querySelectorAll('.planet');

    if (focusedPlanet) {
        const planet = planets.find(p => p.name === focusedPlanet);
        document.getElementById('focusedPlanetName').textContent = planet.name;
        document.getElementById('focusedPlanetDescription').textContent = planet.description;
        focusedPlanetInfo.style.display = 'block';
        setTimeout(() => focusedPlanetInfo.classList.add('visible'), 10);

        planetElements.forEach(el => {
            if (el.parentNode.style.animation.includes(`${15 + planets.findIndex(p => p.name === focusedPlanet) * 5}s`)) {
                el.classList.add('focused');
            } else {
                el.classList.add('dimmed');
            }
        });
    } else {
        focusedPlanetInfo.classList.remove('visible');
        setTimeout(() => focusedPlanetInfo.style.display = 'none', 300);

        planetElements.forEach(el => {
            el.classList.remove('focused', 'dimmed');
        });
    }
}

function toggleSolarSystemFacts() {
    const facts = document.getElementById('solarSystemFacts');
    if (facts.style.display === 'none') {
        facts.style.display = 'block';
        facts.style.top = '50%';
        facts.style.left = '50%';
        facts.style.transform = 'translate(-50%, -50%)';
        setTimeout(() => facts.classList.add('visible'), 10);
    } else {
        closeSolarSystemFacts();
    }
}

function closeSolarSystemFacts() {
    const facts = document.getElementById('solarSystemFacts');
    facts.classList.remove('visible');
    setTimeout(() => facts.style.display = 'none', 300);
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = document.getElementById('factsDragHandle');

    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        const newTop = element.offsetTop - pos2;
        const newLeft = element.offsetLeft - pos1;
        
        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Add event listener for the close button
document.getElementById('closeFactsButton').addEventListener('click', closeSolarSystemFacts);

// Make the solar system facts card draggable
makeDraggable(document.getElementById('solarSystemFacts'));

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const autocompleteResults = document.getElementById('autocompleteResults');

    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        autocompleteResults.style.display = 'block';
    });

    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !autocompleteResults.contains(event.target)) {
            autocompleteResults.style.display = 'none';
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter planets based on search term
    const filteredPlanets = planets.filter(planet => 
        planet.name.toLowerCase().includes(searchTerm) || 
        planet.description.toLowerCase().includes(searchTerm)
    );

    // Update autocomplete suggestions
    updateAutocompleteSuggestions(filteredPlanets);

    // Highlight matching planets
    highlightPlanets(filteredPlanets);
}

function updateAutocompleteSuggestions(filteredPlanets) {
    const autocompleteResults = document.getElementById('autocompleteResults');
    autocompleteResults.innerHTML = '';

    filteredPlanets.forEach(planet => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = planet.name;
        item.addEventListener('click', () => {
            document.getElementById('searchInput').value = planet.name;
            handlePlanetClick(planet.name);
            autocompleteResults.style.display = 'none';
        });
        autocompleteResults.appendChild(item);
    });

    autocompleteResults.style.display = filteredPlanets.length > 0 ? 'block' : 'none';
}

function highlightPlanets(filteredPlanets) {
    const planetElements = document.querySelectorAll('.planet');
    planetElements.forEach(el => {
        const planetName = planets[Array.from(el.parentNode.parentNode.children).indexOf(el.parentNode) - 1].name;
        if (filteredPlanets.some(p => p.name === planetName)) {
            el.classList.add('highlight');
        } else {
            el.classList.remove('highlight');
        }
    });
}

// Initialize the search feature and the solar system
initializeSearch();
generateStarsAndPlanets();