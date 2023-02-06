//Récup du tableau des travaux (works) depuis l'API grâce à une fonction asynchrone
async function recupererTravail() {
    const reponse = await fetch('http://localhost:5678/api/works'); // await pour aller avec le async
    const json = await reponse.json();
    //Vérifier que le tableau est bien importé (via la console dans le navigateur)
    return json;
}




//Cette fonction sert à créer les figures présentes de base dans le HTML
function creerFigure(work) {
    // 1. On crée la constante "element" qui est lié aux balises <figure> du HTML
    const element = document.createElement('figure');
    // 2. On crée une balise image
    const imageFigure = document.createElement("img");
    imageFigure.setAttribute('crossorigin', 'anonymous');
    // On va chercher cet élément dans l'API
    imageFigure.src = work.imageUrl;

    // 3. On importe le texte
    const texteFigure = document.createElement("figcaption");
    texteFigure.innerText = work.title;

    element.appendChild(imageFigure);
    element.appendChild(texteFigure);

    return element;
}

//Création d'une fonction pour créer des liens parents-enfants et donc afficher ces éléments
function afficherFigure(figure) {
    // Tout ce qui découle de la classe gallery du HTML
    gallery = document.getElementsByClassName("gallery")[0];
    // La balise <figure> devient l'enfant de gallery
    gallery.appendChild(figure);

}



// La fonction comporte une boucle, pour afficher tous les travaux 
function chargementEtAffichageTravaux() {
    recupererTravail().then(json => {
        // Créer les figure en parcourant le tableau
        for (let i = 0; i < json.length; i++) {
            const figure = creerFigure(json[i]);
            // Afficher les figures une par une
            afficherFigure(figure);
        };
    });
}


//On appelle la fonction
chargementEtAffichageTravaux();