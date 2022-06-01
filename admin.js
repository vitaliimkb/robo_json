let productForm = document.getElementById("form")

productForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let data = JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    })

    let xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            setTimeout(() => window.open("index.html", "_self"), 1000)
        }
    })
    xhr.open("POST", "https://market-275f.restdb.io/rest/product")
    
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6285380de8128861fcf3d417");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
})

let admin_orders = document.getElementById("admin_orders")

let order_xhr = new XMLHttpRequest()
order_xhr.open("GET", 'https://market-275f.restdb.io/rest/order')
order_xhr.responseType = "json"
order_xhr.setRequestHeader("content-type", "application/json");
order_xhr.setRequestHeader("x-apikey", "6285380de8128861fcf3d417");
order_xhr.setRequestHeader("cache-control", "no-cache");

order_xhr.onload = function () {
    console.log(order_xhr.response);
    order_xhr.response.forEach(function(order) {
        let orderEl = document.createElement("div")
        orderEl.classList.add('product')
        let statusColor = "green"
        if (order.status == "Completed") {
            statusColor = "yellow"
        }

        orderEl.innerHTML += `
            <h2>Order: ${order._id}</h2>
            <p>
                <b>Status: </b>
                <span style='color:${statusColor}'>${order.status}</span>
            </p>
            <p><b>Customer name: ${order.name}</b></p>
            <p><b>Address: </b>${order.address}</p>
            <p><b>Phone: </b>${order.phone}</p>
            <p><b>Post office number: </b>${order.post_number}</p>
        `
        let sum = 0
        order.products.forEach(function(p) {
            orderEl.innerHTML += `
                <p><img height="50" src="${p.photo_url}">${p.name} | ${p.price}</p>
            `
            sum += +p.price
        })

        orderEl.innerHTML += `
            <p>Total price: ${sum} UAH</p>
            <button onclick="complete('${order._id}')">Mark as Completed</button> 
        `
        admin_orders.append(orderEl)
    })
}

order_xhr.send()

function complete(id) {
    let data = JSON.stringify({
        "status": "Completed"
    })
    let xhr = new XMLHttpRequest()
    xhr.withCredentials = false; // для уникнення помилки 401 unauthorized

    xhr.onload = function () {
        if (xhr.status == 200) {
            location.reload()
        } else {
            alert("SERVER ERROR. TRY AGAIN LATER")
        }
    }
    
    xhr.open("PUT", "https://market-275f.restdb.io/rest/order/" + id)

    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6285380de8128861fcf3d417");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data)
}