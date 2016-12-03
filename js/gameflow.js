function setAllIfPossible() {
    if(localStorage.getItem("setupGame") !== "none"){
        setAllPositions(50, 50, "C");
        return;
    }
    else{
        setTouchDowns(); 
        setupField(); 
        setScoreboard();
        document.getElementById("next-play").innerHTML = "Next Play";
    }
}
setAllIfPossible();

function setupField() {
    //get current field positions from localStorage
    var fieldPositions = localStorage.getItem("fieldPositions");
    fieldPositions = fieldPositions.split(",");
    var offensePos = fieldPositions[0];
    var firstDownPos = fieldPositions[1];
    var hashPos = fieldPositions[2];
    if(hashPos == "K"){
        localStorage.setItem("playType", "kickOff");
        kickOffSetup();
    }
    else{
        setAllPositions(parseInt(offensePos),parseInt(firstDownPos),hashPos);
    }
}

function setTouchDowns() {
  if(localStorage.getItem("setupGame") !== "none"){
    return;
  }
  var home = localStorage.getItem("home");
  var away = localStorage.getItem("away");

  document.getElementById("left-team-name").innerHTML = home;
  document.getElementById("right-team-name").innerHTML = away;

  setBallHolder();
};

function setBallHolder() {
    var currentOffense = localStorage.getItem("currentOffense");
    var defenseName = "";
    if(currentOffense == localStorage.getItem("leftDirection")){
    document.getElementById("left-ball").innerHTML = "";
    document.getElementById("right-ball").innerHTML = "o";
    }
    else{
    document.getElementById("left-ball").innerHTML = "o";
    document.getElementById("right-ball").innerHTML = "";
    }

    if(currentOffense == localStorage.getItem("away")){
        document.getElementById("scoreboard-away-ball").innerHTML = "F";
        document.getElementById("scoreboard-home-ball").innerHTML = "";
        defenseName = localStorage.getItem("away");
    }
    else{
        document.getElementById("scoreboard-home-ball").innerHTML = "F";
        document.getElementById("scoreboard-away-ball").innerHTML = "";
        defenseName = localStorage.getItem("home");
    }
    playChoiceNames(currentOffense, defenseName);
}

function playChoiceNames(offenseName, defenseName){
    document.getElementById("offenseName").innerHTML = offenseName;
    document.getElementById("defenseName").innerHTML = defenseName;
}

function createOffenseChoices() {
    var offenseSelectBox = "";
    for (var i = 0; i < offense.length; i++) {
        var j = i;
        //if count = first, then first, else (if count = total length = total length, else, count -1)
        var prev = (i == 0) ? 0 : ((i == offense.length) ? (offense.length - 1) : j - 1);
        var prevOffenseType = offense[prev].type;
        var offenseType = offense[i].type;
        if(i == 0){
            offenseSelectBox += "<optgroup label=" + offense[i].type + ">";
        }
        else if(offenseType !== prevOffenseType){
            offenseSelectBox += "</optgroup>";
            offenseSelectBox += "<optgroup label=" + offense[i].type + ">";
        }
        if(/*if meets disabled requirements*/false){
            offenseSelectBox += "<option class=\"offense-choice disabled\" id=" + offense[i].id + ">" + offense[i].name + "</option>";
        }
        else{
            offenseSelectBox += "<option class=\"offense-choice\" id=" + offense[i].id + ">" + offense[i].name + "</option>";
        }
    };

    document.getElementById("offense-select-box").innerHTML = offenseSelectBox;
}

function createDefenseChoices() {
    var defenseSelectBox = "";
    for (var i = 0; i < defense.length; i++) {
        var j = i;
        //if count = first, then first, else (if count = total length = total length, else, count -1)
        var prev = (i == 0) ? 0 : ((i == defense.length) ? (defense.length - 1) : j - 1);
        var prevDefenseType = defense[prev].type;
        var defenseType = defense[i].type;
        if(i == 0){
            defenseSelectBox += "<optgroup label=" + defense[i].type + ">";
        }
        else if(defenseType !== prevDefenseType){
            defenseSelectBox += "</optgroup>";
            defenseSelectBox += "<optgroup label=" + defense[i].type + ">";
        }
        if(/*this meets disabled arguments, then disable the button*/false){
            defenseSelectBox += "<option class=\"defense-choice\" id=" + defense[i].id + ">" + defense[i].name + "</option>";
        }
        else{
            defenseSelectBox += "<option class=\"defense-choice\" id=" + defense[i].id + ">" + defense[i].name + "</option>";
        }
    };

    document.getElementById("defense-select-box").innerHTML = defenseSelectBox;
}

createOffenseChoices();
createDefenseChoices();

function fieldOutcome(yards, hashPosition) {
    /*
    yards = the amount of yards gained/lost, including f or i
    hashPosition = has position they will end up on
    */
    var quote = "";
    var fumble = false;
    var interception = false;
    /*handling a fumble and interception
    * fumble: the runner goes forward X yards and fumbles the ball on the spot
    * int: the ball is thrown, then intercepted
    * if 10, the ball is intercepted and returned past the throwing team's LOS
     *                             DEF   <--0   OFF
     * ==============================================================================
     *                    int---------------0----------> returned past LOS
     *
    * if -10, the ball is intercepted and does not come past the throwing team's LOS
     *                             DEF   <--0   OFF
     * ==============================================================================
     *             int---->                 0    not returned past LOS*/
    if(yards.includes("f")){
        console.log("fumble");
        yards = yards.slice(0, yards.length - 1);
        fumble = true;
    }
    else if(yards.includes("i")){
        console.log("interception");
        yards = yards.slice(0, yards.length - 1);
        interception = true;
    }
    var currentOffense = localStorage.getItem("currentOffense");
    var leftDirection = localStorage.getItem("leftDirection");
    var leftTeam = document.getElementById("left-position-name").innerHTML;
    var rightTeam = document.getElementById("right-position-name").innerHTML;
    var fieldPositions = localStorage.getItem("fieldPositions");
    fieldPositions = fieldPositions.split(",");
    var currentOffensePos = fieldPositions[0];
    var currentFirstDownPos = fieldPositions[1];

    var down = parseInt(localStorage.getItem("down"));

    var finalLOS = 0;
    var togo = 10;
    var finalFirstDown = currentFirstDownPos;


    if(currentOffense == leftTeam){
        finalLOS = (parseInt(currentOffensePos) + parseInt(yards));
        if(finalLOS >= currentFirstDownPos){
            if(fumble || interception){
                finalFirstDown = finalLOS - 10;
            }
            else{
                finalFirstDown = finalLOS + 10;
            }
            down = 1;
            if(finalFirstDown >= 100){
                finalFirstDown = 100;
            }
            else if(finalFirstDown <= 0){
                finalFirstDown = 0;
            }
        }
        else{
            togo = finalFirstDown - finalLOS;
            down++;
        }
        if(down > 4){
            down = 1;
            togo = 10;
            finalFirstDown = finalLOS - 10;
            localStorage.setItem("currentOffense", rightTeam);
        }
        if(finalLOS >= 100){
            addPoints(leftTeam, 6);
            finalLOS = 100;
            finalFirstDown = 100;
        }
        else if(finalLOS <= 0){
            addPoints(rightTeam, 2);
            finalLOS = 0;
            finalFirstDown = 0;
        }
    }
    else/*currentOffense == rightTeam*/{
        finalLOS = (parseInt(currentOffensePos) - parseInt(yards));
        if(finalLOS <= currentFirstDownPos){
            if(fumble || interception){
                finalFirstDown = finalLOS - 10;
            }
            else{
                finalFirstDown = finalLOS + 10;
            }
            down = 1;
            if(finalFirstDown <= 0){
                finalFirstDown = 0;
            }
            else if(finalFirstDown >= 100){
                finalFirstDown = 100;
            }
        }
        else{
            togo = finalLOS - finalFirstDown;
            down++;
        }
        if(down > 4){
            down = 1;
            togo = 10;
            finalFirstDown = finalLOS + 10;
            localStorage.setItem("currentOffense", leftTeam);
        }
        if(finalLOS >= 100){
            addPoints(leftTeam, 2);
            finalLOS = 100;
            finalFirstDown = 100;
        }
        else if(finalLOS <= 0){
            addPoints(rightTeam, 6);
            finalLOS = 0;
            finalFirstDown = 0;
        }
    }
    if(fumble || interception){
        //switch offense and first down
        //TODO somewhere in here, the first down isn't being set properly.
        quote += "turnover : yards " + yards;
        console.log(quote);
        down = 1;
        togo = 10;
        turnOver();
    }
    //set to new positions
    localStorage.setItem("fieldPositions", finalLOS + "," + finalFirstDown + "," + hashPosition);
    localStorage.setItem("ballon", finalLOS);
    localStorage.setItem("togo", togo);
    localStorage.setItem("down", down);
    if(fumble || interception){
        setAllPositions(finalLOS, finalFirstDown, hashPosition);
    }
    else{
        setAllPositions(finalLOS, finalFirstDown, hashPosition);
    }

    document.getElementById("outcome-display").innerHTML = quote;
}

function setAllPositions(offenseYds, firstYds, hashPosition) {
    var offensePosition = getYardPosition(offenseYds);
    var firstDownPosition = getYardPosition(firstYds);
    if(hashPosition == "L"){
        hashPosition = 140;
        
        if(localStorage.getItem("currentOffense") == localStorage.getItem("leftDirection")){
            hashPosition = 210;
        }
    }
    else if(hashPosition == "R"){
        hashPosition = 210;

        if(localStorage.getItem("currentOffense") == localStorage.getItem("leftDirection")){
            hashPosition = 140;
        }
    }
    else{
        hashPosition = 175;
    }

    setField(offensePosition, firstDownPosition, hashPosition);
}

function getYardPosition(yard) {
    //returns the pixel position
    var tenLeft = Math.ceil($("#tenLeft").position().left);
    var twentyLeft = Math.ceil($("#twentyLeft").position().left);
    var zeroYardLine = tenLeft - 8;

    var oneYard = ((twentyLeft - tenLeft) / 10);
    var position = zeroYardLine + (yard * oneYard);
    return position;
}

function setField(offensePos, firstDownPos, hashPosition) {
    //TODO add animations here
    $('#lineOfScrimmage').css({
        'left': offensePos + "px"
    });
    $('#firstDownPosition').css({
        'left': firstDownPos + "px"
    });

    //need to add more logic here based on field direction
    $('#leftTeamPosition').css({
        'left': (offensePos - 58) + "px", 
        'top': hashPosition + "px"
    });
    $('#rightTeamPosition').css({
        'left': (offensePos - 26) + "px", 
        'top': hashPosition + "px"
    });
    setScoreboard();
}

function turnOver() {
    var currentOffense = localStorage.getItem("currentOffense");
    var rightTeam = document.getElementById("right-position-name").innerHTML;
    var leftTeam = document.getElementById("left-position-name").innerHTML;
    if(currentOffense == leftTeam){
        localStorage.setItem("currentOffense", rightTeam);
    }
    else{
        localStorage.setItem("currentOffense", leftTeam);
    }
    setBallHolder();
}

function setBeadPosition(beadPos){
    var onePosition = 490/100;
    $("#bead").animate({ 'top': (onePosition * 2) + "px" }, 150 )
        .animate({ 'top': (onePosition * 92) + "px" }, 200 )
        .animate({ 'top': (onePosition * 2) + "px" }, 200 )
        .animate({ 'top': (onePosition * 92) + "px" }, 250 )
        .animate({ 'top': (onePosition * beadPos/2) + "px" }, 300 )
        .animate({ 'top': (onePosition * beadPos) + "px" }, 500 );
}

function moveBallAnimation() {
    //amimation
}

function penalty(penaltyType) {
    // add some logic that adds some randomeness to it.
    //it could be a pass play, but there could just be random uneccessary roughness too.
    if(penaltyType == "Pass"){

    }
    else if(penaltyType == "Run"){

    }
    else if(penaltyType == "Kick"){

    }
    else{

    }

    //down here popup the penalty modal that displays a reason and the number of yards the penalty is.
    //then add the penalty and correct down to the field logic (2nd down still, -10 yards for offense.)
}

function kickOffSetup(){
    var home = localStorage.getItem("home");
    var away = localStorage.getItem("away");
    var receiveFirst = localStorage.getItem("receiveFirst");
    var leftDirection = localStorage.getItem("leftDirection");
    var firstDownPosition = 0;
    var lineOfScrimmage = 0;
    var left = "";
    var right = "";
    var rotate = false;
    if(receiveFirst == away && leftDirection == away) /*p1kick, p2left || p2recieve, p1right*/{
        lineOfScrimmage = getYardPosition(30);
        firstDownPosition = getYardPosition(40);
        left = home;
        right = away;
        localStorage.setItem("fieldPositions", "30,40,K"); 
    }
    else if(receiveFirst == away && leftDirection == home) /*p1kick, p2right || p2recieve, p1left*/{
        lineOfScrimmage = getYardPosition(70);
        firstDownPosition = getYardPosition(60);
        left = away;
        right = home;
        rotate = true;
        localStorage.setItem("fieldPositions", "70,60,K"); 
    }
    else if(receiveFirst == home && leftDirection == home) /*p2kick, p1left || p1recieve, p2right*/{
        lineOfScrimmage = getYardPosition(30);
        firstDownPosition = getYardPosition(40);
        left = away;
        right = home;
        localStorage.setItem("fieldPositions", "30,40,K"); 
    }
    else /*receiveFirst == home && leftDirection == away -- p2kick, p1right || p1recieve, p2left */{
        lineOfScrimmage = getYardPosition(70);
        firstDownPosition = getYardPosition(60);
        left = home;
        right = away;
        rotate = true;
        localStorage.setItem("fieldPositions", "70,60,K"); 
    }

    $('#lineOfScrimmage').css({
        'left': lineOfScrimmage + "px"
    });
    $('#firstDownPosition').css({
        'left': firstDownPosition + "px"
    });

    setFieldPlayers();
    if(rotate){
        $('#leftTeamPosition').css({
            'left': (firstDownPosition - 58) + "px", 
            'top': "175px"
        });

        $('#rightTeamPosition').css({
            'left': (lineOfScrimmage - 26) + "px", 
            'top': "175px"
        });
    }
    else{
        $('#leftTeamPosition').css({
            'left': (lineOfScrimmage - 58) + "px", 
            'top': "175px"
        });

        $('#rightTeamPosition').css({
            'left': (firstDownPosition - 26) + "px", 
            'top': "175px"
        });
    }
    setBallHolder();
}

function setFieldPlayers() {
    var homeColor = localStorage.getItem("homeColor");
    var awayColor = localStorage.getItem("awayColor");
    var home = localStorage.getItem("home");
    var away = localStorage.getItem("away");

    var leftDirection = localStorage.getItem("leftDirection");
    if(leftDirection == away){
        document.getElementById("left-position-name").innerHTML = home;
        $('#leftTeamPosition').css({
            'background-color': homeColor
        });

        document.getElementById("right-position-name").innerHTML = away;
        $('#rightTeamPosition').css({
            'background-color': awayColor
        });
    }
    else{
        document.getElementById("left-position-name").innerHTML = away;
        $('#leftTeamPosition').css({
            'background-color': awayColor
        });

        document.getElementById("right-position-name").innerHTML = home;
        $('#rightTeamPosition').css({
            'background-color': homeColor
        });

    }
}

function setScoreboard(){  
    if(localStorage.getItem("setupGame") !== "none"){
        return;
    }
    document.getElementById("scoreboard-away").innerHTML = localStorage.getItem("away");
    document.getElementById("scoreboard-home").innerHTML = localStorage.getItem("home");
    document.getElementById("scoreboard-time-value").innerHTML = localStorage.getItem("time");

    document.getElementById("scoreboard-away-tol-value").innerHTML = localStorage.getItem("awaytol");
    document.getElementById("scoreboard-home-tol-value").innerHTML = localStorage.getItem("hometol");
    document.getElementById("scoreboard-qtr-value").innerHTML = localStorage.getItem("qtr");
    document.getElementById("scoreboard-down-value").innerHTML = localStorage.getItem("down");
    document.getElementById("scoreboard-togo-value").innerHTML = localStorage.getItem("togo");
    var ballon = localStorage.getItem("ballon");
    if(ballon > 50){
        ballon = 100 - ballon;
    }
    document.getElementById("scoreboard-ballon-value").innerHTML = ballon;

    document.getElementById("scoreboard-away-score").innerHTML = localStorage.getItem("homeScore");
    document.getElementById("scoreboard-home-score").innerHTML = localStorage.getItem("awayScore");
}

function addPoints(team, points) {
    var home = localStorage.getItem("home");

    if(team == home){
        var score = parseInt(localStorage.getItem("homeScore")) + points;
        localStorage.setItem("homeScore", score);
    }
    else{
        var score = parseInt(localStorage.getItem("awayScore")) + points;
        localStorage.setItem("awayScore", score);
    }

    if(points == 1){
        //PAT
    }
    else if(points == 2){
        //safety
    }
    else if(points == 6){
        //touchdown
    }

    setTimeout(function(){
        $('#points-modal').modal('show')
    }, 1500);
    setScoreboard();
}

$("#twoPTSetup").click(function() {
    if(localStorage.getItem("fieldPositions").match("^100")){
        localStorage.setItem("fieldPositions", "98,100,C");
        localStorage.setItem("ballon", "98");
        localStorage.setItem("playType", "twoPointConversion");
        setAllPositions(98, 100, "C");
    }
    else{
        localStorage.setItem("fieldPositions", "2,2,C");
        localStorage.setItem("ballon", "2");
        localStorage.setItem("playType", "twoPointConversion");
        setAllPositions(2, 0, "C");
    }
    setScoreboard();
});

$("#fieldGoalSetup").click(function() {
    if(localStorage.getItem("fieldPositions").match("^100")){
        localStorage.setItem("fieldPositions", "98,100,C");
        localStorage.setItem("ballon", "98");
        localStorage.setItem("playType", "extraPoint");
        setAllPositions(98, 100, "C");
    }
    else{
        localStorage.setItem("fieldPositions", "2,2,C");
        localStorage.setItem("ballon", "2");
        localStorage.setItem("playType", "extraPoint");
        setAllPositions(2, 0, "C");
    }
    setScoreboard();
});