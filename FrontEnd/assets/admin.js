//\\\\\\\\\\\\\\\\\Admin (edit)/////////////////////\\

// 0. Vérifier si le token est bien enregistrer dans le localStorage :
// console.log(localStorage);

// 1.1. Récupérer le token
const recupererToken = window.localStorage.getItem("token");
// console.log(recupererToken);

// 1.2. Pouvoir se déconnecter (appelée plus tard):
function seDeconnecter(e) {
    // Vider le localStorage
    localStorage.clear();
    // Retourner à la page d'accueil
    window.location.href = "index.html";
};

// 2 Afficher les éléments du mode edit si c'est l'admin :
if (recupererToken !== null) {
    // 2.1. Remplacer le "login" par "logout"
    let loginAdmin = document.querySelector(".connexion-admin");
    loginAdmin.innerHTML = " "
    loginAdmin.innerText = "logout";
    // 2.2. Pouvoir retourner sur la page d'accueil
    loginAdmin.addEventListener('click', seDeconnecter);


    // 2.3. Afficher les éléments de la page admin pour edit :
    // A. Afficher la barre noire :
    const barreNoire = document.querySelector(".barre-modification");
    barreNoire.style.display = null;

    // B. Afficher les boutons de modification :
    const modificationPhoto = document.querySelector(".modification-photo");
    modificationPhoto.style.display = null;
    const modificationTexte = document.querySelector(".modification-texte");
    modificationTexte.style.display = null;
    const modificationProjets = document.querySelector(".modification-projets");
    modificationProjets.style.display = null;

    // C. Faire disparaître les boutons filtre :
    const boutonsFiltres = document.querySelector(".boutons");
    boutonsFiltres.innerHTML = "";
};


//\\\\\\\\\\\\\\\\\Modales/////////////////////\\