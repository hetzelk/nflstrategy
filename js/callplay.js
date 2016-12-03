$(".offense-choice").hover(function() {
    var hoveredItem = $(event.target).attr("id");
    $(this).css("font-weight", "500");
    var result = returnPlayId(offense, hoveredItem);
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;
    document.getElementById("preview-offense-play").innerHTML = plays;
    $("#show-offense-play").addClass("none");
    }, 
    function(){
    $(this).css("font-weight", "normal");
    document.getElementById("preview-offense-play").innerHTML = "";
    $("#show-offense-play").removeClass("none");
  }
);

$(".defense-choice").hover(function() {
    var hoveredItem = $(event.target).attr("id");
    $(this).css("font-weight", "500");
    var result = returnPlayId(defense, hoveredItem);
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;
    document.getElementById("preview-defense-play").innerHTML = plays;
    $("#show-defense-play").addClass("none");
    }, 
    function(){
    $(this).css("font-weight", "normal");
    document.getElementById("preview-defense-play").innerHTML = "";
    $("#show-defense-play").removeClass("none");
  }
);

$(".offense-choice").click(function() {
    var clickedItem = $(event.target).attr("id");
    var result = returnPlayId(offense, clickedItem);
    var plays =  result.name + "<br>" + result.type + "<br>" + result.desc;

    document.getElementById("offense-called").innerHTML = result.name;
    document.getElementById("show-offense-play").innerHTML = plays;
    $("#offense-continue").removeClass("disabled");
    localStorage.setItem("offensePlay", result.id);
});

$(".defense-choice").click(function() {
    var clickedItem = $(event.target).attr("id");
    var result = returnPlayId(defense, clickedItem);
    var plays =  result.name + "<br>" + result.type + "<br>" + result.desc;

    document.getElementById("defense-called").innerHTML = result.name;
    document.getElementById("show-defense-play").innerHTML = plays;
    $("#defense-continue").removeClass("disabled");
    $("#offense-called").removeClass("none");
    $("#defense-called").removeClass("none");
    localStorage.setItem("defensePlay", result.id);
    document.getElementById("next-play").innerHTML = "Next Play";
    localStorage.setItem("playType", "regular");
});

$("#next-play").click(function() {
    /*
    var playType = localStorage.getItem("playType");
    if(playType == "regular"){
        $('#offense-modal').modal('show');
    }
    else if(playType == undefined){
        /*this is the default
         * setup game modal*
        $('#settings-modal').modal('show');
    }
    else if(playType == "kickOff"){
     /*this is for when it's a kickoff*
        $('#offense-modal').modal('show');
    }
    else{
        /*this is for when a user clicks out of the modal before the play is called.
         * then the wrong play wont be selected*
        $('#points-modal').modal('show');
    }*/

    /*if next play is kickoff, display kickoff
    * or display point modal if accidentally clicked away
    * or display other possibilities*/
    $("#offense-called").addClass("none");
    $("#defense-called").addClass("none");
});

function returnPlayId(side, clickedItem) {
    var result = $.grep(side, function(e){ return e.id == clickedItem; });
    return result[0];
}

function validateOutcome(bead) {
    var offensePlay = localStorage.getItem("offensePlay");
    offensePlay = returnPlayId(offense, offensePlay);
    var defensePlay = localStorage.getItem("defensePlay");
    defensePlay = returnPlayId(defense, defensePlay);

    document.getElementById("offense-called").innerHTML = offensePlay.name;
    document.getElementById("defense-called").innerHTML = defensePlay.name;

    var defenseZones = (defensePlay.zones).split(",");
    var offensePlays = offensePlay.plays;
    var offenseAvailable = [];
    for (var i = 0; i < defenseZones.length; i++) {
        var playName = "play" + defenseZones[i];
        offenseAvailable.push(playName + ":"  + offensePlays[playName]);
    };

    displayOutcome(offenseAvailable[bead]);
}

function determinePlayOutcome(playType, bead) {
    // playType: kickoff, regular, penalty, fieldGoal, twoPointConversion..?
    // 1-40, 41-45, 46-70, 71-80, 81-100
    //RETURN: the number that is returned here goes to validateOutcome(bead);

    if(playType == "regular" || playType == "twoPointConversion"){
        if(bead <= 40){
            return 4;
        }
        else if (bead <= 45){
            return 3;
        }
        else if (bead <= 70){
            return 2;
        }
        else if (bead <= 80){
            return 1;
        }
        else{
            return 0;
        }
    }
    else if(playType == "fieldGoal" || playType == "extraPoint"){

    }
    else if(playType == "kickOff" || playType == "punt"){

    }
    else if(playType == "penalty"){

    }
    else /*kickoff*/{
        console.log("should never get here");
    }
}

function displayOutcome(outcome) {
    document.getElementById("outcome-display").innerHTML = "Remember to adjust for the yards if a touchdown is scored " + outcome;
    var fieldPositions = (localStorage.getItem("fieldPositions")).split(",");
    var hashPosition = fieldPositions[2];
    var hashPlay = "";
    var outcomes = ((outcome.split(":"))[1]).split(",");
    if(hashPosition == "L"){
        hashPlay = outcomes[0];
    }
    else if (hashPosition == "C"){
        hashPlay = outcomes[1];
    }
    else{
        hashPlay = outcomes[2];
    }
    hashPosition = hashPlay.slice(0, 1);
    var yards = hashPlay.slice(1);

    fieldOutcome(yards, hashPosition);
}
