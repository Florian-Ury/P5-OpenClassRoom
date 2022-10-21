//Récupérer l'orderId dans l'url

let params = (new URL(document.location)).searchParams;
let orderId = params.get('id');

//Afficher l'orderId
document.querySelector('.confirmation').innerHTML = `
    <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${orderId}</span></p>
`