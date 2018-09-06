var words = ["ocean", "seaweed", "clownfish", "shark", "jellyfish", "squid", "shrimp", "crab", 
             "starfish", "diver", "whale", "seahorse", "coral", "barracuda",  "dolhpin", "grouper",
             "hammerhead", "octupus", "oyster", "mantaray", "mermaid", "angelfish", "swordfish",
             "turtle", "stingray", "lobster", "seal", "conch", "salmon", "tuna", "moray"];

var begin = true;
var wins = 0;
var guessesRemaining = 10;
var lettersGuessed = "";
var answer = [];
var maskedWord = "";

function randomWord () {
    return words[Math.floor(Math.random() * words.length)];
}

function replaceAt(index, char) {

    var pos = 0;

    for (var i = 0; i < maskedWord.length; i++) {

        if ((maskedWord[i] == "-" || maskedWord[i].match(/[a-z]/i)) && i != 0)
            pos++;

        if (pos == index) {
            pos = i;
            break;
        }
    }

    return maskedWord.substr(0,pos) + char + maskedWord.substr(pos+1);
}

function updateHtml () {

    document.getElementById("word").innerHTML = maskedWord;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;
}

function checkLetters (word) {
    
    console.log(word);

    document.onkeypress = function(event) {

        var charCode = event.which || event.keyCode;
        var charStr = String.fromCharCode(charCode);
           
        if (/[^a-z]/i.test(charStr)) {
            alert("please use only letters");
        }

        else {

            var indexOfLetters = [];
            for (var i = 0; i < word.length; i++) {
                
                if (charStr == word[i])
                    indexOfLetters[indexOfLetters.length] = i;
            }

            if (indexOfLetters.length > 0) {

                lettersGuessed = lettersGuessed + " " + charStr.toUpperCase();

                for (var i = 0; i < indexOfLetters.length; i++) {
                    maskedWord = replaceAt(indexOfLetters[i], charStr);
                }
            }

            else
                guessesRemaining--;

            updateHtml ();

        }
    };
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

