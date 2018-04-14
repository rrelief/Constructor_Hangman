
// Create a constructor that able to display an underlying character 
//or blank placeholder (such as underscore) when user guesses a letter
var Letter = function(character) {
    //constuctor should define a string value to store the underlying character for the letter
    this.character = character.toUpperCase();
    // constructor should have a boolean value that store if letter has been guessed or not
    this.letterCorrect = false;
    // need a function that returns letter if guessed correctly, or place holder if not guessed
    this.showCharacter = function() {
        if (this.letterCorrect) {
            console.log(this.character);
        }
        else {
            // console.log(" ( ° ͜ʖ͡°)┌∩┐ Try again! "); //--> might have to take this out
        }
    };
};

//**ROBBBBB TEST THIS BEFORE YOU CONTINUE ---> leave this for future test if you break it */
// var letter1 = new Letter ('a');
// letter1.showCharacter();

module.exports = Letter;