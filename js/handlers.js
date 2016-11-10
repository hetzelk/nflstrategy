//add a clear all settings/history option to the Help page

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

  var audible = document.getElementById("audible-checkbox").checked;
  var customPlays = document.getElementById("custom-plays-checkbox").checked;

  localStorage.setItem("team1name", team1name);
  localStorage.setItem("team2name", team2name);
  localStorage.setItem("team1color", team1color);
  localStorage.setItem("team2color", team2color);
  
  localStorage.setItem("audible", audible);
  localStorage.setItem("customPlays", customPlays);

  //getter localStorage.getItem("lastname");
});

function loadSettings() {
    $("#team-x-name").val(localStorage.getItem("team1name"));
    $("#team-y-name").val(localStorage.getItem("team2name"));
    $("#team-x-color").val(localStorage.getItem("team1color"));
    $("#team-y-color").val(localStorage.getItem("team2color"));
    $("#audible-checkbox").prop('checked', localStorage.getItem("audible"));
    $("#custom-plays-checkbox").prop('checked', localStorage.getItem("customPlays"));
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
  document.getElementById("left-team-name").innerHTML = winner;
  document.getElementById("right-team-name").innerHTML = loser;
});
$("#right-choice").click(function() {
  localStorage.setItem("leftDirection", loser);
  document.getElementById("left-team-name").innerHTML = loser;
  document.getElementById("right-team-name").innerHTML = winner;
});

$("#coin-flip-close").click(function() {
  localStorage.setItem("setupGame", "none");
  localStorage.setItem("nextPlay", "block");
  $("#setup-game").css("display", localStorage.getItem("setupGame"));
  $("#next-play").css("display", localStorage.getItem("nextPlay"));
});