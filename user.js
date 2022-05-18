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

let productRequest = new XMLHttpRequest()
productRequest.open('GET', `${url}/products?author_id=${id}`)
productRequest.responseType = 'json'
productRequest.onload = function() {
    let products = productRequest.response
    productsGrid.innerHTML = null
    products.forEach(p => {
        productsGrid.innerHTML += `
            <div class="product">
                <h2 class="product-name">${p.name}</h2>
                <img class="product-img" src="${p.photo_url}" alt="${p.name}">
                <p class='product-desc'><b>Description: </b>${p.description}</p>
                <p class='product-price'><b>Price: </b>${p.price}UAH</p>
            </div>
        `
    })
}
productRequest.send()