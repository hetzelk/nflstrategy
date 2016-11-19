function setAllIfPossible() {
    if(localStorage.getItem("setupGame") !== "none"){
        setAllPositions(50, 50, "C");
        return;
    }
    else{
        setTouchDowns(); 
        setupField(); 
        //setScoreboard();
    }
}

function setupField() {
    //get current field positions from localStorage
    var fieldPositions = localStorage.getItem("fieldPositions");
    fieldPositions = fieldPositions.split(",");
    var offensePos = fieldPositions[0];
    var firstDownPos = fieldPositions[1];
    var hashPos = fieldPositions[2];
    if(hashPos == "K"){
        kickOffSetup();
    }
    else{
        setAllPositions(parseInt(offensePos),parseInt(firstDownPos),hashPos);
    }
}

setAllIfPossible();

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

var divider = "<div class=\"dropdown-divider\"></div>";

function createOffenseChoices() {
    var offenseSelect = "";
    for (i = 0; i < offense.length; i++) {

        var j = i;
        //if count = first, then first, else (if count = total length = total length, else, count -1)
        var prev = (i == 0) ? 0 : ((i == offense.length) ? (offense.length - 1) : j - 1);
        var prevOffenseType = offense[prev].type;
        var offenseType = offense[i].type;
        if(i == 0){
            offenseSelect += (i == 0) ? "" : divider;
            offenseSelect += "<h6 class=\"dropdown-header\">" + offense[i].type + "</h6>";
        }
        else if(offenseType !== prevOffenseType){
            offenseSelect += divider;
            offenseSelect += "<h6 class=\"dropdown-header\">" + offense[i].type + "</h6>";
        }
        if(/*this meets disabled arguments, then disable the button*/false){
            offenseSelect += "<a class=\"dropdown-item disabled\" id=" + offense[i].id + ">" + offense[i].name + "</a>";
        }
        else{
            offenseSelect += "<a class=\"dropdown-item offense-choice\" id=" + offense[i].id + ">" + offense[i].name + "</a>";
        }
    };
    /*
    <optgroup label="4-3 asd">
        <option class="select-hover" value="Running">Running</option>
        <option class="select-hover" value="Paragliding">Paragliding</option>
        <option class="select-hover" value="Swimming">Swimming</option>
    </optgroup>*/
    document.getElementById("offense-dropdown-menu").innerHTML = offenseSelect;
}

function createDefenseChoices() {
    var defenseSelect = "";
    for (i = 0; i < defense.length; i++) {

        var j = i;
        //if count = first, then first, else (if count = total length = total length, else, count -1)
        var prev = (i == 0) ? 0 : ((i == defense.length) ? (defense.length - 1) : j - 1);
        var prevOffenseType = defense[prev].type;
        var offenseType = defense[i].type;
        if(i == 0){
            defenseSelect += (i == 0) ? "" : divider;
            defenseSelect += "<h6 class=\"dropdown-header\">" + defense[i].type + "</h6>";
        }
        else if(offenseType !== prevOffenseType){
            defenseSelect += divider;
            defenseSelect += "<h6 class=\"dropdown-header\">" + defense[i].type + "</h6>";
        }
        if(/*this meets disabled arguments, then disable the button*/false){
            defenseSelect += "<a class=\"dropdown-item disabled\" id=" + defense[i].id + ">" + defense[i].name + "</a>";
        }
        else{
            defenseSelect += "<a class=\"dropdown-item defense-choice\" id=" + defense[i].id + ">" + defense[i].name + "</a>";
        }
    };
    document.getElementById("defense-dropdown-menu").innerHTML = defenseSelect;
}

createOffenseChoices();
createDefenseChoices();

function fieldOutcome(yards, hashPosition) {
    /*
    yards = the amount of yards gained/lost
    hashPosition = has position they will end up on
    */
    var fumble = false;
    var interception = false;
    if(yards.includes("f")){
        yards = yards.slice(0, yards.length - 1);
        fumble = true;
    }
    else if(yards.includes("i")){
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

    var finalLOS = 0;
    var finalFirstDown = currentFirstDownPos;

    var quote = "";

    if(currentOffense == leftTeam){
        //console.log("LLL " + currentOffense, leftTeam);
        finalLOS = (parseInt(currentOffensePos) + parseInt(yards));
        if(finalLOS >= currentFirstDownPos){
            finalFirstDown = finalLOS + 10;
            if(finalFirstDown >= 100){
                finalFirstDown = 100;
            }
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
        //console.log("RRR " + currentOffense, rightTeam);
        finalLOS = (parseInt(currentOffensePos) - parseInt(yards));
        if(finalLOS <= currentFirstDownPos){
            finalFirstDown = finalLOS - 10;
            if(finalFirstDown <= 0){
                finalFirstDown = 0;
            }
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
    quote = yards;
    //set to new positions
    localStorage.setItem("fieldPositions", finalLOS + "," + finalFirstDown + "," + hashPosition);
    setAllPositions(finalLOS, finalFirstDown, hashPosition);

    document.getElementById("outcome-display").innerHTML = quote;
}

function setAllPositions(offenseYds, firstYds, hashPosition, fieldGoalYds) {
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

function setBeadPosition(beadPos){
    var onePosition = 490/100;
    $("#bead").animate({ 'top': (onePosition * 2) + "px" }, 150 );
    $("#bead").animate({ 'top': (onePosition * 92) + "px" }, 200 );
    $("#bead").animate({ 'top': (onePosition * 2) + "px" }, 200 );
    $("#bead").animate({ 'top': (onePosition * 92) + "px" }, 250 );
    $("#bead").animate({ 'top': (onePosition * beadPos/2) + "px" }, 300 );
    $("#bead").animate({ 'top': (onePosition * beadPos) + "px" }, 500 );
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

    document.getElementById("scoreboard-t1-tol-value").innerHTML = localStorage.getItem("t1tol");
    document.getElementById("scoreboard-t2-tol-value").innerHTML = localStorage.getItem("t2tol");
    document.getElementById("scoreboard-qtr-value").innerHTML = localStorage.getItem("qtr");
    document.getElementById("scoreboard-down-value").innerHTML = localStorage.getItem("down");
    document.getElementById("scoreboard-togo-value").innerHTML = localStorage.getItem("togo");
    document.getElementById("scoreboard-ballon-value").innerHTML = localStorage.getItem("ballon");

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
    setScoreboard();
}