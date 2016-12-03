$("#clear-all").click(function() {
  localStorage.clear();
  location.reload();
});

$("#home-name").bind('keyup', function(e) {
    var value = $("#home-name").val();
    document.getElementById("home-color-name").innerHTML = value;
});

$("#away-name").bind('keyup', function(e) {
    var value = $("#away-name").val();
    document.getElementById("away-color-name").innerHTML = value;
});

$("#save-settings").click(function() {
    if(false){
        //if the game is already started, don't show the coin flip modal
    }
    else{
        $('#coin-flip-modal').modal('show');
    }
    var home = $("#home-name").val();
    var away = $("#away-name").val();
    var homeColor = $("#home-color-input").val();
    var awayColor = $("#away-color-input").val();

    var gameLength = $("#quarter-length-select").val();
    var audible = document.getElementById("audible-checkbox").checked;
    var customPlays = document.getElementById("custom-plays-checkbox").checked;

    localStorage.setItem("home", home);
    localStorage.setItem("away", away);
    localStorage.setItem("homeColor", homeColor);
    localStorage.setItem("awayColor", awayColor);

    localStorage.setItem("gameLength", gameLength);
    localStorage.setItem("audible", audible);
    localStorage.setItem("customPlays", customPlays);
    //TODO might possibly need to reload settings here
});

function loadSettings() {
    $("#home-name").val(localStorage.getItem("home"));
    $("#away-name").val(localStorage.getItem("away"));
    $("#home-color-name").val(localStorage.getItem("home"));
    $("#away-color-name").val(localStorage.getItem("away"));
    if(localStorage.getItem("homeColor")){
        $("#home-color-input").val(localStorage.getItem("homeColor"));
    }
    if(localStorage.getItem("homeColor")){
        $("#away-color-input").val(localStorage.getItem("awayColor"));
    }
    $("#audible-checkbox").prop('checked', localStorage.getItem("audible"));
    $("#custom-plays-checkbox").prop('checked', localStorage.getItem("customPlays"));

    $("#setup-game").css("display", localStorage.getItem("setupGame"));
    $("#next-play").css("display", localStorage.getItem("nextPlay"));
    setFieldPlayers();
    setScoreboard();
}
loadSettings();

//coin flip
var coinFlipCount = 0;
var winner = "";
var loser = "";
$("#coin-flip-button").click(function() {
  if(coinFlipCount == 0){
    var x = Math.floor((Math.random() * 100) + 1);
    if(x > 50){
        winner = localStorage.getItem("home");
        loser = localStorage.getItem("away");
        document.getElementById("coin-text").innerHTML = winner;
    }
    else{
        winner = localStorage.getItem("away");
        loser = localStorage.getItem("home");
        document.getElementById("coin-text").innerHTML = winner;
    }
    $("#coin-text").css("color","#ffd400");
    $("#coin-text").css("font-size","3em");
    coinFlipCount++;
    document.getElementById("team-recieve-kick").innerHTML = winner;
    document.getElementById("team-left-right").innerHTML = loser;
    $("#secondary-coin-settings").fadeIn("slow");
  }
});

//after flip choices
$("#kick-choice").click(function() {
  localStorage.setItem("receiveFirst", loser);
  localStorage.setItem("currentOffense", winner);  
});
$("#recieve-choice").click(function() {
  localStorage.setItem("receiveFirst", winner);
  localStorage.setItem("currentOffense", loser); 
});

$("#left-choice").click(function() {
    localStorage.setItem("leftDirection", loser);
    localStorage.setItem("playType", "kickOff");
    kickOffSetup();
});
$("#right-choice").click(function() {
    localStorage.setItem("leftDirection", winner);
    localStorage.setItem("playType", "kickOff");
    kickOffSetup();
});

$("#coin-flip-close").click(function() {
    localStorage.setItem("setupGame", "none");
    localStorage.setItem("nextPlay", "block");
    $("#setup-game").css("display", localStorage.getItem("setupGame"));
    $("#next-play").css("display", localStorage.getItem("nextPlay"));

    //create base localStorage
    localStorage.setItem("time", "15:00");
    localStorage.setItem("awaytol", "3");
    localStorage.setItem("hometol", "3");
    localStorage.setItem("qtr", "1");
    localStorage.setItem("down", "1");
    localStorage.setItem("togo", "10");
    localStorage.setItem("ballon", "30");
    localStorage.setItem("homeScore", "0");
    localStorage.setItem("awayScore", "0");
  setScoreboard();
});

/* Random Bead Handlers */
$("#random-bead").click(function() {
    callRandomBead();
});

$(".beadClick").click(function() {
    callRandomBead();
});

$(function() {
    $(document).keydown(function(evt) {
        if (evt.keyCode == 32) {
            callRandomBead();
        }
    });
});

function callRandomBead() {
    //random 1-100 bead number
    var bead = Math.floor((Math.random() * 100) + 1);
    //beadNumber is the outcome of
    var playType = localStorage.getItem("playType");
    var beadNumber = determinePlayOutcome(playType, bead);
    validateOutcome(beadNumber);
    setBeadPosition(bead);
}

$("#make-correction").click(function() {
    fillCorrectionModal();
});

$("#save-correction-close").click(function() {
    saveCorrectionModal();
});

function fillCorrectionModal(){
    $("#correction-currentOffense").val(localStorage.getItem("currentOffense"));
    $("#correction-homeScore").val(localStorage.getItem("homeScore"));
    $("#correction-awayScore").val(localStorage.getItem("awayScore"));
    $("#correction-time").val(localStorage.getItem("time"));
    $("#correction-hometol").val(localStorage.getItem("hometol"));
    $("#correction-awaytol").val(localStorage.getItem("awaytol"));
    $("#correction-qtr").val(localStorage.getItem("qtr"));
    $("#correction-down").val(localStorage.getItem("down"));
    $("#correction-togo").val(localStorage.getItem("togo"));
    $("#correction-ballon").val(localStorage.getItem("ballon"));
}

function saveCorrectionModal(){
    localStorage.setItem("currentOffense", $("#correction-currentOffense").val());
    localStorage.setItem("time", $("#correction-time").val());
    localStorage.setItem("awaytol", $("#correction-awaytol").val());
    localStorage.setItem("hometol", $("#correction-hometol").val());
    localStorage.setItem("qtr", $("#correction-qtr").val());
    localStorage.setItem("down", $("#correction-down").val());
    localStorage.setItem("togo", $("#correction-togo").val());
    localStorage.setItem("ballon", $("#correction-ballon").val());
    localStorage.setItem("homeScore", $("#correction-homeScore").val());
    localStorage.setItem("awayScore", $("#correction-awayScore").val());
    loadSettings();
}



/*
*
* Remove this once the game is finished
*
* */
$("#example-setup").click(function() {
    localStorage.clear();
    localStorage.setItem("setupGame", "none");
    localStorage.setItem("nextPlay", "block");
    $("#setup-game").css("display", localStorage.getItem("setupGame"));
    $("#next-play").css("display", localStorage.getItem("nextPlay"));

    //create base localStorage
    localStorage.setItem("home", "HomeRed");
    localStorage.setItem("away", "AwayBlue");
    localStorage.setItem("homeColor", "Red");
    localStorage.setItem("awayColor", "Blue");


    localStorage.setItem("receiveFirst", "HomeRed");
    localStorage.setItem("currentOffense", "AwayBlue");
    localStorage.setItem("leftDirection", "HomeRed");

    localStorage.setItem("time", "15:00");
    localStorage.setItem("awaytol", "3");
    localStorage.setItem("hometol", "3");
    localStorage.setItem("qtr", "1");
    localStorage.setItem("down", "1");
    localStorage.setItem("togo", "10");
    localStorage.setItem("ballon", "30");
    localStorage.setItem("homeScore", "0");
    localStorage.setItem("awayScore", "0");
    setScoreboard();
    setTouchDowns();
    localStorage.setItem("playType", "kickOff");
    kickOffSetup();
});

var wordsie = "asdfghjkl";