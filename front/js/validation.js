// Récupération des ID pour l'event
let formInputs = new Array();

formInputs.push(document.querySelector('#firstName'));
formInputs.push(document.querySelector('#lastName'));
formInputs.push(document.querySelector('#address'));
formInputs.push(document.querySelector('#city'));
formInputs.push(document.querySelector('#email'));

/**
 * add event listener on all input form elements
 */
for(let i =0; i < formInputs.length; i++) {

    let input = formInputs[i];
    input.addEventListener('change', function() {
        checkValidElement(this);
    })
}

/**
 * function check element
 * @param element
 */
const checkValidElement = (element) => {
    let result = true;
    let number = false;
    let type = element.type;
    let name = element.name;
    let string = element.value.trim();
    let targetDiv = element.nextElementSibling;
    //valid text
    if(type == "text") {
        // verif if name == adress
        if(name == "address"){
            number = true;
        }

        if(!validText(string, number)){
            result = false;
        }
    }

    if(type == "email") {
        if(!validEmail(string)){
            result = false;
        }
    }

    // show text
    if(result == false) {
        targetDiv.textContent = "Veuillez entrer une donnée valide";
    }  else {
        targetDiv.textContent = "";
    }

     return result
}


