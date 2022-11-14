//stock order est le tableau json qui détient notre Localstorage
let stockOrder = []
let totalQuantity = 0

const showTotal = (totalQuantity) => {
    let showTotalQuantity = document.querySelector('#totalQuantity')

    if(showTotalQuantity) {
        showTotalQuantity.innerHTML = totalQuantity
    }
}
const showTotalPrice = (totalPrice) => {
    let showTotalPrice = document.getElementById('totalPrice').innerText = totalPrice
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
const updateToStockOrder = (order, targetDiv, price, total) => {
    totalQuantity += parseInt(order.quantity)
    total += parseInt(price)

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
    showTotal(totalQuantity)


    if(targetDiv) {
        showQuantity(targetDiv, newQuantity)
    }

    if(total){
        showTotalPrice(total)
    }
}

const showQuantity = (targetDiv, newQuantity) => {
    targetDiv.innerHTML = `Qté : ${newQuantity}`
}
//on supprime l'élement voulu du stockorder puis on sauvegarde
const removeToStockOrder = (personnalId, total, totalDel) => {
    let newTotal = 0
    for (let i = 0; i < stockOrder.length; i++) {

        if (stockOrder[i].personnalId === personnalId) {
            stockOrder.splice(i, 1)
            newTotal += total-totalDel
            showTotalPrice(newTotal)
            saveStorage(stockOrder)
        }
    }
}

const validEmail = (string) => {

    if(string == "") return false;

    let regexFunc = new RegExp('["{#&/[}{()*%$£€:;!?+<>~°}]', 'g');
    if(!regexFunc.test(string)) {
        return true;
    } else {
        return false;
    }
}

const validText = (string, number = false) => {

    if(string == "") return false;

    let rule;
    if(number == false) {
        rule = '["{@&/[}{()*%$£€:;!?#,-<>~°._+1-9}]'; // number refused
    } else {
       rule = '["{@#&/[}{()*%$£€:;!?+<>~°_}]'; // number accepted
    }

    let regexFunc = new RegExp(rule, 'g');
    if(!regexFunc.test(string)) {
        return true;
    } else {
        return false;
    }
}
