var tower , towerImg;
var door , doorImg , doorsGroup;
var climber, climberImg, climbersGroup;
var ghost , ghostImg;
var invisibleclimber,invisibleclimbersGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spookySound;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-jumping.png","ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("castle", towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200);
  ghost.addAnimation("ghoul" , ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleclimbersGroup = new Group();
  
  spookySound.loop();
}

function draw(){
  background(0);
  if(gameState === PLAY) {
  if(tower.y > 600){
    tower.y = 300; 
    
  }
  
  if(keyDown("space")){
  ghost.velocityY = -6;
  
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(keyDown("right_arrow")) {
   ghost.x = ghost.x + 5; 
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x - 5;
    
  }
  
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
    
    if(invisibleclimbersGroup.isTouching(ghost)||ghost.y > 600) {
      gameState = END;
    }
  spawnDoors();
  drawSprites();
  }
  if(gameState === END){
    background(0);
    strokeWeight(5);
    stroke("blue");
    fill("orange");
    textSize(30);
    text("Game Over", 250,300);
    
  }
  }

function spawnDoors(){
  if(frameCount%250 === 0){
    door = createSprite(Math.round(random(100,500)),-50);
    door.addImage("open" , doorImg);
    door.velocityY = 2;
    door.lifetime = 600;
    doorsGroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    climber = createSprite(door.x,10);
    climber.addImage("stool" , climberImg);
    climber.velocityY = 2;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    
    invisibleclimber = createSprite(door.x,15,climber.width,1);
    invisibleclimber.velocityY = 2;
    invisibleclimber.lifetime = 600;
    invisibleclimbersGroup.add(invisibleclimber);
    invisibleclimber.visible = false;
  }
  
  
}

