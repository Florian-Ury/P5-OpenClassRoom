// récupération de l'id de l'url

let params = (new URL(document.location)).searchParams;
let id = params.get('id');


// Récupération des produits
fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {

                document.querySelector('title').innerHTML = value.name
            // vérification si l'id de l'url correspond à l'id d'un article

                //Appel de la fonction pour configurer la page avec le produit
                updateProduct(value)

                //Evenement pour appeler la fonction ajouter au panier
                document.getElementById("addToCart").addEventListener("click", function (e) {
                    const order = {
                        color: document.querySelector('#colors').value,
                        quantity: document.querySelector('#quantity').value,
                        id: value._id,
                        personnalId: value._id+document.querySelector('#colors').value
                    }
                    if (order.quantity == 0 || order.quantity > 100) {
                        alert("Vous avez selectionné une mauvaise quantité")
                    } else if (order.color == "") {
                        alert("Veuillez selectionner une couleur")
                    } else {
                        updateToStockOrder(order);
                    }



                })

    });
    // Fonction pour modifier le contenu de la page par le produits selectionner
    const updateProduct = function (value) {
        document.querySelector('.item').innerHTML = `
                <section class="item">
                  <article>
                    <div class="item__img">
                      <img src="${value.imageUrl}" alt="${value.altTxt}">
                    </div>
                    <div class="item__content">
        
                      <div class="item__content__titlePrice">
                        <h1 id="title">${value.name}</h1>
                        <p>Prix : <span id="price">${value.price}</span>€</p>
                      </div>
        
                      <div class="item__content__description">
                        <p class="item__content__description__title">Description :</p>
                        <p id="description"> ${value.description}</p>
                      </div>
        
                      <div class="item__content__settings">
                        <div class="item__content__settings__color">
                          <label for="color-select">Choisir une couleur :</label>
                          <select name="color-select" id="colors">
                              <option value="">--SVP, choisissez une couleur --</option>
                          </select>
                        </div>
        
                        <div class="item__content__settings__quantity">
                          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                        </div>
                      </div>
        
                      <div class="item__content__addButton">
                        <button id="addToCart">Ajouter au panier</button>
                      </div>
        
                    </div>
                  </article>
                </section>`
        // boucle pour ajouter les couleurs au menu
        for (let i = 0; i < value.colors.length; i++) {
            document.querySelector("#colors").innerHTML += `
                     <option value="${value.colors[i]}">${value.colors[i]}</option>`
        }
    };