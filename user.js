let url = "https://my-json-server.typicode.com/vitaliimkb/robo_json"
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")

let profile = document.getElementById("profile")
let productsGrid = document.getElementById("user-products-grid")

let userRequest = new XMLHttpRequest();
userRequest.open("GET", url + "/users/" + id)
userRequest.responseType = 'json'
userRequest.onload = function() {
    let user = userRequest.response
    profile.innerHTML = `
        <h1>${user.name}</h1>
        <img class='profile-img' src='${user.img}'>
        <p>Balance: ${user.balance}UAH</p>
    `;
}
userRequest.send()