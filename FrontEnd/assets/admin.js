//\\\\\\\\\\\\\\\\\Admin (edit)/////////////////////\\

// 0. Vérifier si le token est bien enregistrer dans le localStorage :
console.log(localStorage);

// 1. Récupérer le token
const recupererToken = window.localStorage.getItem("token");
console.log(recupererToken);

// 2.1. Pouvoir se déconnecter (appelée plus tard):
function seDeconnecter(e) {
    // Vider le localStorage
    localStorage.clear();
    // Retourner à la page d'accueil
    window.location.href = "index.html";
};

// 2.2. Vérifier si le token == à celui de l'admin (donc non null) :
if (recupererToken !== null) {
    // Remplacer le "login" par "logout"
    let log = document.querySelector(".connexion-admin");
    log.innerHTML = " "
    log.innerHTML = "logout";
    // Pouvoir retourner sur la page d'accueil
    log.addEventListener('click', seDeconnecter);
}


// Afficher les éléments de la page admin pour edit :

if (recupererToken !== null) {
    // 1. Afficher la barre noire :
    const barreNoire = document.querySelector(".barre-modification");
    barreNoire.style.display = null;
    adminBar.removeAttribute("aria-hidden");
    const parentBarreNoire = document.querySelector('body');
    parentBarreNoire.appendChild(barreNoire);

    // 2. Afficher les boutons de modification :
    const modificationPhoto = document.querySelector(".modification-photo");
    modificationPhoto.style.display = null;
    modificationPhoto.removeAttribute("aria-hidden");
    const modificationTexte = document.querySelector(".modification-texte");
    modificationTexte.style.display = null;
    modificationTexte.removeAttribute("aria-hidden");
    const modificationProjets = document.querySelector(".modification-projets");
    modificationProjets.style.display = null;
    modificationProjets.removeAttribute("aria-hidden");

    // 3. Faire disparaître les boutons filtre :
    const boutonsFiltres = document.getElementById("btnFilters");
    boutonsFiltres.style.display = null;
    boutonsFiltres.removeAttribute("aria-hidden");
}



//\\\\\\\\\\\\\\\\\Modales/////////////////////\\