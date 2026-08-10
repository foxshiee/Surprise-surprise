const secretWord = "DREAM";

const board = document.getElementById("board");

const message = document.getElementById("message");

const gamePage = document.getElementById("gamePage");

const revealPage = document.getElementById("revealPage");

const letterPage = document.getElementById("letterPage");

const continueButton =
    document.getElementById("continueButton");


let currentRow = 0;

let currentGuess = "";

let gameOver = false;


/* =========================
   CREATE WORDLE BOARD
   ========================= */

for (let i = 0; i < 30; i++) {

    const box = document.createElement("div");

    box.classList.add("box");

    board.appendChild(box);
}


/* =========================
   ADD LETTER
   ========================= */

function addLetter(letter) {

    if (gameOver) return;


    if (currentGuess.length < 5) {

        currentGuess += letter;


        const boxes =
            document.querySelectorAll(".box");


        const boxIndex =
            currentRow * 5 +
            currentGuess.length - 1;


        boxes[boxIndex].textContent = letter;
    }
}


/* =========================
   DELETE LETTER
   ========================= */

function deleteLetter() {

    if (gameOver) return;


    if (currentGuess.length > 0) {

        currentGuess =
            currentGuess.slice(0, -1);


        const boxes =
            document.querySelectorAll(".box");


        const boxIndex =
            currentRow * 5 +
            currentGuess.length;


        boxes[boxIndex].textContent = "";
    }
}


/* =========================
   CHECK GUESS
   ========================= */

function checkGuess() {

    if (gameOver) return;


    if (currentGuess.length !== 5) {

        message.textContent =
            "Your guess needs 5 letters.";

        return;
    }


    const boxes =
        document.querySelectorAll(".box");


    for (let i = 0; i < 5; i++) {

        const box =
            boxes[currentRow * 5 + i];


        const letter =
            currentGuess[i];


        if (letter === secretWord[i]) {

            box.classList.add("correct");

        }

        else if (secretWord.includes(letter)) {

            box.classList.add("present");

        }

        else {

            box.classList.add("wrong");
        }
    }


    /* =========================
       CORRECT ANSWER
       ========================= */

    if (currentGuess === secretWord) {

        message.textContent =
            "You found it. ❤️";


        gameOver = true;


        setTimeout(function() {

            gamePage.classList.add("hidden");

            revealPage.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1200);


        return;
    }


    /* =========================
       WRONG ANSWER
       ========================= */

    message.textContent =
        "Not quite... try again.";


    currentRow++;

    currentGuess = "";


    /* SIX GUESSES */

    if (currentRow === 6) {

        message.textContent =
            "The word was DREAM. ❤️";

        gameOver = true;
    }
}


/* =========================
   COMPUTER KEYBOARD
   ========================= */

document.addEventListener(
    "keydown",
    function(event) {


        if (event.key === "Enter") {

            checkGuess();

        }


        else if (event.key === "Backspace") {

            deleteLetter();

        }


        else if (/^[a-zA-Z]$/.test(event.key)) {

            addLetter(
                event.key.toUpperCase()
            );
        }

    }
);


/* =========================
   PHONE KEYBOARD
   ========================= */

const keys =
    document.querySelectorAll(".key");


keys.forEach(function(key) {


    key.addEventListener(
        "click",
        function() {


            const value =
                key.textContent;


            if (value === "ENTER") {

                checkGuess();

            }


            else if (value === "⌫") {

                deleteLetter();

            }


            else {

                addLetter(value);
            }

        }
    );

});


/* =========================
   CONTINUE TO LETTER
   ========================= */

continueButton.addEventListener(
    "click",
    function() {

        revealPage.classList.add("hidden");

        letterPage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);