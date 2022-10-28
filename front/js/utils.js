//stock order est le tableau json qui détient notre Localstorage
let stockOrder = []
let totalQuantity = 0

const showTotal = (totalQuantity) => {
    let showTotalQuantity = document.querySelector('#totalQuantity').innerHTML = totalQuantity
}
if (localStorage.getItem("Command") !== null && localStorage.getItem("Command") !== 'null') {
    stockOrder = JSON.parse(localStorage.getItem("Command"))

    for(let i = 0; i < stockOrder.length; i++) {
        totalQuantity += parseInt(stockOrder[i].quantity)
    }
    showTotal(totalQuantity)
}

//fonction pour sauvegarder le localstorage
const saveStorage = (stockOrder) => {
    localStorage.setItem("Command", JSON.stringify(stockOrder))
}

//fonction pour modifier le stockorder en ajoutant des produits / modifiant la quantité
const updateToStockOrder = (order, targetDiv, arrayPrice) => {
    totalQuantity += parseInt(order.quantity)
    let exist = 0
    let newQuantity = 0
    for(let i = 0; i < stockOrder.length; i++) {
        if (order.personnalId === stockOrder[i].personnalId) {
            stockOrder[i].quantity = parseInt(stockOrder[i].quantity) + parseInt(order.quantity)
            exist = 1
            newQuantity = stockOrder[i].quantity
        }
    }
    if (exist === 0) {
        stockOrder.push(order)
        newQuantity = order.quantity
    }
    saveStorage(stockOrder)
    showQuantity(targetDiv, newQuantity)
    showTotal(totalQuantity)
}

const showQuantity = (targetDiv, newQuantity) => {
    targetDiv.innerHTML = `Qté : ${newQuantity}`
}
//on supprime l'élement voulu du stockorder puis on sauvegarde
const removeToStockOrder = (personnalId) => {

    for (let i = 0; i < stockOrder.length; i++) {

        if (stockOrder[i].personnalId === personnalId) {
            stockOrder.splice(i, 1)

            saveStorage(stockOrder)
        }
    }
}
//ça vérifie le formulaire, si le type correspond au regex il n'y a pas de message d'erreur, sinon il y a un message d'erreur qui apparait en dessous
const validForm = (type, regex, textError) =>  {
    type.addEventListener('change', function () {
        let typeError = type.nextElementSibling
        if(!regex.test(type.value)) {
            typeError.textContent = ""
        } else {
            typeError.textContent = textError
        }
    })
}


