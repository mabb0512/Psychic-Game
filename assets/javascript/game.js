//array of words
var words = ["aquaman", "seaweed", "clownfish", "shark", "jellyfish", "squid", "shrimp", "crab", 
             "starfish", "diver", "whale", "seahorse", "coral", "barracuda",  "dolphin", "grouper",
             "hammerhead", "octupus", "oyster", "mantaray", "mermaid", "angelfish", "swordfish",
             "turtle", "stingray", "lobster", "seal", "conch", "salmon", "tuna", "moray", "atlantis",
             "bluefish", "marlin", "anemone", "anchovy", "bass", "dory", "nemo", "eel", "flounder", "fluke",
             "halibut", "manatee", "mussle"];

var words2 = [];

var begin = true; //true if first time using game
var wins = 0; //number or wins
var guessesRemaining = 10; //number of guesses
var lettersGuessed = ""; //store letters already guessed
var lettersNotInWord = ""; //store letters not in word
var lettersGuessedArray = [];
var lettersNotInWordArray = [];
var maskedWord = ""; //mask chosen word with dashes
var pickedWords = []; //save words already use
var gameOver = false;
var gameWinned = false;
var playAgain = false;
var word = "";

//choose random word to guess from words array
function randomWord () {

    //check 2nd array to make sure is not empty
    if (words2.length == 0)
        words2 = words;

    //if user plays again delete guessed word from 2nd array and choose other one to prevent repeated words
    else if (playAgain) {

        //if guessed word in 2nd array delete it 
        if (words2.indexOf(word) > -1)
            words2.splice (words2.indexOf(word), 1)

        //choose other word to play from 2nd array
        word = words2[Math.floor(Math.random() * words2.length)];
    }

    //1st time playing, so choose from 1st array
    else
        word = words[Math.floor(Math.random() * words.length)];
    
    return word;
}

//function to play winning audio
function youWinAudio () {

    var winAudio = document.getElementById("winAudio"); 
    winAudio.play();
    startAgain();
}

//function to play loser audio
function youLoseAudio () {
    
    var loseAudio = document.getElementById("loseAudio"); 
    loseAudio.play();
    startAgain();
}

//replaces "-" with correct letter of word
function replaceAt(index, char) {

    checkWordComplete();
    var pos = 0; //counter to consider spaces between dashes

    //loop through masked word to replace dashes with character
    for (var i = 0; i < maskedWord.length; i++) {

        if ((maskedWord[i] == "-" || maskedWord[i].match(/[a-z]/i)) && i != 0)
            pos++;

        if (pos == index) {
            pos = i;
            break;
        }
    }

    //update "-" with correct character
    return maskedWord.substr(0,pos) + char + maskedWord.substr(pos+1);
}

//start game again after winning or losing and reset variables
function startAgain () {

    document.onkeypress = function(event) { 
            
        gameWinned = false;
        gameOver = false;
        guessesRemaining = 10;
        lettersGuessed = "";
        lettersNotInWord = "";
        lettersGuessedArray = [];
        lettersNotInWordArray = [];
        startGame();
    }
}

//updates html tags to display progres of game
function updateHtml () {

    //if game over alert user and give option to begin again
    if (gameOver) {

        document.getElementById("keyStart").innerHTML = "Game Over! You Lose. Try Again. Press Any Key to continue.";
        youLoseAudio();
    }

    //if game won alert user and give option to begin again
    if (gameWinned) {
        
        document.getElementById("keyStart").innerHTML = "You Win!. Keep going. Press Any Key to continue.";
        youWinAudio();
    }

    //update html tags with values
    document.getElementById("word").innerHTML = maskedWord.toUpperCase();
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
    document.getElementById("lettersNotInWord").innerHTML = lettersNotInWord;

}

//checks if the word is complete to win the game
function checkWordComplete (word) {

    //compare masked word (without spaces in between) with word
    if (maskedWord.replace(/ /g,'') == word) {

        wins++;
        gameWinned = true;
        playAgain = true;
        updateHtml();
    }
}

//checks if chosen letter is in word
function checkLetters (word) {

    //get event from keyboard
    document.onkeypress = function(event) {

        //check only if guesses are remaining
        if (guessesRemaining > 0) {

            //get code of key
            var charCode = event.which || event.keyCode;
            //convert code to character
            var charStr = String.fromCharCode(charCode).toLowerCase();
            
            //if not a-z alert the user
            if (/[^a-z]/i.test(charStr)) {
                alert("please use only letters");
            }

            //checks that chosen letter has been used and alerts the user
            else if ((lettersGuessedArray.length > 0 && lettersGuessedArray.indexOf(charStr) != -1) || 
                     (lettersNotInWordArray.length > 0 && lettersNotInWordArray.indexOf(charStr) != -1)) {
                alert ("Letter already used. Pick another one!");
            }

            //if letter not previously chosen checks if its in the word
            else {

                var indexOfLetters = [];

                //loop through word to check if character is in it, get index and save it
                for (var i = 0; i < word.length; i++) {
                    
                    if (charStr == word[i])
                        indexOfLetters[indexOfLetters.length] = i;
                }

                //if greater than 0 it means that character was found in word
                if (indexOfLetters.length > 0) {

                    //add character to guessed letters array
                    lettersGuessed = lettersGuessed + " " + charStr.toUpperCase();
                    lettersGuessedArray[lettersGuessedArray.length] = charStr;

                    //replaces letter in correct position of masked word
                    for (var i = 0; i < indexOfLetters.length; i++) {
                        maskedWord = replaceAt(indexOfLetters[i], charStr);
                    }
                }

                //letter not found in word
                else {

                    lettersNotInWord = lettersNotInWord + " " + charStr.toUpperCase();
                    lettersNotInWordArray[lettersNotInWordArray.length] = charStr;
                    guessesRemaining--;
                }

                //checks if masked word is equal to word to win the game
                checkWordComplete(word);
            }
        }

        //ran out of guesses so game over
        else {
             gameOver = true;
             playAgain = true;
        }
           

        //updates html content with updated variables to track progress
        updateHtml ();
    }
}

//start game. choose random word, update html tags with progress and check letters chosen
function startGame () {

    var word = randomWord();
    maskedWord = word.replace(/[a-z]/gi, "- ").trim();
    var size = word.length;

    document.getElementById("keyStart").innerHTML = "Word to Guess is " + size + " letters long:"

    updateHtml();
    checkLetters(word);
}

//1st time to begin game
document.onkeyup = function(event) {

    if (begin) {
        begin = false;
        words2 = words;
        startGame ();
    }
}

