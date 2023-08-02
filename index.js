let randomNumber=0;
let gamePatterns=[];
let userPattern=[];
let buttonColors=["red", "blue", "green", "yellow"];
let userChoosenColor;
let gameChoosenColor;
let audios = ["sounds/green.mp3" ,"sounds/red.mp3" , "sounds/yellow.mp3" , "sounds/blue.mp3" ];
let lvl=0;
let flag=0;
let maxScore=0;

//To Start Button Function
$("#start").on("click",function(){

    
    if(flag===0)
    {
        $("#start").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        let audio = new Audio("sounds/start.mp3");
        audio.play();
        setTimeout(function(){
            nextSequence();
         },1500);
    }
    flag=1;

})


//User Input 
$(".btn").on("click", function(){

   
    userChoosenColor=$(this).attr("id");
    let btn =$(this);
    btn.addClass("pressed");

    setTimeout(function(){
       btn.removeClass("pressed");
    },100);
   
    
    userPattern.push(userChoosenColor);
    

    playSound(userChoosenColor);

    checkAnswer(userPattern.length-1);
    
})

//computor generated Next sequence
function nextSequence()
{
   
    $("#level-title").text("LEVEL "+lvl);
    randomNumber=Math.random()*10;
    randomNumber=parseInt(randomNumber%4);
    
    gameChoosenColor=buttonColors[randomNumber];
    gamePatterns.push(gameChoosenColor);
    
    $("#"+gameChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gameChoosenColor);
    
}

//Function for playing music
function playSound(name){
    let audio = new Audio(audios[$("#"+name).text()]);
    audio.play();
}

//function for checking ans
function checkAnswer(currentLevel)
{
    console.log(currentLevel);
    if(userPattern[currentLevel]===gamePatterns[currentLevel])
    {
       
        
        if(userPattern.length === gamePatterns.length)
        {
            lvl++;
            
            userPattern=[];
        setTimeout(function(){
            nextSequence();
        } , 1000);
        }

        

    }else
    {
        $("#level-title").html("<h4>Game Over</h4><br><h4>Restart</h4>");

        if(maxScore<lvl)
            {
                maxScore=lvl;
                $(".max-score").text(maxScore);
            }
        gamePatterns=[];
        userPattern=[];
        lvl=0;
        
       
        $("body").addClass("game-over");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();

        setTimeout(function(){
            $("body").removeClass("game-over");
        },150)

        flag=0;

    }
}












