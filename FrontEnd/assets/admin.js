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