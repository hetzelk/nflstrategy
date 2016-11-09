
var allPlays = "";
var currentPlay = "";
var playCounter = 1;
var playRow = 1;

//$("#offense-row-select").val();

$(".first-hash-buttons").click(function() {
  currentPlay += "play" + playRow + "" + playCounter + ":";

  if(playCounter == 7){
    allPlays += "\n" + currentPlay;
    currentPlay = "";
    playRow++;
    playCounter = 1;
  }
  else{
    playCounter++;
  }

  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
});

$("#left-hash1").click(function() {
  currentPlay += "\"L";
  $("#yardage1").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash1").prop('disabled', true);
  $("#center-hash1").prop('disabled', true);
  $("#right-hash1").prop('disabled', true);
});

$("#center-hash1").click(function() {
  currentPlay += "\"C";
  $("#yardage1").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash1").prop('disabled', true);
  $("#center-hash1").prop('disabled', true);
  $("#right-hash1").prop('disabled', true);
});

$("#right-hash1").click(function() {
  currentPlay += "\"R";
  $("#yardage1").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash1").prop('disabled', true);
  $("#center-hash1").prop('disabled', true);
  $("#right-hash1").prop('disabled', true);
});

$("#nuetral-btn1").click(function() {
  var yardage = $("#yardage1").val();
  currentPlay += yardage + ",";
  $("#yardage1").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn1").prop('disabled', true);
  $("#fumble-btn1").prop('disabled', true);
  $("#interception-btn1").prop('disabled', true);
});

$("#fumble-btn1").click(function() {
  var yardage = $("#yardage1").val();
  currentPlay += yardage + "f,";
  $("#yardage1").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn1").prop('disabled', true);
  $("#fumble-btn1").prop('disabled', true);
  $("#interception-btn1").prop('disabled', true);
});

$("#interception-btn1").click(function() {
  var yardage = $("#yardage1").val();
  currentPlay += yardage + "i,";
  $("#yardage1").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn1").prop('disabled', true);
  $("#fumble-btn1").prop('disabled', true);
  $("#interception-btn1").prop('disabled', true);
});

//2

$("#left-hash2").click(function() {
  currentPlay += "L";
  $("#yardage2").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash2").prop('disabled', true);
  $("#center-hash2").prop('disabled', true);
  $("#right-hash2").prop('disabled', true);
});

$("#center-hash2").click(function() {
  currentPlay += "C";
  $("#yardage2").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash2").prop('disabled', true);
  $("#center-hash2").prop('disabled', true);
  $("#right-hash2").prop('disabled', true);
});

$("#right-hash2").click(function() {
  currentPlay += "R";
  $("#yardage2").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash2").prop('disabled', true);
  $("#center-hash2").prop('disabled', true);
  $("#right-hash2").prop('disabled', true);
});

$("#nuetral-btn2").click(function() {
  var yardage = $("#yardage2").val();
  currentPlay += yardage + ",";
  $("#yardage2").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn2").prop('disabled', true);
  $("#fumble-btn2").prop('disabled', true);
  $("#interception-btn2").prop('disabled', true);
});

$("#fumble-btn2").click(function() {
  var yardage = $("#yardage2").val();
  currentPlay += yardage + "f,";
  $("#yardage2").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn2").prop('disabled', true);
  $("#fumble-btn2").prop('disabled', true);
  $("#interception-btn2").prop('disabled', true);
});

$("#interception-btn2").click(function() {
  var yardage = $("#yardage2").val();
  currentPlay += yardage + "i,";
  $("#yardage2").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#nuetral-btn2").prop('disabled', true);
  $("#fumble-btn2").prop('disabled', true);
  $("#interception-btn2").prop('disabled', true);
});

//3

$("#left-hash3").click(function() {
  currentPlay += "L";
  $("#yardage3").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash3").prop('disabled', true);
  $("#center-hash3").prop('disabled', true);
  $("#right-hash3").prop('disabled', true);
});

$("#center-hash3").click(function() {
  currentPlay += "C";
  $("#yardage3").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash3").prop('disabled', true);
  $("#center-hash3").prop('disabled', true);
  $("#right-hash3").prop('disabled', true);
});

$("#right-hash3").click(function() {
  currentPlay += "R";
  $("#yardage3").focus();
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  $("#left-hash3").prop('disabled', true);
  $("#center-hash3").prop('disabled', true);
  $("#right-hash3").prop('disabled', true);
});

$("#nuetral-btn3").click(function() {
  var yardage = $("#yardage3").val();
  currentPlay += yardage + "\", ";
  $("#yardage3").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  enableAll();
});

$("#fumble-btn3").click(function() {
  var yardage = $("#yardage3").val();
  currentPlay += yardage + "f\", ";
  $("#yardage3").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  enableAll();
});

$("#interception-btn3").click(function() {
  var yardage = $("#yardage3").val();
  currentPlay += yardage + "i\", ";
  $("#yardage3").val("");
  document.getElementById("display-current-text").innerHTML = currentPlay;
  document.getElementById("display-offense-text").innerHTML = allPlays;
  enableAll();
});

$("#next-group").click(function() {

});

/*
//calculator style buttons
$("#btn-1").click(function() {
  var number = $("#input-box").val();
  var newNumber = number + "" + 1;
  $("#input-box").val(newNumber);
});
*/

function enableAll (argument) {
  $("#left-hash1").prop('disabled', false);
  $("#center-hash1").prop('disabled', false);
  $("#right-hash1").prop('disabled', false);
  $("#left-hash2").prop('disabled', false);
  $("#center-hash2").prop('disabled', false);
  $("#right-hash2").prop('disabled', false);
  $("#left-hash3").prop('disabled', false);
  $("#center-hash3").prop('disabled', false);
  $("#right-hash3").prop('disabled', false);

  $("#nuetral-btn1").prop('disabled', false);
  $("#fumble-btn1").prop('disabled', false);
  $("#interception-btn1").prop('disabled', false);
  $("#nuetral-btn2").prop('disabled', false);
  $("#fumble-btn2").prop('disabled', false);
  $("#interception-btn2").prop('disabled', false);
}