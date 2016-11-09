var playCount = 0;

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



/*
Game Flow:
Have another file that can save details, stats, and positions, so page refresh doesn't kill the game
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