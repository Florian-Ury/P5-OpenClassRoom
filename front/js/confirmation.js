//get "OrderId" by the url

let params = (new URL(document.location)).searchParams;
let orderId = params.get('id');

//Show the orderId
document.getElementById( "orderId").innerText = orderId