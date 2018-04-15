// to work properly index.js requires word.js
var Word = require("./words.js");

//require npm packages
var inquirer = require("inquirer");
var isLetter = require("is-letter"); //--> Dope package tells me if the user importants a letter or some random ish

// Default user guess needs to be false, change to true if guessed correctly
var userGuessedCorrectly = false;

var wordBank = ["HellCat", "Detroit", "Burnout","TeeGrizzley","BigSean", "DejLoaf", "Currency"];
console.log(wordBank);
var randomWord;
var someWord;

//Need counters for wins, losses and guesses remaining
var wins = 0;
var losses = 0;
var guessesRemaining = 15;

//create a variable that holds UserGuess
var userGuess = "";
var lettersAlreadyGuessedlist = "";
var lettersAlreadyGuessedListArray = [];

//need a variable for underscores that are filled in as the user guesses correctly
var slotsFilledIn = 0;

//--------------------------------------------------------GAME PLAY RULES -------------------------------------------------------------------
//I'm lazy and found the rules on the Internet
console.log("Welcome to Hangman, Detroit Style!");

var howToPlay =
"How to play" + "\r\n" +
"==========================================================================================================" + "\r\n" +
"(1) Enter any letter (a-z) to guess a letter." + "\r\n" +
"(2) If you guess the wrong letter it will show up as incorrect, but keep guessing until number of guesses reach 0" + "\r\n" + 
"(3) Correct letters are revealed in the word." + "\r\n" +
"(4) If you run out of guesses ---> Game over and You SUCK!" + "\r\n" +
"===========================================================================================================" + "\r\n" +
"You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
"===========================================================================================================";
console.log(howToPlay);
 //Ask user if they are ready to play.
confirmStart();

function confirmStart() {
    var readyToStartGame = [
        { type: 'confirm', message: "Ready to play?", name: 'readyToPLay', default: true }
    ];

    inquirer.prompt(readyToStartGame).then(answers => {
        if (answers.readyToPLay){
            console.log("Let's Do This" + answers);
            startGame();
        }
        else {
            //exit the game if they don't want to play
            console.log("You're Missing Out!");
            return;
        }
    });
}

//Start game function.
function startGame(){
	guessesRemaining = 15;
	chooseRandomWord();
	lettersAlreadyGuessedList = "";
	lettersAlreadyGuessedListArray = [];
}

//Function to choose a random word use random generator
function chooseRandomWord() {
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();

    //Set the random word chosen from the word list to someWord.
    someWord = new Word(randomWord);

    //Tell the user how many letters are in the word.
    console.log("Your word contains " + randomWord.length + " letters.");
    console.log("WORD TO GUESS:");

    //Use the Word constructor in Word.js to split the word and generate letters.
    someWord.splitWord();
    someWord.generateLetters();
    guessLetter();
}

