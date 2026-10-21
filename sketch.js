// Haunted Night 
const IMAGE_URL = "hall.jpg";

let img;
let imgLoaded = false;

// background color (changes over time)
let bgR = 25;
let bgRSpeed = 0.3;

// moon
let moonSize = 70;
let moonSpeed = 0.3;

// ghost
let ghostX = 450;
let ghostSpeed = 2;
let ghostAlpha = 255;
let alphaSpeed = 2;

// pumpkin eyes
let eyeHeight = 16;
let eyeSpeed = 0.4;

// pumpkin loop movement
let pumpkinX = 220;
let pumpkinY = 360;
let pumpkinSpeed = 2;
let loopStep = 0;
// 0 = right, 1 = down, 2 = left, 3 = up

async function setup () {
  createCanvas(800, 600);
  try {
    img = await loadImage(IMAGE_URL);
    imgLoaded = true;
  } catch (e) {
    imgLoaded = false;
    console.log("Image failed to load:", IMAGE_URL, e);
  }
}

function draw () {
  // BACKGROUND color change
  bgR = bgR + bgRSpeed;
  if (bgR > 100 || bgR < 25) {
    bgRSpeed = -bgRSpeed;
  }
  background(bgR, 10, 45);

  // 1. MOON grows and shrinks
  moonSize = moonSize + moonSpeed;
  if (moonSize > 100 || moonSize < 70) {
    moonSpeed = -moonSpeed;
  }
  noStroke();
  fill(255, 245, 200);
  circle(130, 120, moonSize);

  // 2. GHOST: moves left and right + fades in and out
  // AI CITATION: This ghost code (movement, fading, and drawing) was written
  // with help from Claude
  // I reviewed it and adjusted it for my sketch.
  //
  // HOW IT WORKS:
  // - ghostX is the ghost's left/right position. Every frame, draw() adds
  //   ghostSpeed to it, so the ghost slides across the screen.
  // - When ghostX goes past 700 or below 400, ghostSpeed is flipped
  //   (2 becomes -2), so the ghost turns around and moves the other way.
  // - ghostAlpha is how see-through the ghost is (255 = solid, 60 = faint).
  //   It changes by alphaSpeed each frame and flips direction at the limits,
  //   so the ghost fades in and out.
  // - The ghost is drawn with an arc for the head, a rect for the body,
  //   and two small circles for the eyes. All use ghostX so they move together.
  ghostX = ghostX + ghostSpeed;
  if (ghostX > 700 || ghostX < 400) {
    ghostSpeed = -ghostSpeed;
  }
  ghostAlpha = ghostAlpha + alphaSpeed;
  if (ghostAlpha > 255 || ghostAlpha < 60) {
    alphaSpeed = -alphaSpeed;
  }
  fill(255, ghostAlpha);
  arc(ghostX, 250, 70, 80, PI, TWO_PI);
  rect(ghostX - 35, 250, 70, 45);
  fill(20, ghostAlpha);
  circle(ghostX - 12, 245, 10);
  circle(ghostX + 12, 245, 10);

  // ground
  fill(10, 5, 15);
  rect(0, 500, width, 100);

  // 3. PUMPKIN moves in a loop & eyes change shape and look side to side
  // Loop path right along the top, down, left along the bottom, up
  if (loopStep === 0) {
    pumpkinX = pumpkinX + pumpkinSpeed;
    if (pumpkinX >= 400) loopStep = 1;
  } else if (loopStep === 1) {
    pumpkinY = pumpkinY + pumpkinSpeed;
    if (pumpkinY >= 440) loopStep = 2;
  } else if (loopStep === 2) {
    pumpkinX = pumpkinX - pumpkinSpeed;
    if (pumpkinX <= 220) loopStep = 3;
  } else {
    pumpkinY = pumpkinY - pumpkinSpeed;
    if (pumpkinY <= 360) loopStep = 0;
  }

  eyeHeight = eyeHeight + eyeSpeed;
  if (eyeHeight > 34 || eyeHeight < 16) {
    eyeSpeed = -eyeSpeed;
  }

  fill(255, 140, 30);
  ellipse(pumpkinX, pumpkinY, 140, 120);
  fill(255, 230, 80);
  ellipse(pumpkinX - 30, pumpkinY - 15, 16, eyeHeight);
  ellipse(pumpkinX + 30, pumpkinY - 15, 16, eyeHeight);
  fill(40, 20, 10);

  fill(255, 230, 80);
  triangle(pumpkinX, pumpkinY + 5, pumpkinX - 8, pumpkinY + 20, pumpkinX + 8, pumpkinY + 20);
  rect(pumpkinX - 25, pumpkinY + 35, 50, 10, 5);

  // IMAGE from GitHub
  if (imgLoaded) {
    imageMode(CENTER);
    image(img, 650, 430, 320, 320 * (img.height / img.width));
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