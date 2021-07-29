

//Fetch data from random user database.
const gallery = document.querySelector("#gallery");

//function that fetches users & then parses the response to JSON. 
function fetchUsers(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => {
            gallery.insertAdjacentHTML('beforeend', `<h3>Oops! Something went wrong. Please try again later. ${error}</h3>`)
        })
}

//function to check the status of the API response. 
function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error (response.statusText));
    }
}

fetchUsers('https://randomuser.me/api/?nat=us&results=12')
    .then(userCard)

//function to create 12 user cards & add them to the HTML.
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

        //event listener that listens for a clicked employee & creates their individual modal. 
        card.addEventListener('click', () => createModal(employee))
    };
} 

//function to create modal for clicked employee & add it to the HTML.
function createModal(employee) {
    let birthday = new Date(employee.dob.date);
        
    document.body.insertAdjacentHTML('beforeend', `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${birthday.getMonth()}/${birthday.getDay()}/${birthday.getYear()}</p>
        </div>
    </div>`);
        
    //event listener that listens for a click on the close button to close out the open modal. 
    let closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => closeBtn.parentElement.parentElement.remove());
}
