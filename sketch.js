var trex, truns ,ground,gimg,x1,x2, cimg ,o1,o2,o3,o4,o5,o6,score,
ogrp,gameState,cgrp,tdies,argrp,arimg,ard,bg,go,goimg,r,rimg,jump,die 
function preload(){
  goimg=loadImage("gameOver.png")
  rimg=loadImage("restart.png")
truns=loadAnimation("trex1.png","trex2.png","trex3.png")
gimg=loadImage("ground.png")
cimg=loadImage("cloud.png")
o1=loadImage("obstacle1.png")
o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
o6=loadImage("obstacle6.png")
tdies=loadAnimation("trex_collided.png")
arimg=loadAnimation("Aviraptor_1.png","Aviraptor_2.png")
ard=loadAnimation("Aviraptor_2.png")
jump=loadSound("jump.mp3")
die=loadSound("die.mp3")

}

function setup() {
  score=0
  cgrp=new Group()


  createCanvas(800,200);
  go=createSprite(400,100)

  go.addImage(goimg)
  go.visible=false
  r=createSprite(400,50)
  r.addImage(rimg)
  r.visible=false
  bg=createSprite(400,100,800,200)
  bg.visible=false
  trex=createSprite(35,170,50,50)
  trex.addAnimation("run",truns)
  trex.addAnimation("dies",tdies)
  trex.scale=0.5
  // trex.debug=true
  trex.setCollider("rectangle",0,0,50,100)
ground=createSprite(400,195,800,5)
ground.visible=false
x1=0
x2=width
// console.log(Math.round(random(1,10)))
console.log(4%2)
ogrp=new Group()
gameState="play"
agrp=new Group()
}

function draw() 
{
  background("white");
  go.depth=trex.depth
  r.depth=trex.depth
  if(gameState=="play")//playing condition 

  { trex.velocityY+=0.3//gravity
    score+=Math.round(frameCount/60)
    x1-=3
    x2-=3

    if(keyDown("space") && trex.y>=138){
      trex.velocityY=-8
      jump.play()
    //  console.log(20) 
  
    }
    createclouds()
    createopsticles()
    createraptors()
    if(trex.isTouching(ogrp)||trex.isTouching(agrp,stopraptor)){
      bg.overlap(agrp,stopraptor)
      die.play()
      gameState="end"
    }

  }
  else if(gameState=="end"){//game over condition 
    ogrp.setVelocityEach(0,0)
    cgrp.setVelocityEach(0,0)
    trex.changeAnimation("dies")
   agrp.setVelocityEach(0,0)
   agrp.setLifetimeEach(-1)
   cgrp.setLifetimeEach(-1)
   ogrp.setLifetimeEach(-1)
   trex.setVelocity(0,0)
   go.visible=true
   r.visible=true
  //  agrp.setAnimationEach("die")

  }
  text("score - "+score,710,25)      
  
  image(gimg,x1,180,width,10)
  image(gimg,x2,180,width,10)
 
  if(x1<-width){
    x1=width+x2
  }
  if(x2<-width){
    x2=width+x1
  }

  // text(mouseX+","+mouseY,mouseX,mouseY)
  // trex.velocityY+=0.3//gravity  
  trex.collide(ground)
 
  drawSprites()

}
function createclouds(){
  if(frameCount%60==0){

  var cloud=createSprite(width,Math.round(random(20,70)))
  cloud.lifetime=width/3
  cloud.addImage(cimg)
  cloud.velocityX=-3
  cloud.depth=trex.depth
  trex.depth+=1
  cgrp.add(cloud)
  // console.log(trex.depth,cloud.depth)
}}
function createopsticles(){
  var r=Math.round(random(1,6))
  if(frameCount%100==0){
    var opstical=createSprite(width,170)
    opstical.velocityX=-3
    opstical.lifetime=width/3
    ogrp.add(opstical)
    // opstical.debug=true
    switch(r){
      case 1:
    opstical.addImage(o1)
    break
    case 2:
      opstical.addImage(o2)
      break
      case 3:
    opstical.addImage(o3)
    opstical.scale=0.8
    break
    case 4:
    opstical.addImage(o4)
    break
    case 5:
    opstical.addImage(o5)
    opstical.scale=0.8
    break
    case 6:
    opstical.addImage(o6)
    opstical.scale=0.5
    break

    }

      
  }


}
function createraptors(){
  if(frameCount%1000==0){

  var cloud=createSprite(width,Math.round(random(20,70)))
  cloud.lifetime=width/3
  cloud.addAnimation("fly",arimg)
  cloud.addAnimation("die",ard)
  cloud.velocityX=-3
  cloud.depth=trex.depth
  trex.depth+=1
  agrp.add(cloud)
  // console.log(trex.depth,cloud.depth)
  cloud.scale=0.5
}}
function stopraptor(a,b){
b.changeAnimation("die")
}

  

