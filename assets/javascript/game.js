var words = ["ocean", "seaweed", "clownfish", "shark", "jellyfish", "squid", "shrimp", "crab", 
             "starfish", "diver", "whale", "seahorse", "coral", "barracuda",  "dolhpin", "grouper",
             "hammerhead", "octupus", "oyster", "mantaray", "mermaid", "angelfish", "swordfish",
             "turtle", "stingray", "lobster", "seal", "conch", "salmon", "tuna", "moray"];

var begin = true; //true if first time using game
var wins = 0; //number or wins
var guessesRemaining = 10; //number of guesses
var lettersGuessed = ""; //store letters already guessed
var lettersNotInWord = ""; //store letters not in word
var answer = [];
var maskedWord = ""; //mask chosen word with dashes
var pickedWords = []; //save words already use

function randomWord () {

    //Get random word from array
    var word = words[Math.floor(Math.random() * words.length)];

    //loop through picked words and if already guessed then pick another one
    for (var i = 0; i < pickedWords.length; i++) {

        if (pickedWords[i] == word)
            word = words[Math.floor(Math.random() * words.length)];
    }

    pickedWords[pickedWords.length] = word;
    return word;

}

function replaceAt(index, char) {

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

function updateHtml () {

    //update html tags with values
    document.getElementById("word").innerHTML = maskedWord;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
    document.getElementById("lettersNotInWord").innerHTML = lettersNotInWord;
}

function checkLetters (word) {
    
    console.log(word);

    //get event from keyboard
    document.onkeypress = function(event) {

        if (guessesRemaining > 0) {

            //get code of key
            var charCode = event.which || event.keyCode;
            //convert code to character
            var charStr = String.fromCharCode(charCode);
            
            //if not a-z alert the user
            if (/[^a-z]/i.test(charStr)) {
                alert("please use only letters");
            }

            else {

                var indexOfLetters = [];
                //loop through word to check if character is in it, get index and save it
                for (var i = 0; i < word.length; i++) {
                    
                    if (charStr == word[i])
                        indexOfLetters[indexOfLetters.length] = i;
                }

                //if greater than 0 it means that character was found in word
                if (indexOfLetters.length > 0) {

                    //add character to guessed letters
                    lettersGuessed = lettersGuessed + " " + charStr.toUpperCase();

                    for (var i = 0; i < indexOfLetters.length; i++) {
                        maskedWord = replaceAt(indexOfLetters[i], charStr);
                    }
                }

                else {

                    lettersNotInWord = lettersNotInWord + " " + charStr.toUpperCase();
                    guessesRemaining--;
                }

                updateHtml ();
            }
        }
    }
}

function startGame () {

    var word = randomWord();
    maskedWord = word.replace(/[a-z]/gi, "- ").trim();
    var size = word.length;

    updateHtml();

    checkLetters(word, maskedWord);

}

document.onkeyup = function(event) {

    if (begin) {
        begin = false;
        document.getElementById("keyStart").style.display = "none";
        startGame ();
    }
}

