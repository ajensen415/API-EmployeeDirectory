

//Fetch data from random user database
const gallery = document.querySelector("#gallery");

function fetchUsers(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => {
            gallery.insertAdjacentHTML('beforeend', `<h3>Oops! Something went wrong. Please try again later. ${error}</h3>`)
        })
}

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error (response.statusText));
    }
}

fetchUsers('https://randomuser.me/api/?nat=us&results=12')
    .then(userCard)

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

        let clickCard = gallery.lastElementChild;
            clickCard.addEventListener('click', e => createModal(response))
    };
} 

//modal box for user
function createModal(response) {
    for(let i = 0; i < response.results.length; i++) {
        let employee = response.results[i];
        let birthday = employee.dob;
        document.querySelector('body').insertAdjacentHTML('beforeend',`<div class="modal-container"
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
    }
}

//display modal
/*function displayModal(index) {
    Array.from(document.querySelectorAll(`div.modal-container`)).forEach((modal) => {
        modal.style.display = 'none';
      })
    
      const modal = document.querySelector(`div.modal-container[data-index="${index}"]`);
      modal.style.display = 'block';
    }*/

//close modal button 
let closeBtn = document.getElementById('modal-close-btn');
closeBtn.addEventListener('click', modal.remove);
