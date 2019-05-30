
var fireworks = new Array(10);
var particles = new Array(40);
var obstacles = [];
var alive;
var score;
var millisLost;
var helpTextTimer;

const MOUSESIZE = 10;
const GRAVITY = .001;
const PARTICLE_GRAVITY = GRAVITY * 10;
const RESISTANCE = .998;
const FIREWORK_SPEED = 3;
const PARTICLE_SPEED = 6;
const FIREWORK_SPAWN_DISTANCE = 100;
const SPAWN_RATE = .1;
const MAX_PARTICLES = 8;

var currentFireworkSpeed = FIREWORK_SPEED;

function getRGBValues(str) {
    var vals = str.substring(str.indexOf('(') + 1, str.length - 1).split(', ');
    return {
        'r': vals[0],
        'g': vals[1],
        'b': vals[2]
    };
}

function setup() {
    createCanvas($("#fireworks").width(), $("#fireworks").height(), "fireworks");

    FIREWORKS_COLORS = getRGBValues($('#games').css('background-color'));
    FIREWORKS_COLOR = new Array(3);
    FIREWORKS_COLOR[0] = FIREWORKS_COLORS.r;
    FIREWORKS_COLOR[1] = FIREWORKS_COLORS.g;
    FIREWORKS_COLOR[2] = FIREWORKS_COLORS.b;

    background(FIREWORKS_COLOR[0], FIREWORKS_COLOR[1], FIREWORKS_COLOR[2]);

    mouseX = width / 2;
    mouseY = height / 2 - 50;

    listen('mousemoved');
    listen('mouseclicked');
}

function draw() {

    background(FIREWORKS_COLOR[0], FIREWORKS_COLOR[1], FIREWORKS_COLOR[2]);

    if (canvasX == 0 || mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        deathSequence();
    }
    update();

    for (let o of obstacles) {
        if (o.active) {
            o.display();
        }
    }

    fill(255);
    point(mouseX, mouseY, MOUSESIZE);

}

function checkCollisions() {

    for (let o of obstacles) {
        if (o.active) {
            if (abs(o.getX() - mouseX) < (o.getSize() + MOUSESIZE) * 4 && abs(o.getY() - mouseY) < (o.getSize() + MOUSESIZE) * 4) {
                if (dist(o.getX(), o.getY(), mouseX, mouseY) < o.getSize() + MOUSESIZE) {
                    deathSequence();
                }
            }
        }
    }

    for (let o of obstacles) {
        if (o.active) {
            for (let s of obstacles) {
                if (s != o && s.active) {
                    if (abs(o.getX() - s.getX()) < (o.getSize() + s.getSize()) * 4 && abs(o.getY() - s.getY()) < (o.getSize() + s.getSize()) * 4) {
                        if (dist(o.getX(), o.getY(), s.getX(), s.getY()) < o.getSize() + s.getSize()) {
                            if (!o.isF && o.lifetime > 50) {
                                o.destroy();
                            }
                            if (!s.isF && s.lifetime > 50) {
                                s.destroy();
                            }
                            if (o.isF && s.isF) {
                                if (o.getSize() - 15 > s.getSize()) {
                                    s.requestParticles();
                                    s.destroy();
                                }
                                else if (s.getSize() - 15 > o.getSize()) {
                                    o.requestParticles();
                                    o.destroy();
                                }
                                else {
                                    o.requestParticles();
                                    o.destroy();
                                    s.requestParticles();
                                    s.destroy();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function update() {
    if (alive) {
        if (random(1) < SPAWN_RATE) {
            requestFirework();
        }

        if (frameCount % 300 == 0) {
            currentFireworkSpeed = ((currentFireworkSpeed * 10) + 1) / 10;
        }

        for (var i = fireworks.length - 1; i >= 0; i--) {
            if (fireworks[i].active) {
                fireworks[i].update();
            }
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].active) {
                particles[i].update();
            }
        }
        checkCollisions();
    }
}

function requestFirework() {
    for (let f of fireworks) {
        if (!f.active) {
            f.reset();
            return;
        }
    }
}

function init() {

    $("#fireworksText").css("opacity", "0");
    $("#fireworks").css("cursor", "none");
    $("#fireworks canvas").css("filter", "none");

    obstacles = [];
    currentFireworkSpeed = FIREWORK_SPEED;

    alive = true;
    score = 0;
    millisLost = 0;

    for (var i = 0; i < fireworks.length; i++) {
        fireworks[i] = new Firework();
    }
    for (var i = 0; i < particles.length; i++) {
        particles[i] = new Particle();
    }

    for (let f of fireworks) {
        obstacles.push(f);
    }
    for (let p of particles) {
        obstacles.push(p);
    }

    if (!looping) {
        loop();
    }
}

function deathSequence() {
    $("#fireworksText").css("opacity", "1");
    $("#fireworks").css("cursor", "default");
    $("#fireworks canvas").css("filter", "brightness(70%)");

    millisLost = millis();
    alive = false;

    noLoop();
}

function keyPressed() {
    if (!alive) {
        init();
    }
}

function mouseClicked() {
    if (!alive) {
        init();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(5, 5, 5);
}


function Firework() {

    this.isF = true;
    var pos = createVector(0, -100);
    var vel = createVector();
    var acc = createVector();
    var size = 0;
    var particleCounter = 0;
    var timer = 0;
    this.exploded = false;
    this.active = false;
    this.col = new Array(3);

    this.reset = function () {
        timer = random(10, 30);
        var yOff = random(100);
        pos.x = random(mouseX - FIREWORK_SPAWN_DISTANCE, mouseX + FIREWORK_SPAWN_DISTANCE);
        pos.y = height + 50 + yOff;
        vel.set(((mouseX - pos.x) / 500) + random(-.2, .2), (mouseY - pos.y) / 400 + random(-1, 0));
        vel.mult(currentFireworkSpeed);
        size = random(3, 8);
        particleCounter = 0;
        this.exploded = false;
        this.active = true;
    };

    this.getX = function () {
        return pos.x;
    }
    this.getY = function () {
        return pos.y;
    }
    this.getSize = function () {
        return size;
    }

    this.requestParticles = function () {
        for (let p of particles) {
            if (particleCounter < MAX_PARTICLES && particleCounter < size / 3) {
                if (!p.active) {
                    particleCounter++;
                    p.reset(size, pos.x, pos.y, this.col);
                }
            }
            else {
                break;
            }
        }
    };

    this.update = function () {
        if (!this.exploded) {
            acc.y += GRAVITY;
            vel.x *= RESISTANCE;
            vel.y *= RESISTANCE;
            applyForces(pos, vel, acc);
            if (vel.y > 1) {
                timer--;
                if (timer <= 0) {
                    this.requestParticles();
                    this.destroy();
                }
            }
        }
    };

    this.destroy = function () {
        pos.x = -100;
        pos.y = -100;
        vel = createVector();
        acc = createVector();
        size = 0;
        particleCounter = 0;
        this.exploded = true;
        this.active = false;
        this.lifetime = 0;
    };

    this.display = function () {
        if (!this.exploded) {
            fill(255, 255, 255);
            point(pos.x, pos.y, size);
        }
    };
};


function Particle() {

    this.isF = false;
    this.parentSize = 0;
    this.size = 0;
    this.lifetime = 0;
    this.x = 0;
    this.y = height + 100;
    this.velx = 0;
    this.vely = 0;
    this.active = false;
    this.col = new Array(3);

    this.reset = function (_parentSize, _x, _y, _col) {
        this.parentSize = _parentSize;
        this.size = this.parentSize / (random(2, 3)) + 1;
        if (this.size < 2) {
            this.size = 2;
        }
        this.lifetime = 0;
        this.x = _x;
        this.y = _y;
        var velXMult = random(-PARTICLE_SPEED, PARTICLE_SPEED);
        var velYMult = random(-PARTICLE_SPEED, 2);
        this.velx = (1 / this.size) * velXMult;
        this.vely = (1 / this.size) * velYMult;
        this.active = true;
        this.col[0] = _col[0];
        this.col[1] = _col[1];
        this.col[2] = _col[2];
        if (this.size < 2) {
            this.active = false;
        }
    };

    this.getX = function () {
        return this.x;
    }
    this.getY = function () {
        return this.y;
    }

    this.getSize = function () {
        return this.size;
    }

    this.destroy = function () {
        this.active = false;
    }

    this.update = function () {

        this.vely += PARTICLE_GRAVITY;

        this.velx *= RESISTANCE;
        this.vely *= RESISTANCE;

        this.x += this.velx;
        this.y += this.vely;

        this.lifetime++;

        if (abs(this.velx) < .05 && abs(this.vely) < .05 || this.size < .3) {
            this.destroy();
        }

        if (this.lifetime % 10 == 1) {
            this.size -= .2;
        }

    };

    this.display = function () {
        fill(220, 220, 220);
        point(this.x, this.y, this.size);
    };

}