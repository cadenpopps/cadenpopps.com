function Boundary() {
    this.x = width / 2;
    this.y = height / 2;
    this.vel = createVector();
    this.acc = createVector();
    this.target = createVector(width / 2, height / 2);
    this.radius = 100;

    var red = 150;

    this.update = function() {

        this.vel.mult(.95);

        var attract = createVector(this.target.x, this.target.y);

        attract.x -= this.x;
        attract.y -= this.y;
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.add(this.acc);
        this.acc = attract.mult(.001);

        if (random(1) < .2) {
            this.target.x += random(-100, 100);
            this.target.y += random(-100, 100);

            if (this.target.x < this.radius) {
                this.target.x = this.radius * 2;
            }
            else if (this.target.x > width - this.radius) {
                this.target.x = width - this.radius * 2;
            }
            if (this.target.y < this.radius) {
                this.target.y = this.radius * 2;
            }
            else if (this.target.y > height - this.radius) {
                this.target.y = height - this.radius * 2;
            }
        }
    };

    this.checkMouse = function() {
        if (dist(mouseX, mouseY, this.x, this.y) > this.radius / 2) {
            return false;
        }
        red = abs(sin(millis() / 500) * 100) + 150;
        return true;
    };

    this.display = function() {
        fill(red, 20, 50);
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}