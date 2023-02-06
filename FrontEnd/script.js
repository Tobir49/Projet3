//Récup du tableau des travaux depuis l'API grâce à une fonction asynchrone
async function recupererTravail() {
    const reponse = await fetch('http://localhost:5678/api/works');
    const json = await reponse.json();
    return json;
}




//Cette fonction sert à créer les figures présentes de base dans le HTML
function creerFigure(work) {
    // 1. On crée la constante "element" qui est lié aux balises <figure> du HTML
    const element = document.createElement('figure');
    // 2. On crée une balise image et on lui ajoute setAttribute sinon elles ne se chargent pas
    const imageFigure = document.createElement("img");
    imageFigure.setAttribute('crossorigin', 'anonymous');
    // On va chercher cet élément dans l'API
    imageFigure.src = work.imageUrl;

    // 3. On importe le texte
    const texteFigure = document.createElement("figcaption");
    // On va chercher cet élément dans l'API
    texteFigure.innerText = work.title;

    //Liaison des éléments à un parent
    element.appendChild(imageFigure);
    element.appendChild(texteFigure);

    return element;
}

//Création d'une fonction pour créer le parent des éléments de la fonction creerFigure
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


// Maintenant que les travaux sont affichés via l'API, on fait en sorte de trier les projets par catégorie.