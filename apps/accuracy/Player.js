function Player() {

    var score = 0;

    this.getScore = function() {
        return score;
    };
    
    this.incrementScore = function() {
        score++;
    };

    this.resetScore = function() {
        score = 0;
    };

}