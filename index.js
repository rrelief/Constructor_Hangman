// to work properly index.js requires word.js
var Word = require("./words.js").default;

//require npm packages
var inquirer = require("inquirer");
var isLetter = require("is-letter"); //--> Dope package tells me if the user importants a letter or some random ish
var boxen = require("boxen"); //--> Just a lil flair, adds boxes in the terminal (I'm fancy!)

// Default user guess needs to be false, change to true if guessed correctly
var userGuessedCorrectly = false;

var wordBank = ["HellCat", "Detroit", "Burnout","TeeGrizzley","BigSean", "DejLoaf", "Currency"];
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
//Looked cool on the internet, figured I'd try it out
console.log("Welcome to Hangman, Detroit Style!");
var howToPlay = "==========================================================================================================" + "\r\n" +
"How to play" + "\r\n" +
"==========================================================================================================" + "\r\n" +
"When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
"Keep guessing letters. When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
"If incorrect, the letter you guessed does not appear in the word." + "\r\n" + 
"For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
"If correct, the letter you guessed appears in the word." + "\r\n" +
"If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
"If you run out of guesses before the entire word is revealed, you lose. Game over and You SUCK!" + "\r\n" +
"===========================================================================================================" + "\r\n" +
"You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
"===========================================================================================================";
console.log(howToPlay);
 //Ask user if they are ready to play.
confirmStart();

function confirmStart() {
    var readyToStartGame = [
        {
            type: 'text',
            name: 'playerName',
            message: 'What is your name?'
        },
        {
            type: 'confirm',
            name: 'readyToPLay',
            default: true
        }
    ];

    inquirer.prompt(readyToStartGame).then(answers => {
        if (answers.readyToPLay){
            console.log("Let's Do This" + answers.playerName);
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
    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

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

//Need a function allowing the users to constantantly guess a letter until there are no more guesses remaining
function guessLetter(){
	if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
	inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter:",
    //Good opp to use NPM Package is-Letter to make sure people are being weird!
    validate: function(value) {
        if(isLetter(value)){
          return true;
        } 
        else {
          return false;
        }
      }
  }
]).then(function(guess) {
	//Convert all letters guessed by the user to upper case.
	guess.letter.toUpperCase();
	console.log("You guessed: " + guess.letter.toUpperCase());
	//Assume correct guess to be false at this point.
	userGuessedCorrectly = false;
	//Need to find out if letter was already guessed by the user. If already guessed by the user, notify the user to enter another letter.
	//User shouldn't be able to continue with game if they guess the same letter more than once.
	if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
		//If user already guessed a letter, run inquirer again to prompt them to enter a different letter.
		console.log("You already guessed that letter. Try another letter.");
		console.log("=====================================================================");
		guessLetter();
	}

	//If user entered a letter that was not already guessed...
	else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
		//Add letter to list of already guessed letters.
		lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
		lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
		//Show letters already guessed to user. Use dope BOXEN NPM Package to add a lil flair
		console.log(boxen('Letters already guessed: ') + lettersAlreadyGuessedList, {padding: 1});

		//Now need to loop through all of the letters in the word, 
		//and determine if the letter that the user guessed matches one of the letters in the word.
		for (i=0; i < someWord.letters.length; i++) {
			//If the user guess equals one of the letters/characters in the word and letterCorrect is equal to false for that letter...
			if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterCorrect === false) {
				//Set letterCorrect property for that letter equal to true.
				someWord.letters[i].letterCorrect === true;
				//Set userGuessedCorrectly to true.
				userGuessedCorrectly = true;
				someWord.underscores[i] = guess.letter.toUpperCase();
				//Increment the number of slots/underscores filled in with letters by 1.
				slotsFilledIn++;
			}
		}
		console.log("WORD TO GUESS:");
		someWord.splitWord();
		someWord.generateLetters();

		//If user guessed correctly...
		if (userGuessedCorrectly) {
			//Tell user they are CORRECT 
			console.log('CORRECT!');
			console.log("=====================================================================");
			//After each letter guess, check if the user won or lost.
			checkIfUserWon();
		}

		//Else if user guessed incorrectly...
		else {
			//Tell user they are INCORRECT (letter is not in the word).
			console.log('INCORRECT!');
			//Decrease number of guesses remaining by 1 and display number of guesses remaining.
			guessesRemaining--;
			console.log("You have " + guessesRemaining + " guesses left.");
			console.log("=====================================================================");
			//After each letter guess, check if the user won or lost.
			checkIfUserWon();
		}
	}
});
}
}

//This function will check if the user won or lost after user guesses a letter.
function checkIfUserWon() {
	//If number of guesses remaining is 0, end game.
	if (guessesRemaining === 0) {
		console.log("=====================================================================");
		console.log(" ( ° ͜ʖ͡°)┌∩┐ Try again! ");
		console.log("The correct word was: " + randomWord);
		//Increment loss counter by 1.
		losses++;
		//Display wins and losses totals.
		console.log("Wins: " + wins);
		console.log("Losses: " + losses);
		console.log("=====================================================================");
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}

	//else if the number of slots/underscores that are filled in with a letter equals the number of letters in the word, the user won.
	else if (slotsFilledIn === someWord.letters.length) {
		console.log("=====================================================================");
		console.log("You Won! You might be from Detroit!");
		//Increment win counter by 1.
		wins++;
		//Show total wins and losses.
		console.log("Wins: " + wins);
		console.log("Losses: " + losses);
		console.log("=====================================================================");
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}

	else {
		//If user did not win or lose after a guess, keep running inquirer.
		guessLetter("");
	}

}

//Create a function that will ask user if they want to play again at the end of the game.
function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
			//Empty out the array that contains the letters already guessed.
			lettersAlreadyGuessedList = "";
			lettersAlreadyGuessedListArray = [];
			//Set number of slots filled in with letters back to zero.
			slotsFilledIn = 0;
			console.log("Okkayyyyy! You're back Already?");
			//start a new game.
			startGame();
		}

		else {
			//If user doesn't want to play again, exit game.
			console.log("Good bye! Come back soon.");
			return;
		}
	});
}

