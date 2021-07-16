//Fetch data from random user database
const gallery = document.querySelector(".gallery");

function fetchUsers(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(userCard)
        .catch(error => 
            gallery.insertAdjacentHTML('beforeend', "<h3>Something went wrong, please try again.</h3>")); 
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
    console.log(response);

    for(let i = 0; i < response.results.length; i++) {
        let employee = response.results[i];
        console.log(employee);

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
    }
}

//modal box for user

/*<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>*/

//close modal button 
