//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\

/* Pour se connecter il faut :
    
1. Créer une fonction pour rediriger sur la page HTML (utilisée si la connexion est réussie*/

function connexionReussie() {
    window.location.href = "../index.html";
};

/* Ensuite il faut une autre fonction qui sera elle aussi appelée plus tard
2. Fonction qui génère un message d'erreur si la connexion échoue*/

function connexionEchouee() {
    const erreur = document.querySelector(".erreur");
    document.querySelector(".erreur").innerHTML = "";
    const afficherErreur = document.createElement("p");
    afficherErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
    erreur.appendChild(afficherErreur);
}

/* Une fois ces fonctions crées :
3. Fonction qui permet de se connecter (utilisation des fonctions précédentes)*/



// async function login() {
//     let user = {
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value,
//     };
//     let reponse = await fetch(apiLogin, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify(user)
//     });
//     window.location.href('../index.html')
// };

// login();

// function check(form) {
//     if (form.email.value == "sophie.bluel@test.tld" && form.password.value == "S0phie") {
//         return true;
//     } else {
//         alert("Erreur dans l’identifiant ou le mot de passe")
//         return false;
//     }
// };
// check(form);