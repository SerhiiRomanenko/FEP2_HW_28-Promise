const $navigation = document.querySelector(".main__navigation");
const $showBox = document.querySelector(".main__showCont");
const $pagination = document.querySelector(".main__pagination");

const URL = "https://swapi.dev/api/";

//------------------------------------------------------------------------------function RENDER PEOPLE------------------------------------------------//
function closeBox() {
    $showBox.innerHTML = '';
    $pagination.innerHTML = '';
}

function renderPeople(people) {
    $showBox.innerHTML = "";
    people.results.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML += `
                          <div class="card" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Birthday: ${item.birth_year}</p>
                                <p class="card-text">Gender: ${item.gender}</p>
                                <p class="card-text">Mass: ${item.mass}</p>
                                <p class="card-text">Height: ${item.height}</p>
                                <p class="card-text">Hair color: ${item.hair_color}</p>
                                <a data-url="${item.url}" class="btn btn-primary" onclick=showCardPerson(this)>About</a>
                              </div>
                           </div>
                    `;
        $showBox.append(div);
    })
}

//------------------------------------------------------------------------------function RENDER ONE CARD PERSON------------------------------------------------//
function showCardPerson(card) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", card.getAttribute("data-url"));
    xhr.addEventListener("load", function (event) {
        if (xhr.status !== 200) {
            throw new Error(`HTTP error: status ${xhr.status}`);
        } else {
            $showBox.innerHTML = '';
            const data = JSON.parse(xhr.response);
            const div = document.createElement("div");
            div.classList.add("col", "oneCardPerson");
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text"><u>Birthday:</u> ${data.birth_year}</p>
                    <p class="card-text"><u>Eye color:</u> ${data.eye_color}</p>
                    <p class="card-text"><u>Gender:</u> ${data.gender}</p>
                    <p class="card-text"><u>Mass:</u> ${data.mass}</p>
                    <p class="card-text"><u>Skin color:</u> ${data.skin_color}</p>
                    <p class="card-text"><u>Height:</u> ${data.height}</p>
                    <p class="card-text"><u>Hair color:</u> ${data.hair_color}</p>
                    <button class="btn btn-primary" onclick=closeBox()>Close</button>
                </div>
            </div>
        `;
            $showBox.append(div);
        }
    });
    xhr.send();

}

//------------------------------------------------------------------------------function RENDER PLANETS------------------------------------------------//
function renderPlanets(planets) {
    $showBox.innerHTML = "";
    planets.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML += `
            <div class="card" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">Diameter: ${item.diameter}</p>
                                <p class="card-text">Population: ${item.population}</p>
                                <p class="card-text">Gravity: ${item.gravity}</p>
                                <p class="card-text">Orbital period: ${item.orbital_period}</p>
                                <p class="card-text">Surface water: ${item.surface_water}</p>
                                <a data-url="${item.url}" class="btn btn-primary" onclick=showCardPlanet(this)>About</a>
                              </div>
                           </div>
        `;
        $showBox.append(div);
    })
}

//------------------------------------------------------------------------------function RENDER ONE CARD PLANET------------------------------------------------//
function showCardPlanet(planet) {
    const promise = fetch(planet.getAttribute("data-url"));
    promise
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`)
            } else {
                return response.json();
            }
        })
        .then(data => {
            $showBox.innerHTML = "";
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text"><u>Climate:</u> ${data.climate}</p>
                            <p class="card-text"><u>Diameter:</u> ${data.diameter}</p>
                            <p class="card-text"><u>Population:</u> ${data.population}</p>
                            <p class="card-text"><u>Rotation period:</u> ${data.rotation_period}</p>
                            <p class="card-text"><u>Gravity:</u> ${data.gravity}</p>
                            <p class="card-text"><u>Orbital period:</u> ${data.orbital_period}</p>
                            <p class="card-text"><u>Surface water:</u> ${data.surface_water}</p>
                            <p class="card-text"><u>Terrain:</u> ${data.terrain}</p>
                            <button class="btn btn-primary" onclick=closeBox()>Close</button>
                        </div>
                    </div>
                `;
            $showBox.append(div);
        })
        .catch(error => console.log(error));
}

//------------------------------------------------------------------------------function RENDER STARSHIPS------------------------------------------------//
function renderStarships(ships) {
    $showBox.innerHTML = "";
    ships.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Cargo capacity: ${item.cargo_capacity}</p>
                    <p class="card-text">Crew: ${item.crew}</p>
                    <p class="card-text">Length: ${item.length}</p>
                    <p class="card-text">Model: ${item.model}</p>
                    <p class="card-text">Passangers: ${item.passengers}</p>
                    <a data-url="${item.url}" class="btn btn-primary" onclick=showCardShip(this)>About</a>
                </div>
            </div>
        `;
        $showBox.append(div);
    })
}

//------------------------------------------------------------------------------function RENDER ONE CARD STARSHIP------------------------------------------------//
function showCardShip(ship) {
    async function getStarships() {
        const response = await fetch(ship.getAttribute("data-url"));
        if (!response.ok) {
            throw new Error(`HTTP failed: ${response.status}`)
        } else {
            return await response.json();
        }
    }

    getStarships().then(starship => {
        $showBox.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML += `
                          <div class="card" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">${starship.name}</h5>
                                <p class="card-text"><u>Cargo capacity:</u> ${starship.cargo_capacity}</p>
                                <p class="card-text"><u>Consumables:</u> ${starship.consumables}</p>
                                <p class="card-text"><u>Cost in credits:</u> ${starship.cost_in_credits}</p>
                                <p class="card-text"><u>Hyperdrive rating:</u> ${starship.hyperdrive_rating}</p>
                                <p class="card-text"><u>Manufacturer:</u> ${starship.manufacturer}</p>
                                <p class="card-text"><u>Max atmosphering speed:</u> ${starship.max_atmosphering_speed}</p>
                                <p class="card-text"><u>Model:</u> ${starship.model}</p>
                                <p class="card-text"><u>Starship class:</u> ${starship.starship_class}</p>
                                <p class="card-text"><u>Crew:</u> ${starship.crew}</p>
                                <p class="card-text"><u>Length:</u> ${starship.length}</p>
                                <p class="card-text"><u>Model:</u> ${starship.model}</p>
                                <p class="card-text">Passangers:</u> ${starship.passengers}</p>
                                <button class="btn btn-primary" onclick=closeBox()>Close</button>
                              </div>
                           </div>
                    `;
        $showBox.append(div);
    })
}

function showPaggination(allCards, figure) {
    $pagination.innerHTML = '';
    console.log(URL + figure + "/?page=2")
    let pagination = null;
    if (allCards.count % 10 === 0) {
        pagination = allCards.count / 10;
    } else {
        pagination = (Math.floor(allCards.count / 10)) + 1;
    }
    const markUp = document.createElement("ul");
    markUp.classList.add("main__paginationList", "pagination", "pagination-lg");
        for (let i = 1; i <=  pagination; i++) {
            markUp.innerHTML += `
                <li class=" page-item">
                    <a class="main__paginationItem page-link"  data-pageUrl=${URL + figure + `/?page=${i}`} onclick=renderPagesPagination(this)>${i}</a>
                </li>
        `;
    }
    $pagination.append(markUp)
}

function renderPagesPagination(button) {
    console.log(button.getAttribute("data-pageUrl"));
}

//------------------------------------------------------------------------------EVENT DELEGATION------------------------------------------------//
$navigation.addEventListener('click', function (event) {
    event.preventDefault();

    //-------------------------------------------------------------------CLICK PERSONS (XML requests)------------------------------------------------//
    if (event.target.classList.contains("main__characters")) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL + "people");
        xhr.addEventListener("load", function () {
            if (xhr.status !== 200) {
                console.log(`HTTP error: status ${xhr.status}`);
            } else {
                const data = JSON.parse(xhr.response);
                renderPeople(data);  // rendered People
                showPaggination(data, "people")
            }
        })
        xhr.send();
    }

    //-----------------------------------------------------------------------CLICK PLANETS (FETCH)------------------------------------------------//
    else if (event.target.classList.contains("main__planets")) {
        const promise = fetch(URL + "planets");
        promise
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                } else {
                    return response.json();
                }
            })
            .then(data => {
                renderPlanets(data.results); // rendered Planets
                showPaggination(data, "planets");
            })
            .catch(error => console.log(error));
    }

    //-------------------------------------------------------------CLICK TRANSPORT (async await FETCH)------------------------------------------------//
    else if (event.target.classList.contains("main__transport")) {

        async function getStarships() {
            const response = await fetch(URL + "starships");
            if (!response.ok) {
                throw new Error(`HTTP failed: ${response.status}`)
            } else {
                return await response.json();
            }
        }

        getStarships().then(starships => {
            renderStarships(starships.results);  // rendered Ships
            showPaggination(starships, "starships");
        })
    }
})