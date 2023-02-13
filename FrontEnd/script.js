//Permet de lancer les addEventListeneer à la fin, tout étant dans une seule et même fonction

document.addEventListener('DOMContentLoaded', principale);

//Fonction qui englobe tout 

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


    // Maintenant que les travaux sont affichés via l'API, on fait en sorte de trier les projets par catégorie.

    //Fonction pour récupérer les catégories et en faire un nouveau tableau

    /* function recupererCategories() {
        recupererTravail().then(json => {
            const categorieObjet = json.map(work => work.category);
            console.log(categorieObjet);
        });
    };

    recupererCategories(); */

    async function recupererCategories() {
        const reponse = await fetch('http://localhost:5678/api/categories');
        const json = await reponse.json();
        console.log(json);
        return json;
    };


    //Création de la constante qui englobera le bouton pour afficher les objets
    const boutonObjets = document.querySelector(".bouton-objets");

    /*function parentObjet(boutonObjets) {
        bouttons = document.getElementsByClassName("bouttons")[0];
        bouttons.appendChild(boutonObjets);
    };

    console.log(boutonObjets);


     // Vérifier si l'élément n'est plus null avant d'ajouter addEventListener()

     boutonObjets.addEventListener('click', () => {
         alert('La bouton est fonctionnel');
     });


     boutonObjets.addEventListener("click", function() {
        recupererCategories().then(json => {
            //La boucle permet d'afficher des figures si les projets sont des objets
            for (let i = 0; i === "Objets"; i++) {
                const figure = creerFigure(json[i]);
                afficherFigure(figure);
            };
        });
        return json.filter();
    }); */


    // 1. Récupérer les données des catégories
    recupererCategories();
    // 2. Ajouter un addEventListener
    boutonObjets.addEventListener("click", recupererCategories().then(json => {
        // 3. Faire une boucle qui parcours le tableau des catégories
        for (let i = 0; i < json.length; i++) {
            let travail = json[i];
            // 4. Pour chaque boucle avec une catégorie : afficher les figures (innerHTML ?)
            if (travail.name === "Objets") {
                afficherFigure(creerFigure(travail));
            }
        }
    }));
    // 5. Ajouter une fonction globale (all) 

    function afficherProjetsFiltres(categoryId) {
        for (let i = 0; i < json.length; i++) {
            if (category.name === ["Objets", "Appartements", "Hotels & restaurants"]) {
                const tousProjets = document.querySelectorAll(".bouton-tous");
                tousProjets.addEventListener("click", chargementEtAffichageTravaux())
            }
            elif(category.name === "Objets")
                /*Afficher Objets
                const objetsFiltres = work.filter(function(){
                    return 
                }) */

            elif(category.name === "Appartements")
                //Afficher Appartements

            elif(category.name === "Hotels & restaurants")
                //Afficher Hotels & restaurants
        }

    };

    afficherProjetsFiltres(1);
}


// 1. Appel pour récup les catégories
// Ici on a un tableau avec 3 catégories

/*fonction ici

func creerBouton(id, name) {
        baliseHtml = createElement("button");
        baliseHtml.innerText = name
        baliseHTML.class = "bouton-unique"
        baliseHtml.onclick = chargementetaffichagetravauxfiltres(id)


        /* function chargementEtAffichageTravaux() {
        recupererTravail().then(json => {
            for (let i = 0; i < json.length; i++) {
                const figure = creerFigure(json[i]);
                afficherFigure(figure);
            };
        });
    };
}

// 2. Affichage des filtres
    recupCategories().then(json => {
        // 2.A Rajouter une catégorie "Tous" dans le tableau
        listeCategories = json;
        listeCategories.unshift({id: 0, name: "Tous"});

        //Pour chacune des catégories:
        for(...)
        {
            // 2.B Créer des balises
            let boutonFiltre = creerBouton(id, name) // creerBouton renvoi une balise html pour le bouton

            // 2.C Afficher les balises

            afficherBoutonFiltre(boutonFiltre);
        }
    })*/

// Chargement et affichage travaux filtrés (appelé dans le "onclick")
function chargementEtAffichageTravauxFiltres(id) {
    document.getElementsByClassName("gallery")[0].innerHTML = "";
    recupererTravail().then(travaux => {
        let travauxFiltres = travaux.filter(element => id === 0 || element.categoryId === id);
        for (let i = 0; i < travauxFiltres.length; i++) {
            const figure = creerFigure(travauxFiltres[i]);
            afficherFigure(figure);
        };
    });

};