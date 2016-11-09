$(".offense-choice").hover(function() {
    var hoveredItem = $(event.target).attr("id");
    $(this).css("font-weight", "500");
    var result = $.grep(offense, function(e){ return e.id == hoveredItem; });
    var plays = result[0].name + "<br>" + result[0].type + "<br>" + result[0].desc;
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
    var result = $.grep(defense, function(e){ return e.id == hoveredItem; });
    var plays = result[0].name + "<br>" + result[0].type + "<br>" + result[0].desc;
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
    var result = $.grep(offense, function(e){ return e.id == clickedItem; });
    var plays =  result[0].name + "<br>" + result[0].type + "<br>" + result[0].desc;

    document.getElementById("offense-select").innerHTML = result[0].name;
    document.getElementById("offense-called").innerHTML = result[0].name;
    document.getElementById("show-offense-play").innerHTML = plays;
    $("#offense-continue").removeClass("disabled");
});

$(".defense-choice").click(function() {
    var clickedItem = $(event.target).attr("id");
    var result = $.grep(defense, function(e){ return e.id == clickedItem; });
    var plays =  result[0].name + "<br>" + result[0].type + "<br>" + result[0].desc;

    document.getElementById("defense-select").innerHTML = result[0].name;
    document.getElementById("defense-called").innerHTML = result[0].name;
    document.getElementById("show-defense-play").innerHTML = plays;
    $("#defense-continue").removeClass("disabled");
    $("#offense-called").removeClass("none");
    $("#defense-called").removeClass("none");
    playCount++;
    document.getElementById("playCount").innerHTML = playCount;
});

$("#next-play").click(function() {
    document.getElementById("next-play").innerHTML = "Next Play";
    document.getElementById("offense-select").innerHTML = "Offense";
    document.getElementById("defense-select").innerHTML = "Defense";
    $("#offense-called").addClass("none");
    $("#defense-called").addClass("none");
});