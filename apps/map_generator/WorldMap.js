function WorldMap() {

    var tiles;
    // var tileWidth = width / 160;
    // var tileHeight = height / 90;
    var spread = 20;
    var zoom = 1;
    var zoomUpperThresh = 1.5;
    var zoomLowerThresh = .75;
    var x = floor(random(-50000, 50000));
    var y = floor(random(-50000, 50000));

    var deepWaterThresh = .2;
    var waterThresh = .4;
    var sandThresh = .5;
    var grassThresh = .65;
    var lowerMountainThresh = .75;
    var mountainThresh = .85;
    var iceThresh = 1;

    this.getTileLength = function() {
        return tiles.length * tiles[0].length;
    };

    this.incZoom = function() {
        zoom *= 1.2;
        spread *= 1.2;
        x += (detailLevel / 10) / spread;
        y += (detailLevel / 20) / spread;
        this.updateTileSize();
    };

    this.decZoom = function() {
        zoom *= .8;
        spread *= .8;
        x -= (detailLevel / 10) / spread;
        y -= (detailLevel / 20) / spread;
        this.updateTileSize();
    };

    this.incX = function() {
        if (x < 500000) {
            x += (detailLevel / 5) / spread;
            this.updateTiles();
        }
    };

    this.decX = function() {
        if (x > -500000) {
            x -= (detailLevel / 5) / spread;
            this.updateTiles();
        }
    };

    this.incY = function() {
        if (y < 500000) {
            y += (detailLevel / 5) / spread;
            this.updateTiles();
        }
    };

    this.decY = function() {
        if (y > -500000) {
            y -= (detailLevel / 5) / spread;
            this.updateTiles();
        }
    };

    this.incDetail = function() {
        detailLevel = round(detailLevel * 1.2);
        zoom *= 1.2;
        spread *= 1.2;
        this.updateTileSize();
    };

    this.decDetail = function() {
        detailLevel = round(detailLevel * .8);
        zoom *= .8;
        spread *= .8;
        this.updateTileSize();
    };

    this.getX = function() {
        return floor(x);
    };

    this.getY = function() {
        return floor(y);
    };

    this.getZoom = function() {
        return floor(zoom * 100);
    };

    this.updateTileSize = function() {
        tiles = new Array(detailLevel);
        for (var i = 0; i < tiles.length; i++) {
            tiles[i] = new Array(detailLevel);
        }
        this.updateTiles();
    };

    this.updateTiles = function() {
        for (var i = 0; i < tiles.length; i++) {
            for (var j = 0; j < tiles[i].length; j++) {
                var squareVal = noise(x + (i / spread), y + (j / spread));
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
                else if (squareVal < lowerMountainThresh) {
                    tiles[i][j] = new Tile(LOWERMOUNTAIN, i, j, squareVal);
                }
                else if (squareVal < mountainThresh) {
                    tiles[i][j] = new Tile(MOUNTAIN, i, j, squareVal);
                }
                else if (squareVal < iceThresh) {
                    tiles[i][j] = new Tile(ICE, i, j, squareVal);
                }
            }
        }
        redraw();
    };

    this.display = function() {
        for (var i = 0; i < tiles.length; i++) {
            for (var j = 0; j < tiles[i].length; j++) {
                tiles[i][j].display(width / tiles.length);
            }
        }
    };

}