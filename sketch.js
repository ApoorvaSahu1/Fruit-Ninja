var Play=1;
var End=0;
var gameState=1;
var fruit1I,fruit2I,fruit3I,fruit4I,monsterI,swordI;
var fruit,monster,sword;
var fruitGroup,alienGroup;
var gameOver, restart;
var lostM;
var score=0;
var lost=10;
function preload()
{
 fruit1I = loadImage("fruit1.png");
 fruit2I = loadImage("fruit2.png");
 fruit3I = loadImage("fruit3.png");
 fruit4I = loadImage("fruit4.png");
 
 monsterI = loadAnimation("alien1.png","alien2.png");
  
 swordI = loadImage("sword.png");
  
 fruitGroup = new Group();
 enemyGroup = new Group();
  
 
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
 
  lostM=loadSound("gameover.mp3");
  
}

function setup()
{
createCanvas(600, 600);
 
  sword = createSprite(100,100);
  sword.addImage(swordI);
  
  
 
  gameOver = createSprite(300,240);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 1;

  gameOver.visible = false;
  restart.visible = false;
}

function draw()
{
  background("orange");
  fill(0);
  textSize(20);
  textFont('Georgia');
  text("Fruits cut: "+ score, 450,50);
  text("life: "+lost,350,50);
  if(gameState===Play)
    {
       sword.y=World.mouseY;
      sword.x=World.mouseX;
      
      if(sword.isTouching(fruitGroup))
        {
          score=score+1;
          fruitGroup.destroyEach();
        }
      if(enemyGroup.isTouching(sword))
        {
          gameState=End;
          lostM.play();
        }
    }
   else if(gameState===End)
      {
         gameOver.visible = true;
         restart.visible = true;
         fruitGroup.destroyEach();
         enemyGroup.destroyEach();
         
         fruitGroup.setVelocityXEach(0);
         enemyGroup.setVelocityXEach(0);
     
    
    
        if(mousePressedOver(restart)) 
        {
          reset();
        } 
      }

  fruits();
  Enemy();
  drawSprites();
  
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(500,200,20,20);
    monster.addAnimation("moving", monsterI);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.3;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1I);
    } else if (r == 2) {
      fruit.addImage(fruit2I);
    } else if (r == 3) {
      fruit.addImage(fruit3I);
    } else {
      fruit.addImage(fruit4I);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function reset(){
  gameState = Play;
  gameOver.visible = false;
  restart.visible = false;
  
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  score = 0;
}

