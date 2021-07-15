//Fetch data from random user database
const gallery = document.getElementById('gallery');

const usersPromise = new Promise( (resolve, reject) => {
    fetch('https://randomuser.me/api/?nat=us&results=12')
        .then(response => response.json())
        .then(data => resolve(data.results))
        .catch(error => {
            reject(error);
            gallery.insertAdjacentHTML();
        });
});

//Array of users

//append html to display each user card 
function userProfile(user) {
    const userCard = document.createElement('div');
    userCard.insertAdjacentHTML('beforeend', `
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    `);
}

//modal box for user

//close modal button 

//