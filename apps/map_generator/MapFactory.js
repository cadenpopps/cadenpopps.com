function MapFactory() {

    var worldMap;
    var tiles;
    var size;
    // var spread = 15;
    var deepWaterThresh = .2;
    var waterThresh = .5;
    var sandThresh = .55;
    var grassThresh = .7;
    var mountainThresh = .77;
    var iceThresh = 1;

    this.createMap = function(_size) {

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var squareVal = noise(i / spread + seed, j / spread + seed);
                if (squareVal < deepWaterThresh) {
                    tiles[i][j] = new Tile(DEEPWATER, i, j, squareVal);
                }
                else if (squareVal < waterThresh) {
                    tiles[i][j] = new Tile(WATER, i, j, squareVal);
                }
                else if (squareVal < sandThresh) {
                    tiles[i][j] = new Tile(SAND, i, j, squareVal);
                }
                else if (squareVal < grassThresh) {
                    tiles[i][j] = new Tile(GRASS, i, j, squareVal);
                }
                else if (squareVal < mountainThresh) {
                    tiles[i][j] = new Tile(MOUNTAIN, i, j, squareVal);
                }
                else if (squareVal < iceThresh) {
                    tiles[i][j] = new Tile(ICE, i, j, squareVal);
                }
            }
        }

        worldMap = new WorldMap(tiles);

        return worldMap;


    };

}