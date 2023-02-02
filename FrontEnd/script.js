//Récup des figures depuis l'API
async function afficherTravail() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const json = await reponse.json();
    console.log(json);
}

afficherTravail();


//Cette fonction sert à créer les figures présentes de base dans le HTML
function creerFigure(works) {
    const element = document.querySelector('figure');

    // 1. On importe l'image
    const imageFigure = document.createElement("img");
    imageFigure.src = works.imageUrl;

    // 2. On importe le texte
    const texteFigure = document.createElement("figcaption");
    texteFigure.src = works.title;

    return element;
}


//Création d'une fonction pour afficher les figures (Image + Texte) sur la page
function afficherFigure(figure) {
    gallery = document.getElementsByClassName(".gallery");
    gallery.appendChild(element);
}

// La fonction comporte une boucle, pour afficher tous les travaux 
function chargementEtAffichageTravaux() {

    // 1. Récupération des travaux sur l'API
    const tableauWork = fetch("http://localhost:5678/api/works");

    // 2. Créer les figure en parcourant le tableau
    for (i = 0; i < tableauWork.length; i++) {
        figure = creerFigure(tableauWork[i]);
        afficherFigure(figure);
    }
}


//On appelle la fonction
chargementEtAffichageTravaux();