function Dot(first) {

    this.x = random(0, width);
    this.y = random(0, height);
    this.lifeTime = dotLife;
    this.size = dotSize;

    this.update = function() {
        this.lifeTime--;
        if (this.lifeTime <= 0) {
            scoreScreen = true;
        }
    };

    this.mouseInside = function() {
        if (dist(mouseX, mouseY, this.x, this.y) < this.size / 2) {
            return true;
        }
        return false;
    };

    this.display = function() {
        stroke(255, this.lifeTime, this.lifeTime);
        strokeWeight(this.size)
        point(this.x, this.y);
        noStroke();
    };
}