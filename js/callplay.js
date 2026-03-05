$(document).on("mouseover", ".offense-choice", function() {
    var hoveredItem = $(this).attr("id");
    $(this).css("font-weight", "500");
    var result = returnPlayId(offense, hoveredItem);
    if(!result) return;
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;
    document.getElementById("preview-offense-play").innerHTML = plays;
    $("#show-offense-play").addClass("none");
});
$(document).on("mouseout", ".offense-choice", function() {
    $(this).css("font-weight", "normal");
    document.getElementById("preview-offense-play").innerHTML = "";
    $("#show-offense-play").removeClass("none");
});

$(document).on("mouseover", ".defense-choice", function() {
    var hoveredItem = $(this).attr("id");
    $(this).css("font-weight", "500");
    var result = returnPlayId(defense, hoveredItem);
    if(!result) return;
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;
    document.getElementById("preview-defense-play").innerHTML = plays;
    $("#show-defense-play").addClass("none");
});
$(document).on("mouseout", ".defense-choice", function() {
    $(this).css("font-weight", "normal");
    document.getElementById("preview-defense-play").innerHTML = "";
    $("#show-defense-play").removeClass("none");
});

$(document).on("click", ".offense-choice", function() {
    var clickedItem = $(this).attr("id");
    var result = returnPlayId(offense, clickedItem);
    if(!result) return;
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;

    document.getElementById("offense-called").innerHTML = result.name;
    document.getElementById("show-offense-play").innerHTML = plays;
    document.getElementById("outcome-display").innerHTML = "—";
    $("#offense-continue").removeClass("disabled");
    localStorage.setItem("offensePlay", result.id);
    var defTeam = localStorage.getItem("currentOffense") == localStorage.getItem("home")
        ? localStorage.getItem("away")
        : localStorage.getItem("home");
    setNextStep(defTeam + " — call your defense");
});

$(document).on("click", ".defense-choice", function() {
    var clickedItem = $(this).attr("id");
    var result = returnPlayId(defense, clickedItem);
    if(!result) return;
    var plays = result.name + "<br>" + result.type + "<br>" + result.desc;

    document.getElementById("defense-called").innerHTML = result.name;
    document.getElementById("show-defense-play").innerHTML = plays;
    $("#defense-continue").removeClass("disabled");
    $("#offense-called").removeClass("none");
    $("#defense-called").removeClass("none");
    localStorage.setItem("defensePlay", result.id);
    document.getElementById("next-play").innerHTML = "Next Play";
    localStorage.setItem("playType", "regular");
    setNextStep("Both plays called — roll the bead");
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
        handleKickAttempt(playType, bead);
        return null; // handled internally
    }
    else if(playType == "kickOff"){
        handleKickoff(bead);
        return null;
    }
    else if(playType == "punt"){
        handlePunt(bead);
        return null;
    }
    else if(playType == "penalty"){
        return null;
    }
    else {
        console.log("unknown playType: " + playType);
        return null;
    }
}

/*
 * Field goal and extra point attempts.
 * FG distance = yards from current LOS to opponent's end zone.
 * Add 17 yards for snap + hold distance to goal line.
 */
function handleKickAttempt(playType, bead) {
    var fieldPositions = localStorage.getItem("fieldPositions").split(",");
    var los = parseInt(fieldPositions[0]);
    var currentOffense = localStorage.getItem("currentOffense");
    var leftTeam = document.getElementById("left-position-name").innerHTML;

    var yardsToEndzone = (currentOffense == leftTeam) ? (100 - los) : los;
    var distance = yardsToEndzone + 17;

    var makeThreshold;
    if(playType == "extraPoint"){
        makeThreshold = 95; // PAT is nearly automatic
    } else if(distance <= 30){
        makeThreshold = 90;
    } else if(distance <= 40){
        makeThreshold = 75;
    } else if(distance <= 50){
        makeThreshold = 55;
    } else if(distance <= 55){
        makeThreshold = 35;
    } else {
        makeThreshold = 15;
    }

    var made = bead <= makeThreshold;
    var msg = "";

    if(made){
        var pts = (playType == "extraPoint") ? 1 : 3;
        addPoints(currentOffense, pts);
        msg = (playType == "extraPoint")
            ? "Extra point is GOOD! +" + pts
            : distance + "-yard field goal is GOOD! +3";
        // After a made FG or PAT, set up kickoff
        localStorage.setItem("playType", "kickOff");
        localStorage.setItem("currentOffense",
            (currentOffense == leftTeam)
                ? document.getElementById("right-position-name").innerHTML
                : leftTeam);
        var kickLOS = (currentOffense == leftTeam) ? 30 : 70;
        localStorage.setItem("fieldPositions", kickLOS + "," + kickLOS + ",K");
        kickOffSetup();
    } else {
        msg = (playType == "extraPoint")
            ? "Extra point NO GOOD."
            : distance + "-yard field goal NO GOOD — turnover on downs.";
        // Missed FG: other team gets ball at LOS (or their own 20, whichever is farther back)
        if(playType != "extraPoint"){
            var newLos = los;
            turnOver();
            var newFirstDown = 0;
            var newOffense = localStorage.getItem("currentOffense");
            var newLeftTeam = document.getElementById("left-position-name").innerHTML;
            if(newOffense == newLeftTeam){
                newFirstDown = newLos + 10;
                if(newFirstDown > 100) newFirstDown = 100;
            } else {
                newFirstDown = newLos - 10;
                if(newFirstDown < 0) newFirstDown = 0;
            }
            localStorage.setItem("down", "1");
            localStorage.setItem("togo", "10");
            localStorage.setItem("fieldPositions", newLos + "," + newFirstDown + ",C");
            localStorage.setItem("ballon", newLos);
            setAllPositions(newLos, newFirstDown, "C");
        }
    }

    document.getElementById("outcome-display").innerHTML = msg;
    deductPlayTime(false);
    if(made){
        setNextStep(localStorage.getItem("currentOffense") + " — roll the bead (kickoff)");
    } else {
        setNextStep(localStorage.getItem("currentOffense") + " — call your offense");
    }
}

/*
 * Kickoff result.
 * bead 1–15: touchback (ball to 25)
 * bead 16–50: return to 15–25 yard line
 * bead 51–85: return to 25–35 yard line
 * bead 86–100: big return to 35–45
 */
function handleKickoff(bead) {
    var fieldPositions = localStorage.getItem("fieldPositions").split(",");
    var kickerLOS = parseInt(fieldPositions[0]); // 30 or 70

    var receivingTeam = localStorage.getItem("receiveFirst");
    // Determine if receiver drives left or right
    var leftTeam = document.getElementById("left-position-name").innerHTML;
    var receiverDrivesRight = (receivingTeam == leftTeam);

    var returnYard;
    var msg;
    if(bead <= 15){
        // Touchback
        returnYard = receiverDrivesRight ? 25 : 75;
        msg = "Touchback — ball at the 25.";
    } else if(bead <= 50){
        var offset = Math.floor(Math.random() * 11); // 0–10
        returnYard = receiverDrivesRight ? (15 + offset) : (85 - offset);
        msg = "Returned to the " + (receiverDrivesRight ? returnYard : 100 - returnYard) + " yard line.";
    } else if(bead <= 85){
        var offset = Math.floor(Math.random() * 11); // 0–10
        returnYard = receiverDrivesRight ? (25 + offset) : (75 - offset);
        msg = "Returned to the " + (receiverDrivesRight ? returnYard : 100 - returnYard) + " yard line.";
    } else {
        var offset = Math.floor(Math.random() * 11); // 0–10
        returnYard = receiverDrivesRight ? (35 + offset) : (65 - offset);
        msg = "Big return! Ball at the " + (receiverDrivesRight ? returnYard : 100 - returnYard) + " yard line.";
    }

    var firstDown = receiverDrivesRight ? (returnYard + 10) : (returnYard - 10);
    if(firstDown > 100) firstDown = 100;
    if(firstDown < 0) firstDown = 0;

    localStorage.setItem("currentOffense", receivingTeam);
    localStorage.setItem("playType", "regular");
    localStorage.setItem("down", "1");
    localStorage.setItem("togo", "10");
    localStorage.setItem("fieldPositions", returnYard + "," + firstDown + ",C");
    localStorage.setItem("ballon", returnYard);
    setAllPositions(returnYard, firstDown, "C");
    setBallHolder();
    document.getElementById("outcome-display").innerHTML = msg;
    deductPlayTime(false);
    setNextStep(receivingTeam + " — call your offense");
}

/*
 * Punt result.
 * bead 1–10: short punt (25–30 yards net)
 * bead 11–70: average punt (35–45 yards net)
 * bead 71–90: good punt (45–55 yards net)
 * bead 91–100: excellent (55–60 yards net, possibly downed inside 10)
 */
function handlePunt(bead) {
    var fieldPositions = localStorage.getItem("fieldPositions").split(",");
    var los = parseInt(fieldPositions[0]);
    var currentOffense = localStorage.getItem("currentOffense");
    var leftTeam = document.getElementById("left-position-name").innerHTML;
    var puntingRight = (currentOffense == leftTeam);

    var netYards;
    var msg;
    if(bead <= 10){
        netYards = Math.floor(Math.random() * 6) + 25; // 25–30
        msg = "Short punt — " + netYards + " yards.";
    } else if(bead <= 70){
        netYards = Math.floor(Math.random() * 11) + 35; // 35–45
        msg = "Punt — " + netYards + " yards.";
    } else if(bead <= 90){
        netYards = Math.floor(Math.random() * 11) + 45; // 45–55
        msg = "Good punt — " + netYards + " yards.";
    } else {
        netYards = Math.floor(Math.random() * 6) + 55; // 55–60
        msg = "Booming punt — " + netYards + " yards!";
    }

    var newLOS = puntingRight ? (los + netYards) : (los - netYards);

    // Touchback if punt lands in or through the end zone
    if(newLOS >= 100){
        newLOS = puntingRight ? 75 : 25; // touchback, ball at 25 for receiving team
        msg += " Touchback — ball at the 25.";
    } else if(newLOS <= 0){
        newLOS = puntingRight ? 25 : 75;
        msg += " Touchback — ball at the 25.";
    }

    // Clamp inside the 10 ("downed" scenario)
    if(puntingRight && newLOS > 90){
        msg += " Downed inside the 10!";
    } else if(!puntingRight && newLOS < 10){
        msg += " Downed inside the 10!";
    }

    // Receiving team gets the ball and drives the opposite direction
    var newFirstDown = puntingRight ? (newLOS - 10) : (newLOS + 10);
    if(newFirstDown > 100) newFirstDown = 100;
    if(newFirstDown < 0) newFirstDown = 0;

    turnOver();
    localStorage.setItem("playType", "regular");
    localStorage.setItem("down", "1");
    localStorage.setItem("togo", "10");
    localStorage.setItem("fieldPositions", newLOS + "," + newFirstDown + ",C");
    localStorage.setItem("ballon", newLOS);
    setAllPositions(newLOS, newFirstDown, "C");
    setBallHolder();
    document.getElementById("outcome-display").innerHTML = msg;
    deductPlayTime(false);
    setNextStep(localStorage.getItem("currentOffense") + " — call your offense");
}

function displayOutcome(outcome) {
    var fieldPositions = (localStorage.getItem("fieldPositions")).split(",");
    var hashPosition = fieldPositions[2];
    var hashPlay = "";
    var outcomes = ((outcome.split(":"))[1]).split(",");
    if(hashPosition == "C"){
        hashPlay = outcomes[0];
    }
    else if (hashPosition == "L"){
        hashPlay = outcomes[1];
    }
    else{
        hashPlay = outcomes[2];
    }
    var newHash = hashPlay.slice(0, 1);
    var yards = hashPlay.slice(1);

    // Build a clean result message
    var rawYards = yards.replace(/[fi]/g, "");
    var isFumble = yards.includes("f");
    var isInt = yards.includes("i");
    var yardNum = parseInt(rawYards);
    var resultMsg = "";

    if(isInt){
        resultMsg = "⚡ INTERCEPTION";
        if(yardNum !== 0) resultMsg += " — returned " + Math.abs(yardNum) + " yds";
    } else if(isFumble){
        resultMsg = "💥 FUMBLE";
        if(yardNum > 0) resultMsg += " — gained " + yardNum + " yds first";
        else if(yardNum < 0) resultMsg += " — lost " + Math.abs(yardNum) + " yds";
    } else if(yardNum > 0){
        resultMsg = "+" + yardNum + " yards";
    } else if(yardNum === 0){
        resultMsg = "No gain";
    } else {
        resultMsg = yardNum + " yards (loss)";
    }

    fieldOutcome(yards, newHash);
    document.getElementById("outcome-display").innerHTML = resultMsg;
    setNextStep(localStorage.getItem("currentOffense") + " — call your offense");
}
