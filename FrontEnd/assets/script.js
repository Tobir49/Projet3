//\\\\\\\\\\\\\\\\\Afficher les projets/////////////////////\\

// Récupération des données de l'API

// Fonction qui crée les travaux
function creationTravaux(projets) {
    const sectionProjets = document.querySelector(".gallery");
    const baliseFigure = document.createElement("figure");
    baliseFigure.classList.add("filterDiv", projets.categoryId, "show"); // Une classe qui servira pour les filtres
    baliseFigure.setAttribute("id", "galery " + projets.id);
    const imageFigure = document.createElement("img");
    imageFigure.src = projets.imageUrl;
    imageFigure.setAttribute("crossorigin", 'anonymous');
    const texteFigure = document.createElement("figcaption");
    texteFigure.innerText = projets.title;
    baliseFigure.appendChild(imageFigure);
    baliseFigure.appendChild(texteFigure);
    sectionProjets.appendChild(baliseFigure);
}

async function afficherTravaux() {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();

    json.forEach(projets => { // Une boucle qui parcours tous les travaux tant qu'il y en a dans l'API
        // Appel de la fonction qui crée les travaux dans cette boucle
        creationTravaux(projets);
    })
};

afficherTravaux();


//\\\\\\\\\\\\\\\\\Ajouter les boutons filtrer/////////////////////\\

// Afficher les éléments filtrés
function afficherProjets(element, name) {
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
function enleverProjets(element, name) {
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
        enleverProjets(classeBoutonAffichage[i], "show");
        if (classeBoutonAffichage[i].className.indexOf(classes) > -1) {
            afficherProjets(classeBoutonAffichage[i], "show")
        }
    }
};

filterSelection();

// Ajouter la classe "active" au bouton actuellement cliqué (le mettre en évidence)
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