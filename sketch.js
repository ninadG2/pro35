var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  balloon = createSprite(100,100)
  balloon.addAnimation("hotAirBalloon",balloonImage1)
  var Dbref = database.ref("balloon/height")
  Dbref.on("value", readHeight)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    balloon.scale = balloon.scale - 0.01;
    updateHeight(0, -10);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale = balloon.scale + 0.01;
    updateHeight(0, 10);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x, y)
{
 database.ref('balloon/height').set({ 
   'x':height.x + x,
   'y':height.y + y,
 })
}

function readHeight(data){
  height = data.val()
  console.log(height);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing the database")
}



