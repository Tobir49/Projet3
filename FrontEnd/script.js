//Permet de lancer les addEventListeneer à la fin, tout étant dans une seule et même fonction

document.addEventListener('DOMContentLoaded', principale);


//Fonction qui englobe tout le code
function principale() {


    //Récup du tableau des travaux depuis l'API grâce à une fonction asynchrone
    async function recupererTravail() {
        const reponse = await fetch('http://localhost:5678/api/works');
        const json = await reponse.json();
        return json;
    };


    //Cette fonction sert à créer les figures présentes de base dans le HTML
    function creerFigure(work) {
        // 1. On crée la constante "element" qui est lié aux balises <figure> du HTML
        const element = document.createElement('figure');
        // 2. On crée une balise image et on lui ajoute setAttribute sinon elles ne se chargent pas
        const imageFigure = document.createElement("img");
        imageFigure.setAttribute('crossorigin', 'anonymous');
        // On va chercher cet élément dans l'API
        imageFigure.src = work.imageUrl;
        // 3. On crée le texte
        const texteFigure = document.createElement("figcaption");
        // On va chercher cet élément dans l'API
        texteFigure.innerText = work.title;

        //Liaison des éléments à un parent
        element.appendChild(imageFigure);
        element.appendChild(texteFigure);

        return element;
    };


    //Création d'une fonction pour créer le parent des éléments de la fonction creerFigure
    function afficherFigure(figure) {
        // Tout ce qui découle de la classe gallery du HTML
        gallery = document.getElementsByClassName("gallery")[0];
        // La balise <figure> devient l'enfant de gallery
        gallery.appendChild(figure);

    };


    // La fonction comporte une boucle, pour afficher tous les travaux 
    function chargementEtAffichageTravaux() {
        //On crée une constante gallery avec innerHTML pour vider la balise puis la recréer
        document.getElementsByClassName("gallery")[0].innerHTML = "";
        recupererTravail().then(json => {
            // Créer les figure en parcourant le tableau
            for (let i = 0; i < json.length; i++) {
                const figure = creerFigure(json[i]);
                // Afficher les figures une par une
                afficherFigure(figure);
            };
        });
    };

    //On appelle la fonction
    chargementEtAffichageTravaux();



    ////////////////////////////////////////////////////////////////////////////////////////////////////



    // Maintenant que les travaux sont affichés via l'API, on fait en sorte de filtrer les projets par catégorie.
    // Pour cela on doit d'abord :

    // 1. Appel pour récup les catégories

    async function recupererCategories() {
        const reponse = await fetch('http://localhost:5678/api/categories');
        const json = await reponse.json();
        console.log(json);
        return json; // Ici on a un tableau avec 3 catégories : "Objets" / "Appartements" / "Hôtels & restaurants"
    };

    recupererCategories();

    // Chargement et affichage travaux filtrés (appelé dans le "onclick" de la fonction creerBouton())
    function chargementEtAffichageTravauxFiltres(id) {
        // L'id dans les () permet, lorsqu'on passera l'élément 0, d'afficher tous les projets
        // Ainsi, avec un autre élément entre () pour l'id comme (3), seulement les projets avec id=3 seront affichés
        document.getElementsByClassName("gallery")[0].innerHTML = "";
        recupererTravail().then(travaux => {
            // On applique un .filter() et un || pour que :
            // 1. Si l'id = 0 (donc à tous les éléments) tous les projets se chargent
            // 2. Sinon, si l'id = à un autre que 0, alors n'afficher que ceux-là
            let travauxFiltres = travaux.filter(element => id === 0 || element.categoryId === id); // Le categoryId = category{id} dans l'API
            for (let i = 0; i < travauxFiltres.length; i++) {
                const figure = creerFigure(travauxFiltres[i]);
                afficherFigure(figure);
            };
        });
    };

    // Cette fonction permet de créer les balises <button> comme on a créé plus haut les <figure>
    function creerBouton(id, name) {
        const creerLeBouton = document.createElement("button"); // Création de la balise <bouton>
        creerLeBouton.innerText = name; // Ajout d'un nom
        creerLeBouton.classList.add("bouton-unique"); // AJout d'une classe pour le style dans le CSS
        creerLeBouton.onclick = chargementEtAffichageTravauxFiltres(id); // Équivalent du addEventListener
    };

    function parentBoutons(button) {
        divBoutons = document.getElementsByClassName("div-boutons")[0];
        divBoutons.appendChild(button);
    };

    creerBouton(1, "Objets");

    // 2. Affichage des filtres
    recupererCategories().then(json => {
        // 2.A Rajouter une catégorie "Tous" dans le tableau
        listeCategories = json;
        listeCategories.unshift({ id: 0, name: "Tous" });

        //Pour chacune des catégories:
        for (let i = 0; i < json.length; i++) {
            // 2.B Créer des balises
            let boutonFiltre = creerBouton(id, name) // creerBouton renvoie une balise HTML pour le bouton

            // 2.C Afficher les balises

            afficherBoutonFiltre(boutonFiltre);
        };
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////


}