var trex, trexR; 
var ground,groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexcollider,gameOverimg,restartimg;
var score;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
cloudImage=loadImage("cloud.png"); 
obstacle1=loadImage("obstacle1.png"); 
obstacle2=loadImage("obstacle2.png"); 
obstacle3=loadImage("obstacle3.png"); 
obstacle4=loadImage("obstacle4.png"); 
obstacle5=loadImage("obstacle5.png"); 
obstacle6=loadImage("obstacle6.png"); 
trexcollider=loadAnimation("trex_collided.png");
gameoverimg=loadImage("gameOver.png");
restartimg=loadImage("restart.png");  
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);
  score=0;
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexcollider);
  trex.scale = 0.5;
  
  invisisbleground = createSprite(200,190,400,20);
  invisisbleground.visible=false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  //place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage("gameOver",gameoverimg);
gameOver.scale = 0.5;
restart.addImage("restart",restartimg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
}


function draw() {
  background(180);
  text("Score "+score,469,29);
  
  if(gameState==PLAY){ 
  if(keyDown("space")&&trex.y>156){
   trex.velocityY=-10; 
    
  }
  trex.velocityY=trex.velocityY+0.8;
  
  if(ground.x<0){
   ground.x=ground.width/2; 
  }
 console.log(trex.y);
    
   score=Math.round(getFrameRate()/60)+score; 
    
ground.velocityX=-10;  
    
 spawnClouds(); 
 spawnObstacles(); 
    
if(trex.isTouching(obstacleGroup)){
gameState=END;  
} 
    
  }
  
else if(gameState==END){
trex.changeAnimation("collided",trexcollider);
ground.velocityX=0;
trex.velocityY=0;  
gameOver.visible=true;
restart.visible=true;
obstacleGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
cloudGroup.setLifetimeEach(-1);  
obstacleGroup.setLifetimeEach(-1); 
}  
  
if(mousePressedOver(restart)) {
    reset();
}
    
//text(mouseX+","+mouseY,mouseX,mouseY);
trex.collide(invisisbleground);  
  
  drawSprites();
  
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;
  trex.changeAnimation("running", trex_running);
  
  count = 0;
  
}




function spawnClouds(){
  if(frameCount%70==0){
  var cloud = createSprite(600,58,20,20);
  cloud.addImage("cloud.png",cloudImage); 
  cloud.velocityX=-5;
  cloud.y=Math.round(random(10,130)); 
  cloud.lifetime=120; 
  cloudGroup.add(cloud);
   
    
  } 
} 
  
  function spawnObstacles(){
  if(frameCount%70==0){
  var obstacle = createSprite(600,166,20,20);
  var r = Math.round(random(1,6));
  switch(r){
    case 1: obstacle.addImage("obstacle",obstacle1);
      break;
     
    case 2: obstacle.addImage("obstacle1",obstacle2);
     break;
     
     case 3: obstacle.addImage("obstacle2",obstacle3);
      break;
      
      case 4: obstacle.addImage("obstacle3",obstacle4);
      break;
      
      case 5: obstacle.addImage("obstacle4",obstacle5);
      break;
      
      case 6: obstacle.addImage("obstacle5",obstacle6);
      break;
      default:break
  }
   obstacle.velocityX=-10;
   obstacle.scale=0.5;   
   obstacle.lifetime=60;
  obstacleGroup.add(obstacle);  
  } 
} 


