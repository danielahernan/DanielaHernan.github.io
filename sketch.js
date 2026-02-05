                //Array to hold petals
let petals = [];

             //Timer with limit of 60 seconds
let elapsedSeconds = 0;
let loopCount = 0;
let loopStartMillis = 0;
       //Position of rose
let roseX = 0;
let roseY = -40;
let roseZ = 0;
                //Base that holds stem
let baseCenterY = 160;
let baseHeight = 25;
let baseTopY = baseCenterY - baseHeight / 2;
let petalLandingY = baseTopY - 1;


function setup() {
  createCanvas(400, 400, WEBGL);
  
                // 60 petals
  for (let i = 0; i < 60; i++) {
    //make a new petal at 0,0, with a random rotation
    petals.push(new Petal());
  }
                // first loop of timer
  loopStartMillis = millis();
}

function draw() {
  background(45, 30, 20);
                //Lighting
  ambientLight(100, 70, 50);
  pointLight(255, 215, 140, 0, -200, 200);
  pointLight(255, 230, 100, 0, -150, 150);
 
  
                // stem of flower
  push();
  translate(0, 60, 0);
  fill("green");
  noStroke();
  cylinder(7, 200);
  pop();
  
            // one sec per one petal TIMER
  let loopSecond = floor((millis() - loopStartMillis) / 1000);
  loopSecond = constrain(loopSecond, 0, 59);
  for (let i = 0; i <= loopSecond && i < petals.length; i++) {
    if (!petals[i].falling && petals[i].y === roseY) {
      petals[i].falling = true;
    }
  }
    
  print("Timer: " + nf(loopSecond + 1, 2) + "s");
  
  drawBase();
  
            //draw each petal
  for (let i = 0; i < petals.length; i++) {
    petals[i].draw();
  }
  
  drawGlassDome();

  if (petals.every(p => !p.falling && p.y === petalLandingY)) {
    resetTimer();
  }
}

function resetTimer() {
  loopCount++;
  loopStartMillis = millis();
  
  for (let i = 0; i < petals.length; i++) {
    petals[i].y = roseY;
    petals[i].falling = false;
    petals[i].angle = random(360);
  }
  print("--Timer Restarted-- Loop #" + loopCount);
}

function Petal() {
  this.x = random(-25, 25);
  this.y = roseY;
  this.z = random(-25, 25);
  //rotate of petal
  this.angle = random(360);
  this.falling = false;
  this.fill = color(170, 0, 0, 180); //half transparent red for testing
  //perhaps vary the hue/luminance slightly or use a gradient (example: https://editor.p5js.org/jeffThompson/sketches/ta7msUszJ)
  this.stroke = color(60);
  this.fallSpeed = 2;
  

  this.draw = function () {
    push();
                    //attach petals to base of stem
    translate(this.x, this.y, this.z);
    rotateZ(this.angle);
    fill(this.fill);
    noStroke();
    arc(0, 0, 60, 50, 0, 180, PIE);
    pop();
    
    if (this.falling) this.fall();

  };
  
  /* commented out; figure out under what conditions a petal should fall.  
  if (???){
    this.fall()
  } */

  this.fall = function () {
   if (this.y < petalLandingY) {
     this.y += this.fallSpeed;
     this.angle += 0.02;
   } else {
     this.y = petalLandingY;
     this.falling = false;
   }

    /*
    ok, well, this.y should definitely go up (which means draw it lower in the canvas)
    but maybe it should move to the side as well? and/or rotate as it falls? */
  }; //end of this.fall
  
}//end of Petal

                     //base//
function drawBase() {
  push();
  translate(0, baseCenterY, 0);
  fill(70, 40, 20);
  noStroke();
  cylinder(150, baseHeight);
  pop();
}

                      //Glass Dome//

function drawGlassDome() {
  push();
  
  translate(0, baseTopY, 0);
  
  let domeHeight = 220;
  let domeRadius = 150;
  
  push();
  scale(1, 1.3, 1);
  translate(0, -domeHeight / 2, 0);
  
  fill(180, 210, 255, 40);
  
  strokeWeight(2);
  specularMaterial(200, 220, 255, 50);
  shininess(120);
  
  cylinder(domeRadius, domeHeight, 64, 1, true);
  pop();

  
  push();
  stroke(220, 235, 255, 180);
  strokeWeight(2);
  noFill();
  cylinder(domeRadius, 5, 64, 1, true);
  pop();
 
  pop();
  //heck yeah!!!!!!!!///////
}