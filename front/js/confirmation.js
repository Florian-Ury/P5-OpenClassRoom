//Récupérer l'orderId dans l'url

let params = (new URL(document.location)).searchParams;
let orderId = params.get('id');

//Afficher l'orderId
document.querySelector('.orderId').innerHTML = orderId