function setNextStep(text) {
    var el = document.getElementById("next-step-text");
    if(el) el.innerHTML = text;
}

function setAllIfPossible() {
    var setupGame = localStorage.getItem("setupGame");
    if(setupGame !== "none"){
        // No game in progress yet — nothing to render
        return;
    }
    setTouchDowns();
    setupField();
    setScoreboard();
    document.getElementById("next-play").innerHTML = "Next Play";
    var offense = localStorage.getItem("currentOffense");
    var playType = localStorage.getItem("playType");
    if(playType == "kickOff"){
        setNextStep(offense + " — roll the bead (kickoff)");
    } else {
        setNextStep(offense + " — call your offense");
    }
}
setAllIfPossible();

function setupField() {
    //get current field positions from localStorage
    var fieldPositions = localStorage.getItem("fieldPositions");
    if(!fieldPositions) return;
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

function buildPlaySelectHTML(plays, choiceClass) {
    var html = "";
    var tagOrder = ["Test", "Game"];
    tagOrder.forEach(function(tag) {
        var tagPlays = plays.filter(function(p){ return p.tag === tag; });
        if(tagPlays.length === 0) return;

        var lastType = null;
        var openGroup = false;
        var openTag = false;

        tagPlays.forEach(function(play) {
            if(!openTag){
                html += "<optgroup class=\"tag-header tag-" + tag.toLowerCase() + "\" label=\"── " + tag.toUpperCase() + " PLAYS ──\" disabled>";
                html += "</optgroup>";
                openTag = true;
            }
            if(play.type !== lastType){
                if(openGroup) html += "</optgroup>";
                html += "<optgroup class=\"type-group-" + tag.toLowerCase() + "\" label=\"  " + play.type + "\">";
                openGroup = true;
                lastType = play.type;
            }
            html += "<option class=\"" + choiceClass + " play-tag-" + tag.toLowerCase() + "\" id=\"" + play.id + "\">" + play.name + "</option>";
        });
        if(openGroup) html += "</optgroup>";
    });
    return html;
}

function createOffenseChoices() {
    document.getElementById("offense-select-box").innerHTML = buildPlaySelectHTML(offense, "offense-choice");
}

function createDefenseChoices() {
    document.getElementById("defense-select-box").innerHTML = buildPlaySelectHTML(defense, "defense-choice");
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
                // turnover — new offense (rightTeam) drives left; recalc below handles this
                finalFirstDown = finalLOS - 10;
            }
            else{
                // first down — left team drives right, so next first down is 10 yds ahead (increasing)
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
            // turnover on downs — right team takes over driving left
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
                // turnover — new offense (leftTeam) drives right; recalc below handles this
                finalFirstDown = finalLOS + 10;
            }
            else{
                // first down — right team drives left, so next first down is 10 yds ahead (decreasing)
                finalFirstDown = finalLOS - 10;
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
            // turnover on downs — left team takes over driving right
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
        quote += "turnover : yards " + yards;
        console.log(quote);
        down = 1;
        togo = 10;
        // After turnover, the new offense drives the opposite direction.
        // Recalculate firstDown 10 yards ahead for the new ball-carrier's direction.
        var newOffense = (currentOffense == leftTeam) ? rightTeam : leftTeam;
        if(newOffense == leftTeam){
            // new offense drives right (increasing yards)
            finalFirstDown = finalLOS + 10;
            if(finalFirstDown > 100) finalFirstDown = 100;
        } else {
            // new offense drives left (decreasing yards)
            finalFirstDown = finalLOS - 10;
            if(finalFirstDown < 0) finalFirstDown = 0;
        }
        turnOver();
    }
    //set to new positions
    localStorage.setItem("fieldPositions", finalLOS + "," + finalFirstDown + "," + hashPosition);
    localStorage.setItem("ballon", finalLOS);
    localStorage.setItem("togo", togo);
    localStorage.setItem("down", down);
    setAllPositions(finalLOS, finalFirstDown, hashPosition);

    // Deduct game clock. Incomplete passes (0 yards, no turnover, pass play) stop clock.
    var playType = localStorage.getItem("playType");
    var incomplete = (!fumble && !interception && parseInt(yards) === 0 && playType !== "regular");
    deductPlayTime(incomplete);
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
    var kicker = localStorage.getItem("currentOffense");
    setNextStep(kicker + " — roll the bead (kickoff)");
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

    document.getElementById("scoreboard-away-score").innerHTML = localStorage.getItem("awayScore");
    document.getElementById("scoreboard-home-score").innerHTML = localStorage.getItem("homeScore");
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

    // Build modal content based on scoring event
    var title = "";
    var desc = "";
    var valueStr = "+" + points;

    if(points == 6){
        title = "TOUCHDOWN!";
        desc = team + " scored a touchdown!";
        // Show PAT choice buttons
        $("#twoPTSetup").show();
        $("#fieldGoalSetup").show();
        setNextStep(team + " scored a TD — choose PAT or 2-pt conversion");
    }
    else if(points == 3){
        title = "Field Goal!";
        desc = team + " made the field goal!";
        // No PAT needed after FG — handled by handleKickAttempt, hide buttons
        $("#twoPTSetup").hide();
        $("#fieldGoalSetup").hide();
    }
    else if(points == 2){
        title = "Safety!";
        desc = team + " scored a safety!";
        $("#twoPTSetup").hide();
        $("#fieldGoalSetup").hide();
    }
    else if(points == 1){
        title = "Extra Point!";
        desc = team + " made the extra point!";
        $("#twoPTSetup").hide();
        $("#fieldGoalSetup").hide();
    }

    document.getElementById("pointLabel").innerHTML = title;
    document.getElementById("points-team-name").innerHTML = team;
    document.getElementById("points-event-desc").innerHTML = desc;
    document.getElementById("points-value").innerHTML = valueStr;

    setTimeout(function(){
        $('#points-modal').modal('show');
    }, 1500);
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
    setNextStep(localStorage.getItem("currentOffense") + " — call offense for 2-pt conversion, then roll bead");
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
    setNextStep(localStorage.getItem("currentOffense") + " — roll the bead (PAT kick)");
});