// Haunted Night

const IMAGE_URL = "https://github.com/Aryan0766/sketch5/blob/66a0883fa1971c2ac9ef5d414de4b11a754a9048/hall.jpg";

let img;
let imgLoaded = false;

// p5 2.x has no preload(); load assets with await inside an async setup()
async function setup() {
  createCanvas(800, 600);
  try {
    img = await loadImage(IMAGE_URL);
    imgLoaded = true;
  } catch (e) {
    imgLoaded = false; // keeps the placeholder box if the link is wrong
  }
}

function draw() {
  // BACKGROUND color changes over time
  let t = (sin(frameCount * 0.01) + 1) / 2;
  background(lerpColor(color(25, 10, 45), color(90, 30, 15), t));

  // 1. MOON grows and shrinks & color shifts
  let moonSize = 80 + sin(frameCount * 0.04) * 15;
  let moonColor = lerpColor(color(255, 245, 200), color(255, 180, 100), t);
  noStroke();
  fill(moonColor);
  circle(130, 120, moonSize);

  // 2. GHOST moves in a circle & fades in and out
  let gx = 550 + cos(frameCount * 0.02) * 70;
  let gy = 250 + sin(frameCount * 0.02) * 40;
  let fade = map(sin(frameCount * 0.03), -1, 1, 60, 255);
  fill(255, fade);
  arc(gx, gy, 70, 80, PI, TWO_PI);
  rect(gx - 35, gy, 70, 45);
  fill(20, fade);
  circle(gx - 12, gy - 5, 10);
  circle(gx + 12, gy - 5, 10);

  // ground
  fill(10, 5, 15);
  rect(0, 500, width, 100);

  // 3. PUMPKIN eyes morph from circle to ellipse
  fill(255, 140, 30);
  ellipse(300, 430, 140, 120);
  let eyeHeight = map(sin(frameCount * 0.05), -1, 1, 16, 34);
  fill(255, 230, 80);
  ellipse(270, 415, 16, eyeHeight);
  ellipse(330, 415, 16, eyeHeight);
  triangle(300, 435, 292, 450, 308, 450);
  rect(275, 465, 50, 10, 5);

  // IMAGE from GitHub
  if (imgLoaded) {
    imageMode(CENTER);
    image(img, 650, 430, 120, 120 * (img.height / img.width));
  } else {
    fill(255, 60);
    rect(590, 370, 120, 120, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text("Add image link\nin sketch.js", 650, 430);
  }

  // title
  fill(255, 140, 30);
  textAlign(CENTER, TOP);
  textSize(28);
  text("Haunted Night", width / 2, 15);
}