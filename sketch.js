let WIDTH;
let HEIGHT;
let CLOCK_RADIUS;
let SECOND_RADIUS;
let MINUTE_RADIUS;
let HOUR_RADIUS;
let centerX;
let centerY;
let Digital = document.querySelector("#digital");

let hourHand = 0;
let minuteHand = 0;
let secondHand = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  canvas = createCanvas(WIDTH, HEIGHT);
  const PI = Math.PI;

  const RADIUS = (HEIGHT * 3) / 5;

  CLOCK_RADIUS = RADIUS * 1.1;
  SECOND_RADIUS = RADIUS * 0.5;
  MINUTE_RADIUS = RADIUS * 0.45;
  HOUR_RADIUS = RADIUS * 0.37;
  centerX = WIDTH / 2;
  centerY = HEIGHT / 2;
}

function showSecond(i) {
  noFill();
  stroke(color(255, 0, 0));
  strokeWeight(1);
  var x = Math.cos(i) * SECOND_RADIUS + centerX;
  var y = Math.sin(i) * SECOND_RADIUS + centerY;
  line(centerX, centerY, x, y);
}

function showMinute(i) {
  noFill();
  stroke(0);
  strokeWeight(3);
  var x = Math.cos(i) * MINUTE_RADIUS + centerX;
  var y = Math.sin(i) * MINUTE_RADIUS + centerY;
  line(centerX, centerY, x, y);
}

function showHour(i) {
  noFill();
  stroke(0);
  strokeWeight(6);
  var x = Math.cos(i) * HOUR_RADIUS + centerX;
  var y = Math.sin(i) * HOUR_RADIUS + centerY;
  line(centerX, centerY, x, y);
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  circle(centerX, centerY, CLOCK_RADIUS);
  var h = String(hour());
  var m = minute() >= 10 ? String(minute()) : "0" + String(minute())
  var s = second() >= 10 ? String(second()) : "0" + String(second());

  Digital.textContent = h + " : " + m + " : " + s;
  secondHand = map(second(), 0, 60, 0, PI * 2) - PI / 2;
  minuteHand = map(minute() + norm(second(), 0, 60), 0, 60, 0, PI * 2) - PI / 2;
  hourHand = map(hour() + norm(minute(), 0, 60), 0, 24, 0, PI * 4) - PI / 2;

  showSecond(secondHand);
  showMinute(minuteHand);
  showHour(hourHand);

  strokeWeight(2);
  stroke(0);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = centerX + Math.cos(angle) * SECOND_RADIUS;
    let y = centerY + Math.sin(angle) * SECOND_RADIUS;
    vertex(x, y);
  }
  endShape();
}
