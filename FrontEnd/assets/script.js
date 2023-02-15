//\\\\\\\\\\\\\\\\\Afficher les projets/////////////////////\\

const apiWork = "http://localhost:5678/api/works";


async function fetchWork() {
    const response = await fetch(apiWork);
    const json = await response.json();

    json.forEach(data => {
        const sectionProjets = document.querySelector(".gallery");
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("filterDiv", data.categoryId, "show");
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

fetchWork();


//\\\\\\\\\\\\\\\\\Ajouter les boutons filtrer/////////////////////\\

filterSelection("all");

function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    // Ajoute la classe "show" aux éléments filtrés, et l'enlève à ceux non sélectionnés
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
};

// Afficher les éléments filtrés
function w3AddClass(element, name) {
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
function w3RemoveClass(element, name) {
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