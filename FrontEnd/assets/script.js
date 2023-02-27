//\\\\\\\\\\\\\\\\\Afficher les projets/////////////////////\\

// Récupération des données de l'API

async function afficherTravaux() {
    const response = await fetch("http://localhost:5678/api/works");
    const json = await response.json();

    json.forEach(projets => { //Une boucle qui parcours tous les travaux tant qu'il y en a dans l'API
        const sectionProjets = document.querySelector(".gallery");
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("filterDiv", projets.categoryId, "show"); // Une classe qui servira pour les filtres
        const imageFigure = document.createElement("img");
        imageFigure.src = projets.imageUrl;
        imageFigure.setAttribute("crossorigin", 'anonymous');
        const texteFigure = document.createElement("figcaption");
        texteFigure.innerText = projets.title;
        baliseFigure.appendChild(imageFigure);
        baliseFigure.appendChild(texteFigure);
        sectionProjets.appendChild(baliseFigure);
    })
};

afficherTravaux();


//\\\\\\\\\\\\\\\\\Ajouter les boutons filtrer/////////////////////\\

// Afficher les éléments filtrés
function afficherProjets(element, name) {
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
function enleverProjets(element, name) {
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

// Fonction pour afficher tous les travaux selon leur catégorie
function filterSelection(classes) {
    let classeBoutonAffichage, i;
    classeBoutonAffichage = document.getElementsByClassName("filterDiv");
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