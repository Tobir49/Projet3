//\\\\\\\\\\\\\\\\\Afficher les projets/////////////////////\\

const apiWork = "http://localhost:5678/api/works";

// Récupération des données de l'API

async function afficherTravaux() {
    const response = await fetch(apiWork);
    const json = await response.json();

    json.forEach(data => { //Une boucle qui parcours tous les travaux tant qu'il y en a dans l'API
        const sectionProjets = document.querySelector(".gallery");
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("filterDiv", data.categoryId, "show"); // Une classe "cachée" qui servira pour les filtres
        const imageFigure = document.createElement("img");
        imageFigure.src = data.imageUrl;
        imageFigure.setAttribute("crossorigin", 'anonymous');
        const texteFigure = document.createElement("figcaption");
        texteFigure.innerText = data.title;
        baliseFigure.appendChild(imageFigure);
        baliseFigure.appendChild(texteFigure);
        sectionProjets.appendChild(baliseFigure);
    })
};

afficherTravaux();


//\\\\\\\\\\\\\\\\\Ajouter les boutons filtrer/////////////////////\\

filterSelection("all");

function filterSelection(classes) {
    let ensembleDesClasses, i;
    ensembleDesClasses = document.getElementsByClassName("filterDiv");
    if (classes == "all") classes = "";
    // Ajoute la classe "show" aux éléments filtrés, et l'enlève à ceux non sélectionnés
    for (i = 0; i < ensembleDesClasses.length; i++) {
        enleverClasseShow(ensembleDesClasses[i], "show");
        if (ensembleDesClasses[i].className.indexOf(classes) > -1) {
            ajouterClasseShow(ensembleDesClasses[i], "show")
        }
    }
};

// Afficher les éléments filtrés
function ajouterClasseShow(element, name) {
    let i, tableauUn, tableauDeux;
    tableauUn = element.className.split(" ");
    tableauDeux = name.split(" ");
    for (i = 0; i < tableauDeux.length; i++) {
        if (tableauUn.indexOf(tableauDeux[i]) == -1) {
            element.className += " " + tableauDeux[i];
        }
    }
};

// Cacher les éléments non filtrés
function enleverClasseShow(element, name) {
    let i, tableauUn, tableauDeux;
    tableauUn = element.className.split(" ");
    tableauDeux = name.split(" ");
    for (i = 0; i < tableauDeux.length; i++) {
        while (tableauUn.indexOf(tableauDeux[i]) > -1) {
            tableauUn.splice(tableauUn.indexOf(tableauDeux[i]), 1);
        }
    }
    element.className = tableauUn.join(" ");
};

// Ajouter la classe "show" au bouton actif
let bouton = document.getElementById("btnFilters");
let ensembleBoutons = bouton.getElementsByClassName("btn");
// console.log(ensembleBoutons);
for (let i = 0; i < ensembleBoutons.length; i++) {
    ensembleBoutons[i].addEventListener("click", function() {
        let boutonActuel = document.getElementsByClassName("active");
        boutonActuel[0].className = boutonActuel[0].className.replace(" active", "");
        this.className += " active";
    });
};