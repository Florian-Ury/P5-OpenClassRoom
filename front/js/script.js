
//Data recovery from API
const products = fetch("http://localhost:3000/api/products")
    .then(function(response) {
    if (response.ok) {
        return response.json();
    }
})
    .then(function(value) {
        //Show all products get by API
        let html = "";
        for (const product of value) {

            html += `
               <a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`
        }
        document.querySelector('#items').innerHTML = html
    });


