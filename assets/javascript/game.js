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
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 
                        'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

function randomWord () {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame () {

    var word = randomWord();
    var maskedWord = word.replace(/[a-z]/gi, "- ");
    console.log(maskedWord);
    remaining = word.length;
    var size = word.length;
    console.log(size);

    document.getElementById("word").innerHTML = maskedWord;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesRemaining").innerHTML = guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;

}

document.onkeyup = function(event) {

    if (begin) {
        begin = false;
        document.getElementById("keyStart").style.display = "none";
        startGame ();
    }
}

