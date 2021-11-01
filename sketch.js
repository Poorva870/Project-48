var road, roadImg;
var car, carImg;
var edges;
var obstacle1Img, obstacle2Img;
var stoneImg;
var fuel, fuelImg, fuelG;
var coin, coinImg, coinG;
var obstacle, obstacleG;
var stumpImg;
var collideS, collectS;
var gameState = "play";
var heartImg1,heartImg2,heartImg3;
var heart1,heart2,heart3;
var life = 3;
var score = 0;
var collFuel = 20;
var blast, blastImg;
var gameOver,gameOverImg;

function preload() {
  roadImg = loadImage("Images/Road.png");
  carImg = loadImage("Images/Car.png");
  stoneImg = loadImage("Images/stone.png");
  obstacle1Img = loadImage("Images/obstacle1.png");
  obstacle2Img = loadImage("Images/obstacle2.png");
  fuelImg = loadImage("Images/fuel.png");
  stumpImg = loadImage("Images/stump.png");
  coinImg = loadImage("Images/coin.png");
  collectS = loadSound("collect.wav");
  collideS = loadSound("collide.wav");
  heartImg1 = loadImage("Images/heart1.png");
  heartImg2 = loadImage("Images/heart2.png");
  heartImg3 = loadImage("Images/heart3.png");
  blastImg = loadImage("Images/blast.png");
  gameOverImg=loadImage("Images/gameover.png");
}

function setup() {
  createCanvas(800, windowHeight);
  road = createSprite(400, 200, 50, 50);
  road.addImage("road", roadImg);
  road.scale = 0.48;

  car = createSprite(400, 700, 50, 50);
  car.addImage("carRunning", carImg);
  car.addImage("carBlast", blastImg);
  car.scale = 0.27;
  car.debug = false;
  car.setCollider("rectangle", 0, 0, 225, 600);

  gameOver=createSprite(400,200,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;

  heart1 = createSprite(680,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heartImg1);
  heart1.scale = 0.2;

  heart2 = createSprite(660,40,20,20);
  heart2.visible=false
  heart2.addImage("heart2",heartImg2);
  heart2.scale = 0.2;

  heart3= createSprite(640,40,20,20);
  heart3.visible=true;
  heart3.addImage("heart3",heartImg3);
  heart3.scale = 0.2;

  obstacleG = new Group();
  coinG = new Group();
  fuelG = new Group();

  edges = createEdgeSprites();
}

function draw() {
  background(0);

  if (gameState === "play") {
    road.velocityY = 12;

    if(life ===3){
      heart3.visible=true;
      heart1.visible=false;
      heart2.visible=false;
    }
 
    if(life ===2){
     heart3.visible=false;
     heart1.visible=false;
     heart2.visible=true;
   }
 
   if(life ===1){
     heart3.visible=false;
     heart1.visible=true;
     heart2.visible=false;
   }

    if (keyDown("Right_Arrow")) {
      car.x = car.x + 15;
    }

    if (keyDown("Left_Arrow")) {
      car.x = car.x - 15;
    }

    if (keyDown("Up_Arrow")) {
      car.y = car.y - 6;
    }

    if (keyDown("Down_Arrow")) {
      car.y = car.y + 6;
    }

    if (road.y > 400) {
      road.y = 300;
    }

    car.collide(edges);

    spawnObstacles();
    spawnCoins();

    if (coinG.isTouching(car)) {
      collectS.play();
      score = score+5;
      coinG.destroyEach();
    }

    if (fuelG.isTouching(car)) {
      collectS.play();
      collFuel = collFuel+20;
      fuelG.destroyEach();
    }

    if (obstacleG.isTouching(car)) {
      collideS.play();
      life = life-1;
      obstacleG.destroyEach();
    }

    if(life===0){
      heart3.visible = false;
      heart1.visible = false;
      heart2.visible = false;
      gameState = "end";
    }

    if(collFuel===0){
      gameState = "end";
    }

  } else if (gameState === "end") {
    road.velocityY = 0;
    collFuel = 0;
    gameOver.visible = true;
    car.changeImage("carBlast", blastImg);
    obstacleG.setVelocityYEach(0);
    fuelG.setVelocityYEach(0);
    coinG.setVelocityYEach(0);
  }

  if (frameCount % 250 === 0) {
    collFuel = collFuel-5;
  }

  drawSprites();
  fill(255)
  textSize(20)
  text("Score: " + score, 580, 100);

  fill(225)
  textSize(20)
  text("Fuel: " + collFuel, 30, 50);
  text("liter", 110, 50);
}

function spawnObstacles() {
  if (frameCount % 220 === 0) {
    obstacle = createSprite(random(100, 700), -100, 50, 50);
    obstacle.velocityY = 10;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle1Img);
        obstacle.scale = 0.04;
        break;
      case 2:
        obstacle.addImage("stone", stoneImg);
        obstacle.scale = 0.1;
        break;
      case 3:
        obstacle.addAnimation("obstacle2", obstacle2Img);
        obstacle.scale = 0.04;
        break;
      case 4:
        obstacle.addImage("stump", stumpImg);
        obstacle.scale = 0.3;
        break;

      default:
        break;
    }
    obstacleG.add(obstacle);
    obstacle.lifetime = 800;
  }

  if (frameCount % 340 === 0) {
    obstacle = createSprite(random(100, 700), -100, 50, 50);
    obstacle.velocityY = 10;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle1Img);
        obstacle.scale = 0.04;
        break;
      case 2:
        obstacle.addImage("stone", stoneImg);
        obstacle.scale = 0.1;
        break;
      case 3:
        obstacle.addAnimation("obstacle2", obstacle2Img);
        obstacle.scale = 0.04;
        break;
      case 4:
        obstacle.addImage("stump", stumpImg);
        obstacle.scale = 0.3;
        break;

      default:
        break;
    }
    obstacleG.add(obstacle);
    obstacle.lifetime = 800;
  }

  if (frameCount % 440 === 0) {
    obstacle = createSprite(random(100, 700), -100, 50, 50);
    obstacle.velocityY = 12;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage("obstacle1", obstacle1Img);
        obstacle.scale = 0.04;
        break;
      case 2:
        obstacle.addImage("stone", stoneImg);
        obstacle.scale = 0.1;
        break;
      case 3:
        obstacle.addAnimation("obstacle2", obstacle2Img);
        obstacle.scale = 0.04;
        break;
      case 4:
        obstacle.addImage("stump", stumpImg);
        obstacle.scale = 0.3;
        break;

      default:
        break;
    }
    obstacleG.add(obstacle);
    obstacle.lifetime = 800;
  }
}

function spawnCoins() {
  if (frameCount % 200 === 0) {
    coin = createSprite(random(100, 700), -100, 50, 50);
    coin.velocityY = 6;
    coin.addImage(coinImg);
    coin.scale = 0.07;
    coin.lifetime = 800;
    coinG.add(coin);
    
  }

  if (frameCount % 600 === 0) {
    fuel = createSprite(random(100, 700), -100, 50, 50);
    fuel.velocityY = 6;
    fuel.addImage(fuelImg);
    fuel.scale = 0.02;
    fuel.lifetime = 800;
    fuelG.add(fuel);
  }

}
