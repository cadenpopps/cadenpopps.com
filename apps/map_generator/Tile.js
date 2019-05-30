function Tile(_tileType, _x, _y, _exactVal) {

    var tileType = _tileType;
    var exactVal = map(_exactVal, 0, 1, 70, 255);
    // var exactVal = 255;
    var x = _x;
    var y = _y;

    this.display = function(tileSize) {
        switch (tileType) {
            case DEEPWATER:
                fill(0, 20, 200, exactVal);
                break
            case WATER:
                fill(0, 0, 255, exactVal);
                break;
            case SAND:
                fill(200, 150, 100, exactVal);
                break;
            case GRASS:
                fill(0, 150, 20, exactVal * 1.1);
                break;
            case MOUNTAIN:
                fill(100, 70, 103, exactVal);
                break;
            case ICE:
                fill(200, 170, 230, exactVal);
                break;
            case LOWERMOUNTAIN:
                fill(150, 130, 120, exactVal);
                break;
            case YELLOWFLOWER:
                fill(200, 200, 20, exactVal);
                break;
            case ROCK:
                fill(100, 70, 103, exactVal);
                break;
        }
        // tileSize *= 2;
        // rect(x * tileSize, y * tileSize, tileSize * (exactVal / 150), tileSize * (exactVal / 150));
        // stroke(0);
        rect(x * tileSize, y * tileSize, tileSize, tileSize);

    };
}