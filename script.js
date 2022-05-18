let productsGrid = document.getElementById("products-grid");
let products = [];
let xhr = new XMLHttpRequest();
//let url = "https://my-json-server.typicode.com/vitaliimkb/robo_json";
let url = "https://market-275f.restdb.io/rest/product"

xhr.open("GET", url);

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6285380de8128861fcf3d417");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType = 'json';
xhr.onload = function() {
    products = xhr.response;
    productsGrid.innerHTML = null;
    products.forEach(p => {
        let productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2 class='product-name'>${p.name}</h2>
            <img class='product-img' src='${p.photo_url}' alt='${p.name}'>
            <p class='product-desc'><b>Description: </b>${p.description}</p>
            <p class='product-price'><b>Price: </b>${p.price}UAH</p>
            <a href='user.html?id=${p.author_id}'>Seller profile</a>
            <button onclick='addProductToCart(${p._id})'>Buy</button>
        `;
        productsGrid.append(productElement);
    })
}
xhr.send();

function addProductToCart(id)  {
    let product = products.find(function(p) {
        return p._id == id;
    })
    cart.push(product)
    drawCartProducts()
    localStorage.setItem("cart", JSON.stringify(cart))
    document.getElementById("cart-button").classList.add('active');
    setTimeout(function() {
        document.getElementById("cart-button").classList.remove('active');
    }, 500)
    console.log(cart);
}

let cartProd = document.getElementById("cart-products");
let cart = [];
if(localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function drawCartProducts() {
    if (cart.length == 0) {
        return cartProd.innerHTML = "Cart is empty";
    }
    cartProd.innerHTML = null;
    let sum = 0;
    cart.forEach(function(p) {
        cartProd.innerHTML += `
            <p><img src='${p.photo_url}'><br>${p.name} | ${p.price}</p>
            <hr>
        `;
        sum += p.price;
    })
    cartProd.innerHTML += `
        <p><b>Total price: ${sum}UAH</b></p>
        <button onclick='buyAll()'>Buy all</button>
    `;
}

function buyAll() {
    cart = [];
    cartProd.innerHTML = "Money was withdraw your credit card";
    localStorage.setItem("cart", []);
}

function openCart() {
    cartProd.classList.toggle("hide");
}