//Récup du tableau des travaux (works) depuis l'API grâce à une fonction asynchrone
async function afficherTravail() {
    const reponse = await fetch('http://localhost:5678/api/works'); // await pour aller avec le async
    const json = await reponse.json();

    //Vérifier que le tableau est bien importé (via la console dans le navigateur)
    console.log(json);
}

//Appeler la fonction
afficherTravail();


//Cette fonction sert à créer les figures présentes de base dans le HTML
function creerFigure(works) {
    //On crée la constante "element" qui est lié aux balises <figure> du HTML
    const element = document.querySelector('figure');

    // 1. On importe l'image
    const imageFigure = document.createElement("img");
    imageFigure.src = works.imageUrl;

    // 2. On importe le texte
    const texteFigure = document.createElement("figcaption");
    texteFigure.src = works.title;

    return element;
}


//Création d'une fonction pour créer des liens parents-enfants et donc afficher ces éléments
function afficherFigure(figure) {
    gallery = document.getElementsByClassName(".gallery");
    gallery.appendChild(element);
    element.appendChild(imageFigure);
    element.appendChild(texteFigure);
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