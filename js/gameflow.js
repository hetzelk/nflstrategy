function setAllIfPossible() {
    if(localStorage.getItem("setupGame") !== "none"){
        setAllPositions(50, 50, "C");
        return;
    }
    else{
        var teamLeftName = localStorage.getItem("team1name");
        var teamRightName = localStorage.getItem("team2name");
        var leftDirection = localStorage.getItem("leftDirection");
        var receiveFirst = localStorage.getItem("receiveFirst");
        setTouchDowns(); 
        setupField(); 
    }
}

function setupField() {
  //get current field positions from localStorage
  var fieldPositions = localStorage.getItem("fieldPositions");
  fieldPositions = fieldPositions.split(",");
  var offensePos = fieldPositions[0];
  var firstDownPos = fieldPositions[1];
  var hashPos = fieldPositions[2];
  
  //var poss = fieldPositions[3];
  setAllPositions(parseInt(offensePos),parseInt(firstDownPos),hashPos);
}

setAllIfPossible();

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

function setAllPositions(offenseYds, firstYds, hashPosition, fieldGoalYds, playType) {
    if(playType == "kickoff"){

    }

    var tenLeft = Math.ceil($("#tenLeft").position().left);
    var twentyLeft = Math.ceil($("#twentyLeft").position().left);
    /*not really needed 
    var thirtyLeft = Math.ceil($("#thirtyLeft").position().left);
    var fourtyLeft = Math.ceil($("#fourtyLeft").position().left);
    var fiftyLeft = Math.ceil($("#fiftyLeft").position().left);
    var fiftyRight = Math.ceil($("#fiftyRight").position().left);
    var fourtyRight = Math.ceil($("#fourtyRight").position().left);
    var thirtyRight = Math.ceil($("#thirtyRight").position().left);
    var twentyRight = Math.ceil($("#twentyRight").position().left);
    var tenRight = Math.ceil($("#tenRight").position().left);*/

    var zeroYardLine = tenLeft - 8;
    var hundredYardLine = tenRight + 83;

    var oneYard = ((twentyLeft - tenLeft) / 10);

    var offensePosition = getYardPosition(zeroYardLine, offenseYds, oneYard);
    var firstDownPosition = getYardPosition(zeroYardLine, firstYds, oneYard);


    /*

*****************************************
Make sure to account for the hashposition depending who is on the top of the screen and the bottom.
*****************************************

    */

    if(hashPosition == "L"){
        hashPosition = 140;
        /*
        if(offense going left '''or something){
            hashPosition = 210;
        }*/
    }
    if(hashPosition == "R"){
        hashPosition = 210;
        /*
        if(offense going left '''or something){
            hashPosition = 140;
        }*/
    }
    else{
        hashPosition = 175;
    }

    setField(offensePosition, firstDownPosition, hashPosition);
}

function getYardPosition(zeroYardLine, yard, oneYard) {
    //returns the pixel position
    var position = zeroYardLine + (yard * oneYard);
    return position;
}

function setField(offensePos, firstDownPos, hashPosition, arguments) {
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
/*
Game Flow:
Have localstorage save details, stats, and positions, so page refresh doesn't kill the game
Game reset clears that saved file.

Setup game button -
setup = asks for teams names and colors. Also special rules options.
display those details.

Start game button -
shows the field, score, time, TOL, other details etc (main screen)

Start play button/Next play button - 
modal popup for offense, 40s to pick,
    -timeout button available, 
        -diable if no timeouts left
    -time runs out, penalty is called - ***delay of game penalty for play pick. Move the ball wherever, then allow them to pick a new play.
    -continue button is hit.
modal popup for defense, 40s to pick

once the defense hits continue, random bead is hit - make some visual for this motion.
UI shows the out come of the play, then moves the players on the field.
next

*/

/*
ideas

find a way to place offense and defense on top of each other, just like NFL strategy

keep count of play usage for stats, both teams can view

audible - gets 2 audibles per game
    -if the offense/defense calls an audible/re-adjustment, 
    -it picks a better play based on how the opposing team is lined up

ability to add favorite plays

4th and inches, when the play is 3rd and 10, with a 10 yard gain, 4th and inches might happen
*/