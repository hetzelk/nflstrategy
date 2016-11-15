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
  if(currentOffense == localStorage.getItem("leftDirection")){
    document.getElementById("left-ball").innerHTML = "";
    document.getElementById("right-ball").innerHTML = "o";
  }
  else{
    document.getElementById("left-ball").innerHTML = "o";
    document.getElementById("right-ball").innerHTML = ""; 
  }
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

function setAllPositions(offenseYds, firstYds, hashPosition, fieldGoalYds) {
    var offensePosition = getYardPosition(offenseYds);
    var firstDownPosition = getYardPosition(firstYds);
    /*

    *****************************************
    Make sure to account for the hashposition depending who is on the top of the screen and the bottom.
    *****************************************

    */

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
    var hundredYardLine = tenRight + 83;

    var oneYard = ((twentyLeft - tenLeft) / 10);
    var position = zeroYardLine + (yard * oneYard);
    return position;
}

function setField(offensePos, firstDownPos, hashPosition) {
    $('#lineOfScrimmage').css({
        'left': offensePos + "px"
    });
    $('#firstDownPosition').css({
        'left': firstDownPos + "px"
    });

    //need to add more logic here based on field direction and the kickoff setup.
    $('#leftTeamPosition').css({
        'left': (offensePos - 58) + "px", 
        'top': hashPosition + "px"
    });
    $('#rightTeamPosition').css({
        'left': (offensePos - 26) + "px", 
        'top': hashPosition + "px"
    });
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

function flipDirection() {
  // body...
}

function kickOffSetup(){
    var home = localStorage.getItem("home");
    var away = localStorage.getItem("away");
    var homeColor = localStorage.getItem("homeColor");
    var awayColor = localStorage.getItem("awayColor");
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

    if(rotate){
        document.getElementById("left-position-name").innerHTML = left;
        $('#leftTeamPosition').css({
            'background-color': ((right == away) ? homeColor : awayColor),
            'left': (firstDownPosition - 58) + "px", 
            'top': "175px"
        });

        document.getElementById("right-position-name").innerHTML = right;
        $('#rightTeamPosition').css({
            'background-color': ((left == home) ? awayColor : homeColor),
            'left': (lineOfScrimmage - 26) + "px", 
            'top': "175px"
        });
    }
    else{
        document.getElementById("left-position-name").innerHTML = left;
        $('#leftTeamPosition').css({
            'background-color': ((right == away) ? homeColor : awayColor),
            'left': (lineOfScrimmage - 58) + "px", 
            'top': "175px"
        });

        document.getElementById("right-position-name").innerHTML = right;
        $('#rightTeamPosition').css({
            'background-color': ((left == home) ? awayColor : homeColor),
            'left': (firstDownPosition - 26) + "px", 
            'top': "175px"
        });
    }
    setBallHolder();
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