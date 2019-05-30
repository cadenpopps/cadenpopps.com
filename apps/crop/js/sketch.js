var canvas;

var userImage;
var tempImage;
var zoom = .7;

var origPos;
var endPos;
var dragging = ' ';

const BARSIZE = 10;
const ELLIPSESIZE = 70;

function preload() {

}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	textFont('Monospace');
	noStroke();
}

function draw() {
	background(100);
	if (userImage) {
		if (dragging != ' ') {
			background(200);
		}

		// image(userImage, (width / 2) - ((userImage.width / 2) * zoom), (height / 2) - ((userImage.height / 2) * zoom), (userImage.width * zoom), (userImage.height * zoom));
		image(tempImage, (width / 2) - ((tempImage.width / 2) * zoom), (height / 2) - ((tempImage.height / 2) * zoom), (tempImage.width * zoom), (tempImage.height * zoom));

		displayCropBars();
		displayCropCircles();
		updateInfo();
	}

	// else {
	// 	uploadForm();
	// }

}

// function uploadForm(){
// 	document.getElementById("image-file").value();
// }

function displayCropBars() {
	fill(0, 150);
	//top
	rect((width / 2) - ((tempImage.width / 2) * zoom), (height / 2) - ((tempImage.height / 2) * zoom) - BARSIZE, (tempImage.width * zoom), BARSIZE);
	//bottom
	rect((width / 2) - ((tempImage.width / 2) * zoom), (height / 2) + ((tempImage.height / 2) * zoom), (tempImage.width * zoom), BARSIZE);
	//left
	rect((width / 2) - ((tempImage.width / 2) * zoom) - BARSIZE, (height / 2) - ((tempImage.height / 2) * zoom), BARSIZE, (tempImage.height * zoom));
	//right
	rect((width / 2) + ((tempImage.width / 2) * zoom), (height / 2) - ((tempImage.height / 2) * zoom), BARSIZE, (tempImage.height * zoom));

	if (dragging == 'u') {
		if (mouseY - origPos > 0) {
			rect((width / 2) - ((tempImage.width / 2) * zoom), (height / 2) - ((tempImage.height / 2) * zoom) - (BARSIZE / 4) + (mouseY - origPos), (tempImage.width * zoom), BARSIZE / 4);
		}
	}
	else if (dragging == 'd') {
		if (mouseY - origPos < 0) {
			rect((width / 2) - ((tempImage.width / 2) * zoom), (height / 2) + ((tempImage.height / 2) * zoom) + (BARSIZE / 4) + (mouseY - origPos), (tempImage.width * zoom), BARSIZE / 4);
		}
	}
	else if (dragging == 'l') {
		if (mouseX - origPos > 0) {
			rect((width / 2) - ((tempImage.width / 2) * zoom) - (BARSIZE / 4) + (mouseX - origPos), (height / 2) - ((tempImage.height / 2) * zoom), BARSIZE / 4, (tempImage.height * zoom));
		}
	}
	else if (dragging == 'r') {
		if (mouseX - origPos < 0) {
			rect((width / 2) + ((tempImage.width / 2) * zoom) + (BARSIZE / 4) + (mouseX - origPos), (height / 2) - ((tempImage.height / 2) * zoom), BARSIZE / 4, (tempImage.height * zoom));
		}
	}

}

function displayCropCircles() {
	fill(255, 200);
	//top
	ellipse((width / 2), (height / 2) - ((tempImage.height / 2) * zoom) - (BARSIZE / 2), ELLIPSESIZE);
	//bottom
	ellipse((width / 2), (height / 2) + ((tempImage.height / 2) * zoom) + (BARSIZE / 2), ELLIPSESIZE);
	//left
	ellipse((width / 2) - ((tempImage.width / 2) * zoom) - (BARSIZE / 2), (height / 2), ELLIPSESIZE);
	//right
	ellipse((width / 2) + ((tempImage.width / 2) * zoom) + (BARSIZE / 2), (height / 2), ELLIPSESIZE);
}

function updateInfo() {
	$('#zoom').text("Zoom: " + floor(zoom * 100));
	$('#curwidth').text("Current Width: " + tempImage.width);
	$('#curheight').text("Current Height: " + tempImage.height);
	$('#orgwidth').text("Original Width: " + userImage.width);
	$('#orgheight').text("Original Height: " + userImage.height);
}

function cropTop(amount) {
	if (amount < tempImage.height) {
		tempImage = tempImage.get(0, amount, tempImage.width, tempImage.height - amount);
	}
}

function cropBottom(amount) {
	if (amount < tempImage.height) {
		tempImage = tempImage.get(0, 0, tempImage.width, tempImage.height - amount);
	}
}

function cropLeft(amount) {
	if (amount < tempImage.width) {
		tempImage = tempImage.get(amount, 0, tempImage.width - amount, tempImage.height);
	}
}

function cropRight(amount) {
	if (amount < tempImage.width) {
		tempImage = tempImage.get(0, 0, tempImage.width - amount, tempImage.height);
	}
}

function mousePressed() {
	if (userImage) {
		if (dist(mouseX, mouseY, width / 2, (height / 2) - ((tempImage.height / 2) * zoom) - (BARSIZE / 2)) < ELLIPSESIZE / 2) {
			dragging = 'u';
			origPos = (height / 2) - ((tempImage.height / 2) * zoom) - (BARSIZE / 2);
		}
		else if (dist(mouseX, mouseY, width / 2, (height / 2) + ((tempImage.height / 2) * zoom) + (BARSIZE / 2)) < ELLIPSESIZE / 2) {
			dragging = 'd';
			origPos = (height / 2) + ((tempImage.height / 2) * zoom) + (BARSIZE / 2);
		}
		else if (dist(mouseX, mouseY, (width / 2) - ((tempImage.width / 2) * zoom) - (BARSIZE / 2), height / 2) < ELLIPSESIZE / 2) {
			dragging = 'l';
			origPos = (width / 2) - ((tempImage.width / 2) * zoom) - (BARSIZE / 2);
		}
		else if (dist(mouseX, mouseY, (width / 2) + ((tempImage.width / 2) * zoom) + (BARSIZE / 2), height / 2) < ELLIPSESIZE / 2) {
			dragging = 'r';
			origPos = (width / 2) + ((tempImage.width / 2) * zoom) + (BARSIZE / 2);
		}
	}
}

function mouseReleased() {
	if (userImage) {
		if (dragging != ' ') {
			if (dragging == 'u') {
				endPos = mouseY;
				if (endPos - origPos > 0) {
					cropTop(floor((endPos - origPos) / zoom));
				}
				else {
					console.log('error');
				}
			}
			else if (dragging == 'd') {
				endPos = mouseY;
				if (endPos - origPos < 0) {
					cropBottom(floor(abs(endPos - origPos) / zoom));
				}
				else {
					console.log('error');
				}
			}
			else if (dragging == 'l') {
				endPos = mouseX;
				if (endPos - origPos > 0) {
					cropLeft(floor((endPos - origPos) / zoom));
				}
				else {
					console.log('error');
				}
			}
			else if (dragging == 'r') {
				endPos = mouseX;
				if (endPos - origPos < 0) {
					cropRight(floor(abs(endPos - origPos) / zoom));
				}
				else {
					console.log('error');
				}
			}
		}

		dragging = ' ';
	}
}

function mouseWheel(event) {
	if (zoom <= 10 && zoom >= .1) {
		zoom = constrain(zoom + (-event.delta / 500), .1, 10);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
