// Definition des tableaux de sessions
let sessions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const sessionCopy = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

// Definition des 3 salles
let salles = [1, 2, 3];

// Definition des 4 demi-journees
let demijours = [1, 2, 3, 4];

// Definition d'un compter d'iteration et d'un maximum
let it = 0;
let itMax = 10000;

// Definition de la matrice qui represente les incompatibilites et les contraintes
let matrices = [
    [0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 2, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 2, 1, 2, 0, 1, 0, 0, 0],
];

// Declaration du tableau emploi du temps
let edt;

// Boucle qui cherche a obtenir une solution, c'est a dire un resultat qui aura utilise toutes les sessions avec le nombre d'iteration
// inferieur au nombre max
while (sessions.length > 0 && it < itMax) {

    // Melange du tableau de sessions
    sessions = shuffle(sessionCopy);

    // Definition de la matrice emploi du temps
    edt = [
        [
            null,
            null,
            null,
        ],
        [
            null,
            null,
            null,
        ],
        [
            null,
            null,
            null,
        ],
        [
            null,
            null,
            null,
        ],
    ];

    // Boucle qui tourne sur le nombre de demi-journees
    for (let i = 0; i < demijours.length; i++) {

        // Boucle qui tourne sur le nombre de salles
        for (let s = 0; s < salles.length; s++) {

            // Boucle qui tourne sur le nombre de sessions restantes
            for (let x = 0; x < sessions.length; x++) {

                // Verifie si les conditions sont respectees. C'est a dire :
                // - Salle non utilise sur ce creneau
                // - Si il n'y a pas une incompatibilite. (isOpen)
                // - Si il n'y a pas de contraine (isAfter)
                if (edt[i][s] === null && isOpen(i, s, sessions[x]) && isAfter(sessions[x], i) !== 0) {
                    // Ajout de la session dans la matrice de l'emploi du temps
                    edt[i][s] = sessions[x];
                    // Suppression de la session de la liste des sessions restantes
                    sessions.splice(x, 1);
                }
            }
        }
    }
    // Incrementation du compteur d'iteration
    it++;
}

// Fonction qui sert a melanger les elements d'un tableau
// @Param : Array
// @Return : Array
function shuffle(tab) {

    // Copie du tableau dans la variable a
    let a = Array.from(tab);

    // Boucle sur le nombre d'element dans la tableau
    for (let i = a.length - 1; i > 0; i--) {

        // Defini un nombre random pour deplacer l'element dans le tableau
        const j = Math.floor(Math.random() * (i + 1));

        // Inversion des elements du tableau
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Fonction qui sert a verifier qu'il n'y a pas d'incompatibilite
// @Param : 
//      i : number : demijournee
//      s : number : salle
//      x : string : lettre de la session 
// @Return : Boolean
function isOpen(i, s, x) {
    let res = true;

    // Boucle sur l'emploi du temps par rapport a une demijournee
    for (let y = 0; y < edt[i].length; y++) {

        // Verifie si le creneau est occupe et si il y a une incompatibilite entre les deux sessions
        if (edt[i][y] !== null && matrices[sessionCopy.indexOf(x)][sessionCopy.indexOf(edt[i][y])] === 1) {
            res = false;
            break;
        }
    }
    return res;
}

// Fonction qui sert a melanger les elements d'un tableau
// @Param : 
//      x : string : lettre de la session
//      i : number : demijournee
// @Return : Boolean
function isAfter(x, demijour) {
    let res = true;

    // recupere le numero de ligne de la session dans la matrice
    let y = sessionCopy.indexOf(x);

    // Boucle sur la matrice suivant la ligne recuperee
    for (let i = 0; i < matrices[y].length; i++) {

        // Verifie si il existe une contrainte sur la ligne
        if (matrices[y][i] === 2) {

            // Verifie si la contrainte a un impact ou non. C'est a dire :
            // - Si la session necessaire est bien faite avant 
            // - Si la session necessaire n'est pas faite sur la meme demi journee
            res &= ((sessions.indexOf(sessionCopy[i]) < 0) && (edt[demijour].indexOf(sessionCopy[i]) < 0));
        }
    }
    return res;
}

// ET ON MONTRE LE RESULTAT !!!!!!!!!!!
console.log(edt);
// Et ici le nombre d'iterations
console.log(it);
