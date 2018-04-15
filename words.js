// have to create a constructor for the word the user is trying to guess

// First, need to require Letters.js because the word constructor depends on it
var Letter = require ("./Letters.js");

var Word = function (myWord) {
    //random chosen word
    this.myWord = myWord;
    //array of letters for chosen word
    this.letters = [];
    //next need an array of underscores for chosen word
    this.underscores = [];
    //now, I need to divide the letters up from the chosen word
    //time to learn a new function Rob 
    //JavaScript book --> suggest using split to break up string text (chosen word), that way I can just check the letters
    this.splitWord = function () {
        this.letters = this.myWord.split("");
        underscoresCreated = this.letters.length;
        //console.log(this.underscores) and use .jon method to join underscores pushed from this.underscore with a space 
		console.log(this.underscores.join(" "));
    };
     
    this.generateLetters = function() {
        for (i=0; i < this.letters.length; i++){
            console.log("here")
            this.letters[i] = new Letter (this.letters[i]);
            this.letters[i].showCharacter();
            ////world wide web suggests creating a large array that contains all letters for debugging
            // this.letters[i].letterCorrect = true;
            // console.log(this.letters[i]);
        }
    }
};

module.exports = Word;