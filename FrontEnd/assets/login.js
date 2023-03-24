//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\

/* 1. Créer une fonction pour rediriger sur la page HTML (utilisée si la connexion est réussie) */
function successfulConnexion() {
    window.location.href = "./index.html";
};

/* 2. Fonction qui permet de se connecter (+ appel des fonctions précédentes)*/
function login() {
    const divForm = document.querySelector(".formulaire-connexion");

    divForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        // 2.1. Accès aux inputs du <form> dans le HTML grâce à getElementById
        const emailValue = document.getElementById("email");
        const passwordValue = document.getElementById("password");

        /* 2.2. Générer un message d'erreur si la connexion échoue */
        function failedConnexion() {
            const divError = document.querySelector(".erreur");
            divError.style.display = 'flex';
        }

        /* 2.3. 1e condition pour que le message s'affiche */
        if (!emailValue.value || !passwordValue.value) {
            failedConnexion();
            return;
        }
        // Si le formulaire est rempli, on enlève le message
        const divError = document.querySelector(".erreur");
        divError.style.display = 'none';

        // 3. On crée cette constante qui nous sera utile pour l'appel à fetch
        const elementsForm = {
            email: emailValue.value,
            password: passwordValue.value,
        };

        // 4. Appel à fetch
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(elementsForm) // On passe les éléments du formulaire au format JSON pour obtenir le token et l'id
        });

        // 5. Seul le token est utile pour la suite
        let reponseFetch = await response.json();
        let token = reponseFetch.token; // Pour récupérer le token dans l'API

        // 6.1. On appelle la fonction si la connexion est réussie : 
        if (response.status === 200) {
            // On stocke le token dans le sessionStorage pour le récupérer plus tard
            window.sessionStorage.setItem("token", token);
            successfulConnexion();
            /* 6.2. 2e condition pour que le message s'affiche */
        } else if (response.status === 401 || 404) {
            failedConnexion();
            return;
        }
    });
};

login();