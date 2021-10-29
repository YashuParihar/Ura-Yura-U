var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jake,jakeImg
var track
var jumpSound
var score = 0;
var gameOver,restart
var corona,coronaImage
var track,trackImage
var pill1
var pill2
var sanitizer
var docter
var Train1,Train2
var obstaclesGroup, obstacle1, obstacle2

function preload(){
 
 jake_running=loadAnimation('Jake1.png','Jake2.png','jake3.png','jake4.png','jake5.png')
 jumpSound = loadSound("jump.wav")
 
 sunAnimation = loadImage("sun.png");
 pill1Animation=loadImage("pill1.png")
 pill2Animation=loadImage("pill2.png")
 maskAnimation=loadImage("mask.png")
 sanitizerAnimation=loadImage("Hand-Sanitizer.png")
 docterAnimation=loadImage("Docter.png")
 coronaAnimation=loadImage("Enemy.png")
 trackAnimation=loadImage("Track.jpg")
 Train1Animation=loadImage("Train1.png")
 Train2Animation=loadImage("Train2.png")

 trackImage = loadImage("track.jpg");
  
coronaImage = loadImage("Enemy.png")

 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");

gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png")

}

function setup() {
 createCanvas(windowWidth,windowHeight)

sun = createSprite(width-875,40,0,0)
sun.addImage(sunAnimation)
sun.scale=0.1;
jake=createSprite(150,150,100,100)

track = createSprite(width/2,height,width,2);
track.addImage("track",trackImage);
track.x = width/2
track.velocityX = -(6 + 3*score/100);

//pill1 = createSprite(width-0,0,0,0)
//pill1.addImage(pill1Animation)

//pill2 = createSprite(width-0,0,0,0)
//pill2.addImage(pill2Animation)

//obstacle2 = createSprite(width-0,0,0,0)
//obstacle2.addImage(obstacle2Animation)

//mask = createSprite(width-0,0,0,0)
//mask.addImage(maskAnimation)


//Hand-Sanitizer = createSprite(width-0,0,0,0)
//Hand-Sanitizer.addImage(Hand-SanitizerAnimation)

//docter = createSprite(width-0,0,0,0)
//docter.addImage(docterAnimation)

//obstacle1=createSprite(width-0,0,0,0)
//obstacle1.addImage(obstacle1Animation)

//corona = createSprite(width-0,0,0,0)
//corona.addImage(pill2Animation)

//track = createSprite(width-1000,0,0,0)
//track.addImage(trackAnimation)

//Train1 = createSprite(width-0,0,0,0)
//Train1.addImage(Train1Animation)

//Train2 = createSprite(width-0,0,0,0)
//Train2.addImage(Train2Animation)

jake.addAnimation ("running", jake_running); 
  jake.setCollider('circle',0,0,350)
  //jake.scale = 0.08
  // jack.debug=true
  


  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 


 obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    track.velocityY = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && jake.y  >= height-120) {
      jumpSound.play( )
      jake.velocityY = -10;
       touches = [];
    }
    
    jake.velocityY = jake.velocityY + 0.8
  
    if (track.y < 0){
      track.y = track.width/2;
    }
  
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(jake)){
        collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    track.velocityY = 0;
    jake.velocityY = 0;
    obstaclesGroup.setVelocityYEach(0);
   
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  
  
  if(touches.length>0 || keyDown("SPACE")) {      
    reset();
    touches = []
  }
  }







 drawSprites();
 //trex.debug = true;
// background(backgroundImg);
 textSize(20);
 fill("black")
 text("Score: "+ score,30,50);
 
 
 function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityY = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
  //assign scale and lifetime to the obstacle           
  obstacle.scale = 0.3;
  obstacle.lifetime = 300;
  obstacle.depth = jake.depth;
  jake.depth +=1;
  //add each obstacle to the group
  obstaclesGroup.add(obstacle);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach(); 
  trex.changeAnimation("running",trex_running);
  
  score = 0;
}
 
 
}