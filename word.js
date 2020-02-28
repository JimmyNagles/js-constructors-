var Letter = require("./Letter.js");

var Word = function (word) {

    this.buildWord = function (word) {
        var lettersArray = [];
        for (var i = 0; i < word.length; i++) {
            //uses letter js file to check for the letter
            var currentLetter = new Letter(word[i]);
            lettersArray.push(currentLetter);
        }
        return lettersArray;
    }

    this.letters = this.buildWord(word);
    this.chosenWord = word;

    this.checkGuess = function (guess) {

        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuess(guess);

        }
    }

    this.display = function () {
        var lettersArray = '';
        for (var i = 0; i < this.letters.length; i++) {
            lettersArray += this.letters[i].display();
        }
        return lettersArray;
    }


}

module.exports = Word;



