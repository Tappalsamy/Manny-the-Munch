const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

function preload(){
 bg = loadImage("background.png");
 fruitImg = loadImage("melon.png");
 bunny = loadImage("sad_1.png")
 blinking = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
 eating = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
 sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
 star = loadImage("star.png")
 empty = loadImage("g_star1.png")

 sad.looping = false
 eating.looping = false
 eating.playing = true
 sad.playing = true
 blinking.playing = true

 air = loadSound("air.wav")
 consuming = loadSound("eating_sound.mp3")
 cutting = loadSound("rope_cut.mp3")
 sadness = loadSound("sad.wav")
 bgMusic = loadSound("sound1.mp3")
}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    w = displayWidth
    h = displayHeight
    createCanvas(w,h)
  }
  else{
    w = windowWidth
    h = windowHeight
    createCanvas(w,h)
  }
  frameRate(80);
  bgMusic.play()
  bgMusic.setVolume(0.2)
  engine = Engine.create();
  world = engine.world;

  blinking.frameDelay = 25
  eating.frameDelay = 25
  sad.frameDelay = 25

  ground = new Ground(w/2,h,w,20);

  rabbit = createSprite(w/2,h-80,100,100)
  rabbit.addAnimation("blink", blinking)
  rabbit.scale = 0.25
  rabbit.addAnimation("eat", eating)
  rabbit.addAnimation("sad", sad)
  


  rope = new Rope(14,{x:250,y:h/2-200})
  rope2 = new Rope(5,{x:w/2+30,y:50})
  rope3 = new Rope(14,{x:w-220,y:h/2-200})

  fruit = Bodies.circle(300,300,15,{density:0.001})
  Composite.add(rope.body,fruit)

  link = new Link(rope,fruit)
  link2 = new Link(rope2,fruit)
  link3 = new Link(rope3,fruit)

  button = createImg("cut_btn.png")
  button.position(220,h/2-200)
  button.size(50,50)
  button.mouseClicked(drop)

  button2 = createImg("cut_btn.png")
  button2.position(w/2,50)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg("cut_btn.png")
  button3.position(w-220,h/2-200)
  button3.size(50,50)
  button3.mouseClicked(drop3)

  blower = createImg("balloon.png")
  blower.position(10,280)
  blower.size(150,100)
  blower.mouseClicked(blow)

  blower2 = createImg("balloon2.png")
  blower2.position(w-200,h-200)
  blower2.size(100,150)
  blower2.mouseClicked(blow2)

  mute = createImg("mute.png")
  mute.position(w-100,20)
  mute.size(50,50)
  mute.mouseClicked(silence)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  empty1 = createSprite(50,50)
  empty1.addImage(empty)
  empty1.scale = 0.1
  empty1.addImage("star",star)

  empty2 = createSprite(125,50)
  empty2.addImage(empty)
  empty2.scale = 0.1
  empty2.addImage("star",star)
  
  star1 = createSprite(w - 450,100)
  star1.addImage(star)
  star1.scale = 0.03

  star2 = createSprite(w/2-400,h-400)
  star2.addImage(star)
  star2.scale = 0.03
  
}

function draw() 
{
  background(bg);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  

  imageMode(CENTER)

  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,80,80)
  }

  
  
  Engine.update(engine);

  
  
  if(collide(fruit,rabbit,80)==true){
    World.remove(world,fruit)
    consuming.play()
    fruit = null
    rabbit.changeAnimation("eat")

  }

  if(fruit!=null&&fruit.position.y>h-50){
    rabbit.changeAnimation("sad")
    sadness.play()
    fruit = null
    
  }

  if(collide(fruit,star1,40)==true){
    star1.visible = false
    empty1.changeAnimation("star")
    empty1.scale = 0.03

  }

  if(collide(fruit,star2,40)==true){
    star2.visible = false
    empty2.changeAnimation("star")
    empty2.scale = 0.03

  }


  drawSprites()
   
}

function drop(){
rope.break()
link.erase()
cutting.play()

}
function drop2(){
  rope2.break()
  link2.erase()
  cutting.play()
  
  }
  function drop3(){
    rope3.break()
    link3.erase()
    cutting.play()
    
    }

function collide(body,sprite,x){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d <= x){
      
      return true
    }
    else{
      return false
    }
  }
}

function blow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  air.play()
}

function blow2(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.05})
  air.play()
}

function silence(){
  if(bgMusic.isPlaying()){
    bgMusic.stop()
  }
  else{
    bgMusic.play()
  }
}