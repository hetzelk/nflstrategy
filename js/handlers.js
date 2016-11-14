$("#clear-all").click(function() {
  localStorage.clear();
  location.reload();
});

$("#team-x-name").bind('keyup', function(e) {
    var value = $("#team-x-name").val();
    document.getElementById("team-1-name").innerHTML = value;
});

$("#team-y-name").bind('keyup', function(e) {
    var value = $("#team-y-name").val();
    document.getElementById("team-2-name").innerHTML = value;
});

$("#save-settings").click(function() {
  var team1name = $("#team-x-name").val();
  var team2name = $("#team-y-name").val();
  var team1color = $("#team-x-color").val();
  var team2color = $("#team-y-color").val();

  var gameLength = $("#quarter-length-select").val();
  var audible = document.getElementById("audible-checkbox").checked;
  var customPlays = document.getElementById("custom-plays-checkbox").checked;

  localStorage.setItem("team1name", team1name);
  localStorage.setItem("team2name", team2name);
  localStorage.setItem("team1color", team1color);
  localStorage.setItem("team2color", team2color);
  
  localStorage.setItem("gameLength", gameLength);
  localStorage.setItem("audible", audible);
  localStorage.setItem("customPlays", customPlays);
});

function loadSettings() {
    $("#team-x-name").val(localStorage.getItem("team1name"));
    $("#team-y-name").val(localStorage.getItem("team2name"));
    $("#team-x-color").val(localStorage.getItem("team1color"));
    $("#team-y-color").val(localStorage.getItem("team2color"));
    $("#audible-checkbox").prop('checked', localStorage.getItem("audible"));
    $("#custom-plays-checkbox").prop('checked', localStorage.getItem("customPlays"));

    $("#setup-game").css("display", localStorage.getItem("setupGame"));
    $("#next-play").css("display", localStorage.getItem("nextPlay"));
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
        winner = localStorage.getItem("team1name");
        loser = localStorage.getItem("team2name");
        document.getElementById("coin-text").innerHTML = winner;
    }
    else{
        winner = localStorage.getItem("team2name");
        loser = localStorage.getItem("team1name");
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
});
$("#recieve-choice").click(function() {
  localStorage.setItem("receiveFirst", winner);
});

$("#left-choice").click(function() {
  localStorage.setItem("leftDirection", winner);
  setTouchDowns()
});
$("#right-choice").click(function() {
  localStorage.setItem("leftDirection", loser);
  setTouchDowns()
});

$("#coin-flip-close").click(function() {
  localStorage.setItem("setupGame", "none");
  localStorage.setItem("nextPlay", "block");
  $("#setup-game").css("display", localStorage.getItem("setupGame"));
  $("#next-play").css("display", localStorage.getItem("nextPlay"));

  //create base localStorage
  localStorage.setItem("fieldPositions", "30,40,C");  
  localStorage.setItem("scoreBoard", "");  
  localStorage.setItem("time", "15:00");
  localStorage.setItem("t1tol", "3");
  localStorage.setItem("t2tol", "3");
  localStorage.setItem("qtr", "1");
  localStorage.setItem("down", "1");
  localStorage.setItem("togo", "10");
  localStorage.setItem("ballon", "30");
});

function setTouchDowns() {
  if(localStorage.getItem("setupGame") !== "none"){
    return;
  }
  var team1 = localStorage.getItem("team1name");
  var team2 = localStorage.getItem("team2name");
  var left = localStorage.getItem("leftDirection");
  var right = (left == team1) ? team2 : team1;

  document.getElementById("left-team-name").innerHTML = left;
  document.getElementById("right-team-name").innerHTML = right;

  document.getElementById("left-position-name").innerHTML = left;
  document.getElementById("right-position-name").innerHTML = right;

  var currentOffense = localStorage.getItem("currentOffense");

  if(currentOffense == team1){
    document.getElementById("left-ball").innerHTML = "";
    document.getElementById("right-ball").innerHTML = "o";
  }
  else{
    document.getElementById("left-ball").innerHTML = "o";
    document.getElementById("right-ball").innerHTML = ""; 
  }
};

function setScoreboard(){  
  if(localStorage.getItem("setupGame") !== "none"){
    return;
  }
  document.getElementById("scoreboard-away").innerHTML = localStorage.getItem("team2name");
  document.getElementById("scoreboard-home").innerHTML = localStorage.getItem("team1name");
  document.getElementById("scoreboard-time-value").innerHTML = localStorage.getItem("time");

  document.getElementById("scoreboard-t1-tol-value").innerHTML = localStorage.getItem("t1tol");
  document.getElementById("scoreboard-t2-tol-value").innerHTML = localStorage.getItem("t2tol");
  document.getElementById("scoreboard-qtr-value").innerHTML = localStorage.getItem("qtr");
  document.getElementById("scoreboard-down-value").innerHTML = localStorage.getItem("down");
  document.getElementById("scoreboard-togo-value").innerHTML = localStorage.getItem("togo");
  document.getElementById("scoreboard-ballon-value").innerHTML = localStorage.getItem("ballon");

  var poss = "away";
  if(poss == "away"){
    document.getElementById("scoreboard-away-ball").innerHTML = "F";
    document.getElementById("scoreboard-home-ball").innerHTML = "";
  }
  else{
    document.getElementById("scoreboard-home-ball").innerHTML = "F";
    document.getElementById("scoreboard-away-ball").innerHTML = "";
  }
}