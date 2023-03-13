//\\\\\\\\\\\\\\\\\Afficher les projets/////////////////////\\

// Récupération des données de l'API

// Fonction qui crée les travaux
function createWork(work) {
    const sectionElement = document.querySelector(".gallery");
    const figureElement = document.createElement("figure");
    figureElement.classList.add("filterDiv", work.categoryId, "show"); // Une classe qui servira pour les filtres
    figureElement.setAttribute("id", "galery " + work.id);
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.setAttribute("crossorigin", 'anonymous');
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
    sectionElement.appendChild(figureElement);
}

async function postWork() {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();
    json.forEach(work => { // Une boucle qui parcours tous les travaux tant qu'il y en a dans l'API
        createWork(work);
    })
};

postWork();


//\\\\\\\\\\\\\\\\\Ajouter les boutons filtrer/////////////////////\\

// Afficher les éléments filtrés
function showProjects(element, name) {
    let i, tableauUn, tableauDeux;
    tableauUn = element.className.split(" ");
    // console.log(tableauUn); On obtient un tableau avec les éléments filtrés qui contiennent la classe filterDiv et le categoryId
    tableauDeux = name.split(" ");
    // console.log(tableauDeux); On obtient un tableau avec les éléments filtrés qui contiennent la classe show
    for (i = 0; i < tableauDeux.length; i++) {
        if (tableauUn.indexOf(tableauDeux[i]) == -1) { // En dehors du tableau
            element.className += " " + tableauDeux[i];
        }
    }
    // console.log(element); Un tableau avec les éléments filtrés (qui ont toutes les classes)
};

// Cacher les éléments non filtrés
function hideProjects(element, name) {
    let i, tableauUn, tableauDeux;
    tableauUn = element.className.split(" ");
    tableauDeux = name.split(" ");
    for (i = 0; i < tableauDeux.length; i++) {
        while (tableauUn.indexOf(tableauDeux[i]) > -1) { // Dans le tableau
            tableauUn.splice(tableauUn.indexOf(tableauDeux[i]), 1);
        }
    }
    element.className = tableauUn.join(" ");
    // console.log(element); Un tableau avec tous les éléments mais ceux qui sont filtrés ont une classe en plus : "show"
};

// Fonction pour afficher tous les travaux selon leur catégorie
function filterSelection(classes) {
    let classeBoutonAffichage, i;
    classeBoutonAffichage = document.getElementsByClassName("filterDiv");
    // console.log(classeBoutonAffichage); Un tableau avec tous les projets et les classes / categoryId
    if (classes == "all") classes = "";
    // Ajoute la classe "show" aux éléments filtrés, et l'enlève à ceux non sélectionnés
    for (i = 0; i < classeBoutonAffichage.length; i++) {
        hideProjects(classeBoutonAffichage[i], "show");
        if (classeBoutonAffichage[i].className.indexOf(classes) > -1) {
            showProjects(classeBoutonAffichage[i], "show")
        }
    }
};

filterSelection();

// Ajouter la classe "active" au bouton actuellement cliqué (le mettre en évidence)
let filteredButton = document.getElementById("btnFilters");
let allButtons = filteredButton.getElementsByClassName("btn");
// console.log(allButtons);
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function() {
        let activeButton = document.getElementsByClassName("active");
        activeButton[0].className = activeButton[0].className.replace(" active", "");
        this.className += " active";
    });
};