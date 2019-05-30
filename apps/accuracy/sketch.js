var startScreen;
var scoreScreen;
var boundary;
var font;
var dots;
var mode;
var mode0Countdown;

var dotLife = 255;
var dotSize = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    textAlign(CENTER);

    startScreen = true;
    player = new Player();

    mode = 0;
    textFont('monospace');

    init();
}

function draw() {

    background(5);

    if (startScreen) {
        displayStartScreen();
    }
    else if (scoreScreen) {
        displayScoreScreen();
    }
    else {
        displayGame();
    }

    fill(240);
    ellipse(mouseX, mouseY, 10, 10);

    update();
}

function init() {
    startScreen = true;
    scoreScreen = false;
    mode0Countdown = -1;
    player.resetScore();
}

function initMode0() {
    if (mode == 0) {
        boundary = new Boundary();
    }
}

function initMode1() {
    if (mode == 1) {
        dots = [];
    }
}

function update() {
    if (!startScreen && !scoreScreen) {
        if (mode == 0) {
            boundary.update();
            if (!boundary.checkMouse()) {
                scoreScreen = true;
            } else {
                player.incrementScore();
            }
        }
        else if (mode == 1) {
            for (let d of dots) {
                d.update();
            }
            if (random(1) < .01) {
                dots.push(new Dot());
            }
        }
    }
    else if (startScreen && mode == 0) {
        if (mode0Countdown == -1) {
            if (dist(mouseX, mouseY, width / 2, height / 2) < 50) {
                mode0Countdown = 89;
            }
        }
        else {
            if (dist(mouseX, mouseY, width / 2, height / 2) < 50) {
                mode0Countdown--;
                if (mode0Countdown <= 0) {
                    startScreen = false;
                    initMode0();
                }
            }
            else {
                mode0Countdown = -1;
            }
        }
    }
}

function mousePressed() {

    if (startScreen) {
        if (mode == 1) {
            if (dist(mouseX, mouseY, width / 2, height / 2) < 25) {
                startScreen = false;
                initMode1();
            }
        }
    }
    else if (scoreScreen) {
        init();
    }
    else {
        if (mode == 1) {
            scoreScreen = true;
            for (var i = dots.length - 1; i >= 0; i--) {
                if (abs((mouseX - dots[i].x) + (mouseY - dots[i].y)) < dots[i].size / 1.5) {
                    if (dots[i].mouseInside()) {
                        dots[i] = null;
                        dots.splice(i, 1);
                        player.incrementScore();
                        scoreScreen = false;
                    }
                }
            }
        }
    }
}

function keyPressed() {
    if (startScreen) {
        if (keyCode == 32) {
            mode ^= 1;
        }
    }
}

function displayStartScreen() {
    fill(240);
    if (mode == 0) {
        if (mode0Countdown == -1) {
            textSize(width / 15);
            text("Stay inside the circle", width / 2, height / 6);
        }
        else {
            textSize(width / 10);
            text(floor((mode0Countdown) / 30) + 1, width / 2, height / 5);
        }
        fill(150, 20, 50);
        ellipse(width / 2, height / 2, 100, 100);
    }
    else if (mode == 1) {
        textSize(width / 15);
        text("Click the circles", width / 2, height / 6);
        stroke(255);
        strokeWeight(dotSize);
        point(width / 2, height / 2);
        noStroke();
    }

    fill(240);
    textSize(width / 30);
    text("Press space to switch mode", width / 2, height - (height / 15));
}

function displayScoreScreen() {
    fill(240);
    if (mode == 0) {
        textSize(width / 15);
        text("Your score was " + player.getScore(), width / 2, height / 2);
    }
    else if (mode == 1) {
        textSize(width / 15);
        text("You clicked " + player.getScore() + " dots", width / 2, height / 2);
    }

    textSize(width / 30);
    text("Click to try again", width / 2, height - (height / 3));
}

function displayGame() {
    if (mode == 0) {
        boundary.display();
    }
    else if (mode == 1) {
        for (let d of dots) {
            d.display();
        }
    }
    fill(240);
    textSize(width/30);
    text("Score: " + player.getScore(), width / 2, height - (height / 15));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
