

//Fetch data from random user database
const gallery = document.querySelector("#gallery");

function fetchUsers(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(userCard)
}

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error (response.statusText));
    }
}

fetchUsers('https://randomuser.me/api/?nat=us&results=12');

//create 12 user cards
function userCard(response) {
    for(let i = 0; i < response.results.length; i++) {
        let employee = response.results[i];
        let card = document.createElement('div');
        card.className = 'card';
        gallery.appendChild(card);
        card.insertAdjacentHTML('beforeend',`
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>`);

        card.addEventListener('click', e => {
            if(e.target.value === 'card') {
                createModal(response);
            } 
        });
    };
} 

//modal box for user
function createModal(response) {
    for(let i = 0; i < response.results.length; i++) {
        let employee = response.results[i];
        let birthday = employee.dob;
        let modal = document.createElement('div');
        modal.className = 'modal-container';
        modal.insertAdjacentHTML('beforeend',`<div class="modal-container"
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.city}</p>
                <hr>
                <p class="modal-text">${employee.phone}</p>
                <p class="modal-text">${employee.location}</p>
                <p class="modal-text">Birthday: ${birthday}</p>
            </div>
        </div>`);
        gallery.insertAdjacentHTML('afterend', modal);
    }
}

//close modal button 
function closeModal(modal) {
    let closeBtn = document.getElementById('modal-close-btn');
    closeBtn.addEventListener('click', modal.remove);
}