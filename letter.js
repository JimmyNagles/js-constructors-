

var Letter = function (letra) {
    this.letra = letra;
    this.isLetterGuessed = false;

    this.display = function () {
        if (this.letra == ' ') {
            return (' ');
        }

        else if (this.isLetterGuessed) {
            return (this.letra)
        }

        else if (this.letra == "'") {
            return ("'")
        }

        else if (this.letra == "-") {
            return ("-")
        }

        else if (this.isLetterGuessed === false) {
            return ("_ ");
        }
    }

    this.letterGuess = function (guess) {
        if (guess.toLowerCase() === this.letra.toLowerCase()) {
            this.isLetterGuessed = true;
        }
    }
}

module.exports = Letter;
