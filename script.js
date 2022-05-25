let productsGrid = document.getElementById("products-grid");
let products = [];
let xhr = new XMLHttpRequest();
//let url = "https://my-json-server.typicode.com/vitaliimkb/robo_json";
let url = "https://market-275f.restdb.io/rest/product"
//let url = "http://127.0.0.1:5000/products"

xhr.open("GET", url);

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6285380de8128861fcf3d417");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType = 'json';
xhr.onload = function() {
    products = xhr.response;
    console.log(products);
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
        <button onclick="buyAll()" type="button" data-bs-toggle="modal" 
            data-bs-target="#exampleModal">Buy all</button>
    `;
}

let orderBlock = document.getElementById("order-block")

function buyAll() {
    let sum = 0
    orderBlock.innerHTML = null
    cart.forEach(function(p) {
        orderBlock.innerHTML += `
        <div class="col-sm-6" style="width: 18rem;">
            <div class="card">
                <img src="${p.photo_url}" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${p.name} | ${p.price}</p>
                </div>
            </div>
        </div>
        `
        sum += +p.price
    })
    
    document.getElementById("total-price").innerHTML = "Total price: " + sum + "UAH"
}

function openCart() {
    cartProd.classList.toggle("hide");
}