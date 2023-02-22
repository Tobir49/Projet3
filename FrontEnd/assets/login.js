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

/* Une fois ces fonctions créées :
3. Fonction qui permet de se connecter (utilisation des fonctions précédentes)*/

async function fonctionConnexion() {
    const formulaire = document.querySelector(".formulaire-connexion");
    console.log(formulaire);

    // Accès aux inputs du <form> dans le HTML grâce à getElementById
    const emailFormulaire = document.getElementById("email").value; // Le .value sert à récupérer la valeur écrite dans cet input
    const passwordFormulaire = document.getElementById("password").value;

    // On crée cette constante qui nous sera utile pour l'appel à fetch
    const elementsFormulaire = {
        email: emailFormulaire,
        password: passwordFormulaire,
    };

    // Appel à fetch
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(elementsFormulaire) // On passe les éléments du formulaire au format JSON
    });
}