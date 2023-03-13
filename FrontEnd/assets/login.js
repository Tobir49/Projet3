//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\

/* 1. Créer une fonction pour rediriger sur la page HTML (utilisée si la connexion est réussie) */
function successfulConnexion() {
    window.location.href = "./index.html";
};

/* 2. Générer un message d'erreur si la connexion échoue */
function failedConnexion() {
    const divError = document.querySelector(".erreur");
    const showErrorMessage = document.createElement("p");
    showErrorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
    divError.appendChild(showErrorMessage);
}

/* 3. Fonction qui permet de se connecter (+ appel des fonctions précédentes)*/
function login() {
    const divForm = document.querySelector(".formulaire-connexion");

    divForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        // 1. Accès aux inputs du <form> dans le HTML grâce à getElementById
        const emailValue = document.getElementById("email").value;
        const passwordValue = document.getElementById("password").value;

        // 2. On crée cette constante qui nous sera utile pour l'appel à fetch
        const elementsForm = {
            email: emailValue,
            password: passwordValue,
        };

        // 3. Appel à fetch
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(elementsForm) // On passe les éléments du formulaire au format JSON pour obtenir le token
        });

        // 4. On récupère le token grâce à la réponse du fetch
        let reponseFetch = await response.json();
        let token = reponseFetch.token; // Pour récupérer le "token" dans l'API
        // console.log(token);

        // 5. On appelle les fonctions créées précédemment :

        // 5.A : Si la connexion est réussie : 
        if (response.status === 200) {
            // On stocke le token dans le sessionStorage pour le récupérer plus tard
            window.sessionStorage.setItem("token", token);
            successfulConnexion();
        } /* 5.B Si la connexion échoue : */
        else if (response.status === 401 || 404) {
            failedConnexion();
        }
    });
};

login();