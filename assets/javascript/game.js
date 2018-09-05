var words = ["ocean", "seaweed", "clownfish", "shark", "jellyfish", "squid", "shrimp", "crab", 
             "starfish", "diver", "whale", "seahorse", "coral", "barracuda",  "dolhpin", "grouper",
             "hammerhead", "octupus", "oyster", "mantaray", "mermaid", "angelfish", "swordfish",
             "turtle", "stingray", "lobster", "seal", "conch", "salmon", "tuna", "moray"];

var begin = true;
var wins = 0;
var guessesRemaining = 10;
var lettersGuessed = "";
var answer = [];
var remaining;

function checkLetters () {

    document.onkeypress = function(event) {

        var charCode = event.which || event.keyCode;
        var charStr = String.fromCharCode(charCode);
           
        if (/[^a-z]/i.test(charStr)) {
            alert("please use only letters");
        }

        else {

        }
    };
}
function randomWord () {
    return words[Math.floor(Math.random() * words.length)];
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

function startGame () {

    var word = randomWord();
    var maskedWord = word.replace(/[a-z]/gi, "- ");
    remaining = word.length;
    var size = word.length;

    document.getElementById("word").innerHTML = maskedWord;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;

    checkLetters();

}

document.onkeyup = function(event) {

    if (begin) {
        begin = false;
        document.getElementById("keyStart").style.display = "none";
        startGame ();
    }
}

