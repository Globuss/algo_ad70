let sessions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const sessionCopy = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

let salles = [1, 2, 3];

let demijours = [1, 2, 3, 4];

let it = 0;
let itMax = 10000;

let matrices = [
    [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0],
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

let edt;

while (sessions.length > 0 && it < itMax) {

    sessions = shuffle(sessionCopy);
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

    for (let i = 0; i < demijours.length; i++) {

        for (let s = 0; s < salles.length; s++) {

            for (let x = 0; x < sessions.length; x++) {

                if (edt[i][s] === null && isOpen(i, s, sessions[x]) && isAfter(sessions[x], i) !== 0) {
                    edt[i][s] = sessions[x];
                    sessions.splice(x, 1);
                }
            }
        }
    }

    it++;
}

function shuffle(tab) {
    let a = Array.from(tab);
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function isOpen(i, s, x) {
    let res = true;

    for (let y = 0; y < edt[i].length; y++) {

        if (edt[i][y] !== null && matrices[sessionCopy.indexOf(x)][sessionCopy.indexOf(edt[i][y])] === 1) {
            res = false;
            break;
        }
    }
    return res;
}

function isAfter(x, demijour) {
    let res = true;
    let y = sessionCopy.indexOf(x);

    for (let i = 0; i < matrices[y].length; i++) {

        if (matrices[y][i] === 2) {

            res &= ((sessions.indexOf(sessionCopy[i]) < 0) && (edt[demijour].indexOf(sessionCopy[i]) < 0));
        }
    }
    return res;
}

console.log(edt);
console.log(it);