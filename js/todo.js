/*
TODO /  IDEAS list

TODO - not in order
------------------------------
1) Penalty modal
2) penalty code
3) random bead display/animation
4) add space between 
5) Go for 2 option
6) 
7) 
8) 
9) 
10) 
------------------------------
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

---------------------------------
ideas

find a way to place offense and defense on top of each other, just like NFL strategy

keep count of play usage for stats, both teams can view

audible - gets 2 audibles per game
    -if the offense/defense calls an audible/re-adjustment, 
    -it picks a better play based on how the opposing team is lined up

ability to add favorite plays

4th and inches, when the play is 3rd and 10, with a 10 yard gain, 4th and inches might happen

BIG CHANGE/ADDITION
The change could use the same functionality, it's just dependent on if the user is on mobile or not.
mobile friendly, add a 2d display of what happens. Like ESPN
   First Down
     ^
Home |  LOS                    AWAY
^    |  ^0                        ^
TD=====22=====50=================TD

------------------
code functionality ideas
flipdirection will take in all of the variables needed to determine the direction of the users.
  -this will also refresh the page and start the next quarter or present the winner

when setting the field, have an option that adds the offense/defense position for kickoffs and such.

ANIMATIONS
$( "#right" ).click(function() {
  $( ".block" ).animate({ "left": "+=50px" }, "slow" );
});

with animations, ad a little football. 
Try to add animations for a lot of movements. Such as kicks and runs, and passes. Obviously wont be easy, but it would be cool.
*/