console.log(stockOrder)
if (stockOrder) {
    let arrayPrice = new Object();
    let total = 0

     stockOrder.forEach(function (a) {

        fetch(`http://localhost:3000/api/products/${a.id}`)
            .then(function(response) {
             if (response.ok) {
                 return response.json();
             }
         }).then(function (product){
                    arrayPrice[a.id] = product.price
                    document.querySelector('#cart__items').innerHTML += `
                       <article class="cart__item" data-id="${a.id}" data-color="${a.color}">
                        <div class="cart__item__img">
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${product.name}</h2>
                            <p>${a.color}</p>
                            <p>${product.price}€</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : ${a.quantity} </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="-100" max="100" value="0">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    `

            total += a.quantity*product.price

            showTotalPrice(total)

            // Select quantity & send it to updateToStockOrder
            let selectQuantity = document.querySelectorAll('.itemQuantity')

            Array.from(selectQuantity).forEach(function (item) {
                item.addEventListener("change", function (e) {

                    let article = item.closest('article')
                    let personnalId = {
                        id : article.dataset.id,
                        color : article.dataset.color,
                        quantity : item.value,
                        personnalId : article.dataset.id+article.dataset.color
                    }

                    let elementQuantity = this.previousElementSibling
                    let elementPrice = this.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.innerHTML

                    let regex = new RegExp('€')
                    let replacePrice = elementPrice.replace(regex, '')
                    let price = parseInt(replacePrice)*item.value
                    total = updateToStockOrder(personnalId, elementQuantity, price, total)
                    this.value = 0
                })
            })

            //Select the product & send it to removeToStockOrder
            let selectProduct = document.querySelectorAll(".deleteItem")

            selectProduct.forEach(function (item){
                item.addEventListener("click", function (e) {
                    let article = item.closest(':not(div):not(p)')
                    let personnalId = article.dataset.id+article.dataset.color

                    let elementPrice = this.parentNode.parentNode.parentNode.firstElementChild.lastElementChild.innerHTML
                    let elementQuantity = this.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML

                    let regex = new RegExp('[a-zA-Zé€ :]+')
                    let replacePrice = elementPrice.replace(regex, '')
                    let replaceQty = elementQuantity.replace(regex, '')

                    let totalDel = parseInt(replacePrice)*parseInt(replaceQty)

                    total = removeToStockOrder(personnalId, total, totalDel, replaceQty)
                    article.style.display = "none";

                    checkIfStockOrderExist()
                })
            })
         })
     })

 }

const checkIfStockOrderExist = () => {
    if (stockOrder == "" || stockOrder == null || stockOrder === []) {
        alert("Aucun produit dans le panier")
        window.location.href="./index.html"
    }
}

checkIfStockOrderExist()


//Event for send the personnal data
document.querySelector('.cart__order__form').addEventListener('submit', function (event) {
    event.preventDefault()

    let productId = []

    for (i = 0; i < stockOrder.length; i++){
        productId.push(stockOrder[i].id)

    }

    if (checkValidElement) {
        let firstName = document.getElementById('firstName')
        let lastName = document.getElementById('lastName')
        let address = document.getElementById('address')
        let city = document.getElementById('city')
        let email = document.getElementById('email')

        let personnalData = {
            contact : {
                firstName : firstName.value,
                lastName : lastName.value,
                address : address.value,
                city : city.value,
                email : email.value,
            },
            products : productId,
        }
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                Accept : "application.json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(personnalData)
        })
            .then((response) => response.json())
            .then(function (data) {
                window.location.href = `confirmation.html?id=${data.orderId}`
                stockOrder = []
                saveStorage(stockOrder)
            })
    }
})









