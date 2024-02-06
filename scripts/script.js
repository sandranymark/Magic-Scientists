'use strict';


window.addEventListener('load', () => {
    initPage();
});

function initPage() {
    document.querySelector('#spela').addEventListener('click', (event) => {
        event.preventDefault();
        validateLogin();
    });
}

function validateLogin() {
    const formDiv = document.querySelector('#formDiv');
    const userName = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const checkBox = document.querySelector('#question');
    const user = users.find((user) => user.username === userName && user.password === password);

    if (!user) {
        setErrorMessage("Felaktigt användarnamn eller lösenord");
        return;
    }

    if (!checkBox.checked) {
        setErrorMessage("Du behöver bekräfta att du inte är rädd för spöken!");
        return;
    }

    formDiv.classList.add('d-none');

    startGame();
}

function setErrorMessage(message) {
    const msg = document.querySelector('#msg');
    msg.textContent = message;
}


