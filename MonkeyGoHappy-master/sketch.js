var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 200, 0, 0);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.05;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  ground = createSprite(0, 300, 800, 200);
  ground.shapeColor = "brown";
  score = 0;

}

function draw() {
  background("green");
  ground.velocityX = -8;

  jump();

  //RESET GROUND
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.collide(ground);

  food();

  spawnobstacle();


  score = Math.round(score + (Math.round(getFrameRate() / 60) / 2))
  textSize = 70;
  stroke("white");
  fill("white");
  text("Survival Time: " + score, 150, 50);

  touch();

  drawSprites();
}

function food() {
  var decideYvalue = Math.round(random(120, 200));
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 0, 20, 20)
    banana.addImage(bananaImage);
    banana.y = decideYvalue;
    banana.lifetime = 135;
    bananaGroup.add(banana);
    banana.scale = 0.05;
    banana.velocityX = -8;
  }

}

function spawnobstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 200, 0, 0);
    obstacle.addImage("obs", obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
  }
}

function jump() {
  if (keyDown("space") && monkey.y >= 175) {
    monkey.velocityY = -8;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
}

function touch() {
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 50;
    text("+50", 200, 200);
  }

  if (monkey.isTouching(obstacleGroup)) {
    score = score - 100;
    textSize = 10;
    text("-100",50 , 100);
    }
  }
