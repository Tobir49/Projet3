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

function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Ajoute la classe "show" aux éléments filtrés, et l'enlève à ceux non sélectionnés
    for (i = 0; i < x.length; i++) {
        enleverClasseShow(x[i], "show");
        if (x[i].className.indexOf(c) > -1) ajouterClasseShow(x[i], "show");
    }
};

// Afficher les éléments filtrés
function ajouterClasseShow(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
};

// Cacher les éléments non filtrés
function enleverClasseShow(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
};

// Ajouter la classe "show" au bouton actif
let btnContainer = document.getElementById("btnFilters");
let btns = btnContainer.getElementsByClassName("btn");
console.log(btns);
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
};


//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\