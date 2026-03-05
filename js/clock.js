/*
 * clock.js — Game clock management for NFL Strategy
 *
 * Each play deducts a random amount of time (simulating huddle + snap).
 * Timeouts stop the clock. Quarter transitions handled here.
 * Quarter length is set by the user (1–4 quarters, each 15 min).
 */

var clockInterval = null;
var clockRunning = false;

// Parse "MM:SS" string → total seconds
function timeToSeconds(timeStr) {
    var parts = timeStr.split(":");
    return (parseInt(parts[0]) * 60) + parseInt(parts[1]);
}

// Total seconds → "MM:SS" string
function secondsToTime(secs) {
    if (secs < 0) secs = 0;
    var m = Math.floor(secs / 60);
    var s = secs % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}

/*
 * Deduct time after a play.
 * Normal play: 25–45 seconds off the clock (random).
 * Incomplete pass / out of bounds: only 5 seconds (clock stops).
 * Called automatically from fieldOutcome().
 */
function deductPlayTime(incomplete) {
    var current = localStorage.getItem("time");
    var secs = timeToSeconds(current);
    var deduct = incomplete ? 5 : (Math.floor(Math.random() * 21) + 25);
    secs = Math.max(0, secs - deduct);
    localStorage.setItem("time", secondsToTime(secs));
    setScoreboard();

    if (secs === 0) {
        endOfQuarter();
    }
}

/*
 * Use a timeout for the team currently on offense.
 * Stops the clock — no time deducted on next play.
 * Returns false if team has no timeouts remaining.
 */
function callTimeout(team) {
    var home = localStorage.getItem("home");
    var tolKey = (team === home) ? "hometol" : "awaytol";
    var tol = parseInt(localStorage.getItem(tolKey));
    if (tol <= 0) {
        alert(team + " has no timeouts remaining.");
        return false;
    }
    tol--;
    localStorage.setItem(tolKey, tol);
    setScoreboard();
    return true;
}

/*
 * End-of-quarter logic.
 * Increments quarter, resets clock to 15:00, handles halftime and game end.
 */
function endOfQuarter() {
    var qtr = parseInt(localStorage.getItem("qtr"));
    var gameLength = parseInt(localStorage.getItem("gameLength")) || 4;

    if (qtr >= gameLength) {
        endGame();
        return;
    }

    qtr++;
    localStorage.setItem("qtr", qtr);
    localStorage.setItem("time", "15:00");

    // Reset timeouts at halftime (after Q2)
    if (qtr === 3) {
        localStorage.setItem("hometol", "3");
        localStorage.setItem("awaytol", "3");
        showHalftime();
    } else {
        showQuarterEnd(qtr);
    }

    // Switch possession direction at the half
    if (qtr === 3) {
        switchFieldDirection();
    }

    setScoreboard();
}

/*
 * Flip which team is going which direction at halftime.
 */
function switchFieldDirection() {
    var home = localStorage.getItem("home");
    var away = localStorage.getItem("away");
    var leftDirection = localStorage.getItem("leftDirection");
    var newLeft = (leftDirection === home) ? away : home;
    localStorage.setItem("leftDirection", newLeft);
}

/*
 * Show a quarter-end banner.
 */
function showQuarterEnd(newQtr) {
    document.getElementById("quarter-end-text").innerHTML =
        "End of Quarter " + (newQtr - 1) + " — Starting Quarter " + newQtr;
    $('#quarter-end-modal').modal('show');
}

/*
 * Show halftime modal.
 */
function showHalftime() {
    document.getElementById("quarter-end-text").innerHTML = "HALFTIME";
    $('#quarter-end-modal').modal('show');
}

/*
 * Determine game winner and show final score modal.
 */
function endGame() {
    var homeScore = parseInt(localStorage.getItem("homeScore"));
    var awayScore = parseInt(localStorage.getItem("awayScore"));
    var home = localStorage.getItem("home");
    var away = localStorage.getItem("away");

    var resultText = "";
    if (homeScore > awayScore) {
        resultText = home + " wins " + homeScore + " – " + awayScore + "!";
    } else if (awayScore > homeScore) {
        resultText = away + " wins " + awayScore + " – " + homeScore + "!";
    } else {
        resultText = "Final score: " + homeScore + " – " + awayScore + " — It's a tie!";
    }

    document.getElementById("game-end-text").innerHTML = resultText;
    $('#game-end-modal').modal('show');
}
