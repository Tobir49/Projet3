//\\\\\\\\\\\\\\\\\Admin (edit)/////////////////////\\

// 0. Vérifier si le token est bien enregistrer dans le sessionStorage :
// console.log(sessionStorage);

// 1.1. Récupérer le token
const getToken = window.sessionStorage.getItem("token");
// console.log(getToken);

// 1.2. Pouvoir se déconnecter :
function logout(e) {
    // Vider le sessionStorage
    sessionStorage.clear();
    // Retourner à la page d'accueil
    window.location.href = "index.html";
};


// 2 Afficher les éléments du mode edit si c'est l'admin :
if (getToken !== null) {

    // 2.1 Remplacer le "login" par "logout"
    let loginNavName = document.querySelector(".connexion-admin");
    loginNavName.innerHTML = " "
    loginNavName.innerText = "logout";
    // 2.2. Pouvoir retourner sur la page d'accueil
    loginNavName.addEventListener('click', logout);
    // 2.3. Afficher les éléments de la page admin pour edit :
    // A. Afficher la barre noire :
    const elementBanner = document.querySelector(".barre-modification");
    elementBanner.style.display = null;

    // B. Afficher les boutons de modification :
    const buttonImageModifictation = document.querySelector(".modification-photo");
    buttonImageModifictation.style.display = null;
    const buttonTexteModification = document.querySelector(".modification-texte");
    buttonTexteModification.style.display = null;
    const buttonProjectsModification = document.querySelector(".modification-projets");
    buttonProjectsModification.style.display = null;

    // C. Faire disparaître les boutons filtre :
    const deleteFilterButton = document.querySelector(".boutons");
    deleteFilterButton.innerHTML = "";
};


//\\\\\\\\\\\\\\\\\Modales/////////////////////\\

//\\\\\\\\\\\\\\\\\Modale d'ouverture/////////////////////\\

// Fonction appelée pour faire apparaître les projets dans la modale
async function showProjectsModal() {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();

    json.forEach(work => {
        const divProjects = document.querySelector(".galerie-photo");
        const figureElement = document.createElement("figure");
        figureElement.classList.add("figure-modale");
        figureElement.setAttribute("id", "projets " + work.id);
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.setAttribute("crossorigin", 'anonymous');
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = 'éditer';
        // Bouton et icône
        const deleteButton = document.createElement("button");
        // On lui donne comme id, celui dans l'API
        deleteButton.setAttribute("id", work.id);
        // Au clic du bouton, on exécute la fonction (sur l'id qu'on pointe)
        deleteButton.setAttribute("onclick", "deleteProject(this.id);");
        deleteButton.classList.add("bouton-modale-delete");
        const icone = document.createElement('span');
        icone.innerHTML = '<i class="fa-solid fa-trash-can icone-modale-delete"></i>';
        const moveIcone = document.createElement('span');
        moveIcone.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right move-icone"></i>';

        divProjects.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(deleteButton);
        deleteButton.appendChild(icone);
        figureElement.appendChild(moveIcone);
    });
};


// Arrêter la propagation de la modale
function stopPropagation(event) {
    event.stopPropagation()
};

// Fonction pour ouvrir la modale
function openModal(aside, openButton, iconeClose, divModal) { // Les paramètres sont utiles pour choisir quelle modale on souhaite ouvrir
    const chooseModal = document.getElementById(aside);
    const chooseButton = document.getElementById(openButton);
    if (chooseButton !== null) {
        chooseButton.addEventListener("click", function() {
            chooseModal.style.display = 'flex';
        });
        chooseModal.addEventListener("click", closeModal)
            // Fermer la modale au clic sur la croix
        chooseModal.querySelector(iconeClose).addEventListener('click', closeModal)
            // Fermer la modale au clic à l'extérieur de la modale
        chooseModal.querySelector(divModal).addEventListener('click', stopPropagation)
    }
}

// Fonction pour fermer la modale
function closeModal() {
    const chooseModal = document.getElementById('modal1');
    chooseModal.style.display = 'none';
}

// Appel des fonctions pour la modale dans une fonction globale (une pour chaque modale)
function openFirstModal() {
    document.querySelectorAll('.open-modal1').forEach(call => {
        call.addEventListener('click', openModal('modal1', 'open-modal-wrapper', '.icone', '.modal-wrapper'))
        showProjectsModal();
    });
}

openFirstModal();


//\\\\\\\\\\\\\\\\\Suppression de projet/////////////////////\\

async function deleteProject(clicked_id) {
    const response = await fetch(`http://localhost:5678/api/works/${clicked_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${getToken}`
        }
    });

    // Ne pas rafraîchir la page quand on supprime un projet
    const deleteModalProjectsNoRefresh = document.getElementById("projets " + clicked_id);
    deleteModalProjectsNoRefresh.remove();

    const deleteProjectsNoRefresh = document.getElementById("galery " + clicked_id);
    deleteProjectsNoRefresh.remove();
};


//\\\\\\\\\\\\\\\\\Modale d'ajout/////////////////////\\

// Fonction pour choisir la modale à afficher
function changeModal(styleModal1, modalDirection, styleModal2) {
    document.querySelector('.modal-wrapper').style.display = styleModal1;
    // Ici on change la direction de la modale, afin de lui redonner son état d'origine (qui est en colonne)
    document.querySelector('.modal-wrapper').style.flexDirection = modalDirection;
    document.querySelector('.modale-upload').style.display = styleModal2;
}

// Fonction pour ouvrir la 2e modale
function openSecondModal() {
    document.querySelectorAll('.open-modal-upload').forEach(call => {
        call.addEventListener('click', () => {
            changeModal('none', '', 'flex');
            openModal('modal1', 'open-second-modal', '.cross-upload', '.modale-upload')
        })
    })
}

openSecondModal();

// Sert à utiliser la flèche de la 2e modale afin de revenir en arrière
let returnFirstModale = document.querySelector('.arrow');
returnFirstModale.addEventListener('click', () => {
    changeModal('flex', 'column', 'none');
});


//\\\\\\\\\\\\\\\\\Ajouter un projet/////////////////////\\

// Afficher l'image choisie
let imageForm = document.getElementById('upload-image');
imageForm.addEventListener('change', function(event) {
    let newReader = new FileReader();
    let file = event.target.files[0];
    newReader.onload = function(event) {
        let imageUpload = document.createElement("img");
        imageUpload.classList.add('image-load');
        // Récup source image sur le pc
        imageUpload.src = event.target.result;
        let divImageForm = document.getElementById("change-image");
        divImageForm.innerHTML = '';
        divImageForm.appendChild(imageUpload);
    };
    newReader.readAsDataURL(file);
});

// Fonction pour ajouter un projet :
async function AddWorksFetch() {

    // Récupération des valeurs renseignées dans le formulaire
    const addPicture = document.getElementById('upload-image');
    const addTitle = document.getElementById('title-project');
    const addCategory = document.getElementById('categorie-projet');

    // Récupération du formulaire (+ ajout d'un EventListener)
    const formAddWorks = document.querySelector('.form-upload');
    formAddWorks.addEventListener('submit', (event) => {
        event.preventDefault();

        // FormData utile pour l'appel à fetch (POST)
        let formData = new FormData();
        formData.append('title', addTitle.value);
        formData.append('image', addPicture.files[0]);
        formData.append('category', addCategory.value);

        // Appel fetch (si le formulaire rempli entièrement)
        fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken}` },
                body: formData
            })
            // La réponse de l'API
            .then(resultat => {
                console.log(resultat);
                return resultat.json();
            })
            // Réponse de ce qu'on envoie
            .then(event => {
                console.log(event);
            })

        // Condition pour que le formulaire s'envoie
        if (addPicture === null || addTitle === null || addCategory === null) {
            // Message d'erreur :
            const errorMessage = document.getElementById('error-adding-work');
            const showErrorMessage = document.createElement("p");
            showErrorMessage.classList.add = ('error-message-work');
            showErrorMessage.innerText = "Remplir tous les champs avant d'envoyer le projet";
            errorMessage.appendChild(showErrorMessage);
            return;
        }
    })
}

AddWorksFetch();