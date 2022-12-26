let stockOrder = []
let totalQuantity = 0

/**
 * Show Total Quantity on the cart
 * @param totalQuantity
 */
const showTotal = (totalQuantity) => {
    let showTotalQuantity = document.querySelector('#totalQuantity')

    if(showTotalQuantity) {
        showTotalQuantity.innerHTML = totalQuantity
    }
}
/**
 * Show Total price on the cart
 * @param totalPrice
 */
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

/**
 * Save localStorage
 * @param stockOrder
 */
const saveStorage = (stockOrder) => {
    localStorage.setItem("Command", JSON.stringify(stockOrder))
}

/**
 * Update StockOrder & calling saveStorage for saving the localStorage
 * @param order
 * @param targetDiv
 * @param price
 * @param total
 * @returns {*}
 */
const updateToStockOrder = (order, targetDiv, price, total) => {
    let exist = 0
    let newQuantity = 0

    for(let i = 0; i < stockOrder.length; i++) {
        if (order.personnalId === stockOrder[i].personnalId) {
            let QtyTotal = parseInt(stockOrder[i].quantity) + parseInt(order.quantity)

            if(QtyTotal > 0 && QtyTotal < 100) {
                stockOrder[i].quantity = parseInt(stockOrder[i].quantity) + parseInt(order.quantity)
                newQuantity = stockOrder[i].quantity
                totalQuantity += parseInt(order.quantity)
                total += parseInt(price)
            } else {
                alert("la quantité sélectionné est incorrect.")
                newQuantity = stockOrder[i].quantity
            }
                exist = 1
        }
    }
    if (exist === 0) {
        stockOrder.push(order)
        totalQuantity += parseInt(order.quantity)
        total += parseInt(price)
        alert("le produit à été ajouté au panier en "+order.quantity+" fois et la couleur choisi est "+order.color);
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
    return total
}
/**
 * Show new quantity on the product cart
 * @param targetDiv
 * @param newQuantity
 */
const showQuantity = (targetDiv, newQuantity) => {
    targetDiv.innerHTML = `Qté : ${newQuantity}`
}
/**
 * Remove from stockOrder with personnalId
 * @param personnalId
 * @param total
 * @param totalDel
 * @param Qty
 * @returns {*}
 */
const removeToStockOrder = (personnalId, total, totalDel, Qty) => {
    totalQuantity -= parseInt(Qty)
    total -= parseInt(totalDel)

    for (let i = 0; i < stockOrder.length; i++) {

        if (stockOrder[i].personnalId === personnalId) {
            stockOrder.splice(i, 1)

            saveStorage(stockOrder)

            showTotalPrice(total)

            showTotal(totalQuantity)

            return total
        }
    }
}
/**
 * check if value of email of form is validated
 * @param string
 * @returns {boolean}
 */
const validEmail = (string) => {

    if(string == "") return false;

    let regexFunc = new RegExp('["{#&/[}{()*%$£€:;!?+<>~°}]', 'g');
    if(!regexFunc.test(string)) {
        return true;
    } else {
        return false;
    }
}

/**
 * check if value of text of form is validated
 * @param string
 * @param number
 * @returns {boolean}
 */
const validText = (string, number = false) => {

    if(string == "") return false;
    if(string.length < 4) return false;
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
