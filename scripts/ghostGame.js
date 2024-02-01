'use strict';

// Ni skall använda er av de kunskaper som ni hittills förskaffat er, för att bygga ett spel som helt enkelt går ut på att fånga spöken. Vid ankomst till sidan ställs användaren inför ett inloggningsformulär, och det är först vid lyckad inloggning som spelet startar. Vid spelstart skall ni ladda upp ett slumpat antal spöken (mellan 10-15 stycken) på skärmen.

// För att fånga ett spöke behöver användaren föra muspekaren över spöket, och fångade spöken ersätts därefter av ett nät. Om användaren sedan i sin jakt på nästa spöke råkar komma åt ett nät med muspekaren, så smiter det fångade spöket och kommer upp på skärmen igen.

// När alla spöken är infångade tas alla bilder bort från skärmen, och inloggningsformuläret laddas återigen upp med ett vinstmeddelande.
const oGameData = {
    isGameRunning: false,
    left: function () {
        return Math.round(Math.random() * (window.innerWidth - 300)) + 1;
    },
    top: function () {
        return Math.round(Math.random() * (window.innerHeight - 300)) + 1;
    },

};

function startGame() {

    oGameData.numberOfGhosts = Math.floor(Math.random() * 6) + 10;

    const gameContainer = document.body;

    for (let i = 0; i < oGameData.numberOfGhosts; i++) {
        let ghost = createGhost();
        gameContainer.appendChild(ghost);
    }

    oGameData.isGameRunning = true;

    let audio = document.createElement('audio');
    audio.setAttribute('src', './resources/ghostmusic.mp3');
    document.body.appendChild(audio);
    document.querySelector('audio').addEventListener('loadedmetadata', () => {
        audio.currentTime = 10;
    });
    audio.play();
}


function stopGame() {
    oGameData.isGameRunning = false;

    let audio = document.querySelector('audio');
    audio.remove();


    // Ta bort alla spöken från skärmen
    const allGhosts = document.querySelectorAll('img');
    allGhosts.forEach((ghost) => {
        ghost.remove();
    });

    // Visa inloggningsformuläret med vinstmeddelandet
    const loginForm = document.getElementById('formDiv'); // Ersätt 'login-form' med ditt formulär ID
    formDiv.classList.remove('d-none');
    msg.textContent = 'Grattis! Du fångade alla spöken.';
}

function toggleGhost(ghostElement) {
    if (!oGameData.isGameRunning) return;

    let isCatched = ghostElement.getAttribute('data-catched');

    if (isCatched === 'false') {
        ghostElement.setAttribute('data-catched', 'true');
        ghostElement.setAttribute('src', './resources/net.png');
        oGameData.numberOfGhosts--; // decrement only when a ghost is caught
    } else {
        ghostElement.setAttribute('data-catched', 'false');
        ghostElement.setAttribute('src', './resources/ghost.png');
        oGameData.numberOfGhosts++; // increment when a ghost is released
    }

    if (oGameData.numberOfGhosts === 0) {
        stopGame();
    }
}

function createGhost() {
    let ghost = document.createElement("img");

    ghost.src = "./resources/ghost.png";
    ghost.classList.remove('hidden');
    ghost.style.top = oGameData.top() + 'px';
    ghost.style.left = oGameData.left() + 'px';
    ghost.setAttribute('data-catched', 'false');

    ghost.addEventListener('mouseover', () => {
        toggleGhost(ghost);
    });

    return ghost;
}