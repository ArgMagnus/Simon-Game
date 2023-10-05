var buttonColors = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var check = false;

$(".btn").click(function(event) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
$(document).keydown(function(event) {
    if(check==false){
        check = true;
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound (name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress (currentColor) {
     $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");    
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(gamePattern.length==userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }

    else
    {
        var a = new Audio("sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    check=false;
}
