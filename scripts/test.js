var fr = 60;

function setup() {
  createCanvas(640, 480);
  frameRate(fr);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(0,200,255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}