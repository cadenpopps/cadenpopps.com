var worldMap;
var mapFactory;
var startScreen;
var mapSize;

var detailLevel = 50;

const DEEPWATER = -1;
const WATER = 0;
const SAND = 1;
const GRASS = 2;
const MOUNTAIN = 3;
const ICE = 4;
const LOWERMOUNTAIN = 5;
const YELLOWFLOWER = 6;
const ROCK = 7;


function setup() {
    createCanvas(windowWidth, windowHeight);

    startScreen = false;
    noLoop();
    stroke(0);
    strokeWeight(.5);
    // noStroke();

    textSize(20);
    textAlign(CENTER);

    init();
}

function draw() {

    background(0);
    worldMap.display();

    fill(0, 150);
    rect(width / 3, height - 75, width / 3, 40);
    fill(255);
    text("X: " + worldMap.getX() + ",  Y: " + worldMap.getY() + ",  Zoom: " + worldMap.getZoom() + "%", width / 2, height - 50);

}

function init() {
    worldMap = new WorldMap();
    worldMap.updateTileSize();
    worldMap.updateTiles();
}

function keyPressed() {
    if (keyCode == 68) {
        worldMap.incX();
    }
    else if (keyCode == 87) {
        worldMap.decY();
    }
    else if (keyCode == 65) {
        worldMap.decX();
    }
    else if (keyCode == 83) {
        worldMap.incY();
    }
    else if (keyCode == 187) {
        worldMap.incDetail();
    }
    else if (keyCode == 189) {
        worldMap.decDetail();
    }
}

function mousePressed() {

}

function mouseWheel(event) {
    if (event.delta < 0) {
        worldMap.incZoom();

    } else {
        worldMap.decZoom();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    worldMap.updateTileSize();
}
