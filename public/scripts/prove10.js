const FETCH_ALL_URL = "/prove10/fetchAll";
const ADD_NEW_URL = "/prove10/insert";
const DELETE_URL = "/prove10/delete";

const input = document.getElementById('newName');

const clickListListener = e => {
    const name = e.target.getAttribute("data-name");
    fetch(DELETE_URL, {
        method: 'POST',
        body: JSON.stringify({name: name}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            return result.json();
        })
        .then(list => {
            fetchAll()
        })
        .catch(err => {
            console.log(err)
        })
}

const content = document.querySelector(".row");

function fetchAll() {
    fetch(FETCH_ALL_URL)
        .then(result => {
            return result.json();
        })
        .then(list => {
            
            console.log(list)
            content.innerHTML = `<div id="list">`;
            for (item of list.avengers) {
                content.innerHTML += `<span data-name="${item.name}">${item.name}</span><br>`;
            }
            content.innerHTML += `</div>`;
            document.getElementById('list').addEventListener('click',clickListListener);
        })
        .catch(err => {
            console.log(err)
        })
}

function addNew() {
    const newName = input.value;

    fetch(ADD_NEW_URL, {
        method: 'POST',
        body: JSON.stringify({name: newName}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => {
            return result.json();
        })
        .then(list => {
            fetchAll()
        })
        .catch(err => {
            console.log(err)
        })
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNew();
    }
});

content.addEventListener('mousedown',clickListListener);
fetchAll()