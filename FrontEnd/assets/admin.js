//\\\\\\\\\\\\\\\\\Admin (edit)/////////////////////\\

// 0. Vérifier si le token est bien enregistrer dans le sessionStorage :
// console.log(sessionStorage);

// 1.1. Récupérer le token
const recupererToken = window.sessionStorage.getItem("token");
// console.log(recupererToken);


// 1.2. Pouvoir se déconnecter :
function seDeconnecter(e) {
    // Vider le sessionStorage
    sessionStorage.clear();
    // Retourner à la page d'accueil
    window.location.href = "index.html";
};


// 2 Afficher les éléments du mode edit si c'est l'admin :
if (recupererToken !== null) {

    // 2.1 Remplacer le "login" par "logout"
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


//\\\\\\\\\\\\\\\\\Modale d'ouverture/////////////////////\\

let modal = null;

//Fonction appelée pour faire apparaître les projets dans la modale
async function afficherImageModale() {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();

    json.forEach(projets => {
        const sectionProjets = document.querySelector(".galerie-photo");
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("figure-modale");
        baliseFigure.setAttribute("id", "projets " + projets.id);
        const imageFigure = document.createElement("img");
        imageFigure.src = projets.imageUrl;
        imageFigure.setAttribute("crossorigin", 'anonymous');
        const texteFigure = document.createElement("figcaption");
        texteFigure.innerText = 'éditer';
        // Bouton et icône
        const bouton = document.createElement("button");
        // On lui donne comme id, celui dans l'API
        bouton.setAttribute("id", projets.id);
        // Au clic du bouton, on exécute la fonction (sur l'id qu'on pointe)
        bouton.setAttribute("onclick", "deleteProject(this.id);");
        bouton.classList.add("bouton-modale-delete");
        const iconePoubelle = document.createElement('img');
        iconePoubelle.src = "assets/icons/trash-can-solid.svg";
        iconePoubelle.classList.add("icone-modale-delete");
        baliseFigure.appendChild(imageFigure);
        baliseFigure.appendChild(texteFigure);
        baliseFigure.appendChild(bouton);
        bouton.appendChild(iconePoubelle);
        sectionProjets.appendChild(baliseFigure);
    })
};

// Pour ouvrir la modale
const ouvrirModale = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;

    //Fermer la modale grâce à la croix
    const fermer = document.querySelector(".icone");
    fermer.addEventListener('click', fermerModale);

    //Fermer la modale au clic à l'extérieur
    const fermerModaleExterieur = document.querySelector('.modal-wrapper');
    fermerModaleExterieur.addEventListener('click', Propagation);
    document.querySelector('#modal1').addEventListener('click', fermerModale);
};


// Pour fermer la modale
const fermerModale = function(e) {
    if (modal === null) return
    e.preventDefault();
    const fond = document.querySelector('html');
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', fermerModale);
    modal.querySelector('.modale-supprimer-btn').removeEventListener('click', fermerModale);
    modal = null;
};

// La fonction pour ouvrir la modale est appelée grâce à un addEventListener
document.querySelectorAll('.open-modal1').forEach(a => {
    a.addEventListener('click', ouvrirModale)
    afficherImageModale();
});

// Arrêter la propagation de la modale
function Propagation(e) {
    e.stopPropagation()
};


//\\\\\\\\\\\\\\\\\Suppression de projet/////////////////////\\


async function deleteProject(clicked_id) {
    const response = await fetch(`http://localhost:5678/api/works/${clicked_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "authorization": `Bearer ${recupererToken}`
        }
    });
    const deleteModalGaleryNoRefresh = document.getElementById("projets " + clicked_id);
    deleteModalGaleryNoRefresh.remove();

    const deleteProjectsGaleryNoRefresh = document.getElementById("galery " + clicked_id);
    deleteProjectsGaleryNoRefresh.remove();
};