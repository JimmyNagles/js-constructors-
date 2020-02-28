var inquirer = require("inquirer");

var Word = require("./Word.js");



//changes color of text on console
var chalk = require('chalk');

var guesses = 10;
var points = 0;

var wordsToGuess = ["FC Bayern Munich", "Chelsea", "Manchester United", "Real Madrid", "Manchester City", "Borussia Dortmund", "Lyon", "Liverpool", "Paris Saint-Germain", "Arsenal", "FC Barcelona"];
var randomWord;
var chosenWord;

function startGame() {

    console.log(chalk.red("Time to play! guess the football Team!"));
}

function getRandomWord() {
    
    randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]

    chosenWord = new Word(randomWord);
}



function guessWord() {

    if (guesses > 0 && points < 5) {
        
        console.log(chosenWord.display());
    
        
        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }

            }

        ]).then(function (guessedLetter) {
            
            var guess = guessedLetter.txt;

            chosenWord.checkGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log(chalk.red("INCORRECT! " + guesses + " guesses remaining"))
            } 
            else {
                if (points < 5) {
                console.log(chalk.green("CORRECT!"))
            }
            }

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
                points++;
                
                if (points < 5) {
                    console.log(chalk.green("CORRECT! Next Team!"));
                    getRandomWord();
                }

                else {
                    winGame();
                }
            }

            if (guesses === 0) {
                loseGame();
            }

            guessWord();

        });
    }

}

function loseGame() {
    console.log(chalk.red("GAME OVER!"));

    
 restartGame();
}

function winGame() {
    
    figlet('YOU WIN!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)

    })
    restartGame();

    
   
    
}



function restartGame(){
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                getRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.red("Lame! perhaps another time!"));
                process.exit();
            }
        })
}

startGame();
getRandomWord();
guessWord();