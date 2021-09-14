var Gamestate=0
var weapon
var cloudsGroup
var score=0
function preload(){
  battlebg=loadImage("battle bg.PNG")
  hero=loadImage("the hero.PNG")
  Hostage=loadImage("hostage.PNG") 
  Obstacle=loadImage("obstacle.PNG")
  WaterWeapon=loadImage("WaterWeapon.png")
  hf=loadImage("Health bar15_[full].png")
  h1=loadImage("Health bar0_[empty].png")
  h2=loadImage("Health bar3.png")
  h3=loadImage("Health bar6.png")
  h4=loadImage("Health bar10_[Normal].png")
  h5=loadImage("Health bar11.png")
}
function setup(){
  createCanvas(600,600)
  input=createInput("Your name")
  input.position(200,200)
  cloudsGroup=createGroup()
  button=createButton("PLAY")
  button.position(400,200)
  player=createSprite(50,250,40,20)
  player.addImage(hero)
  player.visible=false
  player.scale=0.4
  hostage=createSprite(500,150,40,20)
  hostage.addImage(Hostage)
  hostage.visible=false
  hostage.scale=0.5
  Enemy=createSprite(500,200)
  Enemy.visible=false
  healthbar=createSprite(player.x+20,player.y-150)
  healthbar.visible=false
  healthbar.addImage("full",hf)
  healthbar.addImage("1less",h5)
  healthbar.addImage("3less",h4)
  healthbar.addImage("5less",h3)
  healthbar.addImage("7less",h2)
  healthbar.addImage("empty",h1)

  healthbar.scale=0.5
  Enemy1=createSprite(500,500)
  Enemy1.visible=false
  button.mousePressed(()=>{input.hide()
  button.hide()
  Gamestate=1
  })
}

function draw(){
  background(battlebg)
  if(Gamestate===0){
    fill("cyan")
    stroke("black")
    strokeWeight(3)
    textSize(20)
    text("You can rescue the hostage after passing 2 levels",40,300)
    fill("red")
    text("Level 1: Attack the fire and score 250",60,350)
    text("Level 2: Fight the enemies for the given time",40,400)
  }
if(Gamestate===1){player.visible=true 
  hostage.visible=true
  stroke("black")
    strokeWeight(3)
  fill("white")
  textSize(20)
  text("To Rescue the Hostage Click on the space button",40,400)
  text("NOTE: Controls A-Attack up and down arrow for player movements",10,500)
  if(keyDown("space")){
    Gamestate=2
  }
 
}
drawSprites()
  if(Gamestate===2){
    hostage.visible=false 
  spawnClouds()
  healthbar.visible=true
  if(score<=-10&&score>=-30){
    healthbar.changeImage("1less")
  }
  if(score<=-40&&score>=-80){
    healthbar.changeImage("3less")
  }
  if(score<=-80&&score>=-120){
    healthbar.changeImage("5less")
  }
  if(score<=-130&&score>=-200){
    healthbar.changeImage("7less")
  }
  if(score<=-200){
    healthbar.changeImage("empty")
    Gamestate=4
  }if(score>=0){
    healthbar.changeImage("full")
  }

  if(keyDown("UP")){player.y-=5}
  if(keyDown("DOWN")){player.y+=5}
  if(keyDown("A")){weapons()}
  if(weapon!=null){
  for(var i=0;i<cloudsGroup.length;i++){
    if(cloudsGroup.get(i).isTouching(weapon)){
      cloudsGroup.get(i).destroy()
      weapon.lifetime=0
      //to remove the weapon
      weapon.remove()
      score=score+10
    }
  }
  }
  for(var i=0;i<cloudsGroup.length;i++){
    if(cloudsGroup.get(i).isTouching(player)){
      cloudsGroup.get(i).destroy()
      score=score-5
    }
  }
  fill("white")
  textSize(20)
  text("Score : "+score,400,100)
  if(score>=250){Gamestate=3}
}
if (Gamestate===3){
  Enemy.visible=true
  Enemy1.visible=true
  EnemyWeapons()
}
}
function EnemyWeapons(){
  if (frameCount % 60 === 0) {
  var rand=Math.round(random(1,2))
  if(rand===1){
    weapon1=createSprite(Enemy.x,Enemy.y)
    weapon1.velocityX=-20
  }
  else if(rand===2){
    weapon2=createSprite(Enemy1.x,Enemy1.y)
    weapon2.velocityX=-20
  }
}
}

function weapons(){
  weapon=createSprite(player.x,player.y)
  weapon.addImage(WaterWeapon)
  weapon.velocityX=+9
  weapon.scale=0.2
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(100,600));
    cloud.addImage(Obstacle);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime =200;
    
    //adjust the depth
    
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
