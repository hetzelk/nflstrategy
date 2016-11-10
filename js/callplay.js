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

    document.getElementById("offense-select").innerHTML = result.name;
    document.getElementById("offense-called").innerHTML = result.name;
    document.getElementById("show-offense-play").innerHTML = plays;
    $("#offense-continue").removeClass("disabled");
    localStorage.setItem("offensePlay", result.id);
});

$(".defense-choice").click(function() {
    var clickedItem = $(event.target).attr("id");
    var result = returnPlayId(defense, clickedItem);
    var plays =  result.name + "<br>" + result.type + "<br>" + result.desc;

    document.getElementById("defense-select").innerHTML = result.name;
    document.getElementById("defense-called").innerHTML = result.name;
    document.getElementById("show-defense-play").innerHTML = plays;
    $("#defense-continue").removeClass("disabled");
    $("#offense-called").removeClass("none");
    $("#defense-called").removeClass("none");
    playCount++;
    document.getElementById("playCount").innerHTML = playCount;
    localStorage.setItem("defensePlay", result.id);
});

$("#next-play").click(function() {
    document.getElementById("next-play").innerHTML = "Next Play";
    document.getElementById("offense-select").innerHTML = "Offense";
    document.getElementById("defense-select").innerHTML = "Defense";
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

function randomBead (playType) {
    // playType: kickoff, regular, penalty, other..?
    // 1-40, 41-45, 46-70, 71-80, 81-100
    var bead = Math.floor((Math.random() * 100) + 1);

    if(playType == "regular"){
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

}

function displayOutcome (outcome) {
    document.getElementById("outcome-display").innerHTML = outcome;
    var hashPosition = "L";
    var hashPlay = "";
    var outcomes = ((outcome.split(":"))[1]).split(",");
    var quote = "";
    if(hashPosition == "L"){
        hashPlay = outcomes[0];
    }
    else if (hashPosition == "C"){
        hashPlay = outcomes[1];
    }
    else{
        hashPlay = outcomes[2];
    }

    var yards = hashPlay.slice(1);

    if(yards.includes("f")){
        var yards = yards.slice(0, yards.length - 1);
        quote += " after " + yards + " yards team 1 fumbled to team 2!";
    }
    else if(yards.includes("i")){
        var yards = yards.slice(0, yards.length - 1);
        quote += " a " + yards + " yard pass, and it's intercepted!";
    }
    else{
        if(yards.includes("-")){
        quote += " for a loss of " + yards + " yards";
        }
        else{
            quote += " for a gain of " + yards + " yards";
        }
    }
    

    document.getElementById("outcome-display").innerHTML = quote;
}

$("#random-bead").click(function() {
    var beadNumber = randomBead("regular");
    validateOutcome(beadNumber);
});