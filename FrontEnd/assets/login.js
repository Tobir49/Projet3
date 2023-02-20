//\\\\\\\\\\\\\\\\\Se connecter/////////////////////\\

// function check(form) {
//     if (form.email.value == "sophie.bluel@test.tld" && form.password.value == "S0phie") {
//         return true;
//     } else {
//         alert("Erreur dans l’identifiant ou le mot de passe")
//         return false;
//     }
// };


// let token = "http://localhost:5678/api/users/login";

// /* if (token) {
//     rediriger vers la page de base
//     créer les boutons edit et la bannière
// } */


const apiLogin = "http://localhost:5678/api/users/login";

async function login() {
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    let reponse = await fetch(apiLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    });
    window.location.href('../index.html')
};

login();