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