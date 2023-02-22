//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\

/* Pour se connecter il faut :
    
1. Créer une fonction pour rediriger sur la page HTML (utilisée si la connexion est réussie)*/

function connexionReussie() {
    window.location.href = "./index.html";
};

/* Une autre fonction qui sera aussi appelée plus tard :
2. Générer un message d'erreur si la connexion échoue*/

function connexionEchouee() {
    const divErreur = document.querySelector(".erreur");
    document.querySelector(".erreur").innerHTML = "";
    const afficherErreur = document.createElement("p");
    afficherErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
    divErreur.appendChild(afficherErreur);
}

/* Une fois ces fonctions créées :
3. Fonction qui permet de se connecter (+ appel des fonctions précédentes)*/

function fonctionConnexion() {
    const formulaire = document.querySelector(".formulaire-connexion");

    formulaire.addEventListener("submit", async function(event) {
        event.preventDefault();

        // 1. Accès aux inputs du <form> dans le HTML grâce à getElementById
        const emailFormulaire = document.getElementById("email").value; // Le .value sert à récupérer la valeur écrite dans cet input
        const passwordFormulaire = document.getElementById("password").value;

        // 2. On crée cette constante qui nous sera utile pour l'appel à fetch
        const elementsFormulaire = {
            email: emailFormulaire,
            password: passwordFormulaire,
        };

        // 3. Appel à fetch
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(elementsFormulaire) // On passe les éléments du formulaire au format JSON
        });

        // 4. On récupère le token grâce à la réponse du fetch
        let reponseFetch = await response.json();
        let token = reponseFetch.token;
        console.log(token);

        // 5. On appelle les fonctions créées précédemment :

        // 5.A : Si la connexion est réussie : 
        if (response.status === 200) {
            // On stocke le token dans le localStorage pour le récupérer plus tard
            window.localStorage.setItem("token", token);
            connexionReussie();
        } /* 5.B Si la connexion échoue : */
        else if (response.status === 401 || 404) {
            connexionEchouee();
        }
    });
};

fonctionConnexion();