const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10";
let next = null;
let prev = null;
let last = null;

const listDiv = document.querySelector(".row");
async function populateDetail(poke) {
    await fetch(poke.url)
    .then(result => {
        return result.json()
    })
    .then(pokemonDetail => {
        console.log(pokemonDetail)
        listDiv.innerHTML += `
        <div class="col-md-4 ">
            <div class="panel panel-primary">
            <div class="panel-heading ">
                <h2>
                    ${poke.name}
                </h2>
            </div>
            <div class="panel-body center-block"">
            <img src="${pokemonDetail.sprites.front_default}" alt="${poke.name}">
            </div>
        </div>`
    });
}
async function populateList(url) {
    fetch(url)
        .then(result => {
            return result.json();
        })
        .then(list => {
            console.log(list);
            
            listDiv.innerHTML = "";
            next = list.next;
            prev = list.previous;
            last = list.count - (list.count % 10); //Total items minus the residual of the amont of items per page
            for (const poke of list.results) {
                populateDetail(poke);
            }

        });
}

const nextPage = (evt) => {
    evt.preventDefault();
    if (next !== null)
        populateList(next);

    return;
}

const prevPage = (evt) => {
    evt.preventDefault();
    if (prev !== null)
        populateList(prev);

    return;
}

const firstPage = (evt) => {
    evt.preventDefault();
    populateList(URL);

    return;
}

const lastPage = (evt) => {
    evt.preventDefault();
    if (last !== null){
        const newURL = `https://pokeapi.co/api/v2/pokemon?offset=${last}&limit=10`;
        populateList(newURL);
    }
        

    return;
}

document.querySelector("#btnPrev").addEventListener('click', prevPage);
document.querySelector("#btnNext").addEventListener('click', nextPage);
document.querySelector("#btnFirst").addEventListener('click', firstPage);
document.querySelector("#btnLast").addEventListener('click', lastPage);

populateList(URL);