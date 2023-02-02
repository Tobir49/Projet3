//Récup des figures depuis l'API
async function afficherTravail() {
    const element = await fetch('http://localhost:5678/api/works');
}

function recupererFigure(element) {
    for (let i = 0; i < element.length; i++) {

        const work = element[i];
        // Classe qui comporte toutes les figures
        const classeGalerry = document.querySelector(".gallery");
        // Balise qui contient les images et le texte (<figure>)
        const totalFigure = document.createElement("figure");
        // Balises présentes dans une <figure>
        const imageFigure = document.createElement("img");
        imageFigure.src = work.imageUrl;
        const nomFigure = document.createElement("figcaption");
        nomFigure.innerText = work.title;
        // Rattachement des balises à un parent (pour être affiché sur la page)
        classeGalerry.appendChild(totalFigure);
        totalFigure.appendChild(imageFigure);
        totalFigure.appendChild(nomFigure);

    }
}

recupererFigure(element);

//Création d'une fonction pour afficher les figures (Image + Texte) sur la page

function afficherFigure(figure) {
    gallery = document.getElementsByClassName(".gallery");
    gallery.appendChild(figure);
}