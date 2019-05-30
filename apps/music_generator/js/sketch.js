var canvas;
var note1;
var note2;
var note3;
var note4;
var notes = [60, 64, 67];

var timer = 0;
var timerInt = 15;

var running = true;

const NOTESIZE = 100;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	noStroke();

	note1 = new p5.Oscillator('triangle');
	note1.playing = false;
	note2 = new p5.Oscillator('sawtooth');
	note3 = new p5.Oscillator('sawtooth');
	note4 = new p5.Oscillator('square');

}

function draw() {
	background(255, 10);

	if (running) {

		if (timer == timerInt / 2) {

		}

		if (timer == timerInt) {

			var playC = random(1);
			var playE = random(1);
			var playG = random(1);

			fill(255, 50, 50);

			if (frameCount % 60 < 30) {
				rect(width - 200 - NOTESIZE, 1 * (height / 4) - NOTESIZE, NOTESIZE * 2, NOTESIZE * 2);
				note1.start();
			}
			if (frameCount % 60 < 5 || frameCount % 240 > 230) {
				rect(width - 200 - NOTESIZE, 2 * (height / 4) - NOTESIZE, NOTESIZE * 2, NOTESIZE * 2);
				note2.start();
			}
			if (frameCount % 70 == 1) {
				rect(width - 200 - NOTESIZE, 3 * (height / 4) - NOTESIZE, NOTESIZE * 2, NOTESIZE * 2);
				note3.start();
			}
			if (frameCount % 30 < 10) {
				// rect(width - 200 - NOTESIZE, 3 * (height / 4) - NOTESIZE, NOTESIZE * 2, NOTESIZE * 2);
				note4.start();
			}

			timer = 0;

			if (random(1) < .5) {
				note1.stop(timerInt / 120);
				note2.stop(timerInt / 120);
				note3.stop(timerInt / 120);
			}
			else {
				note1.stop(timerInt / 80);
				note2.stop(timerInt / 80);
				note3.stop(timerInt / 80);
			}

			note4.stop(timerInt / 240);
		}

		timer++;
	}
	else {
		note1.stop();
		note2.stop();
		note3.stop();
	}

}

function play(note, frames) {
	if (note1.)
		note1.start();
	note1.stop(frames / 60);
}

function mousePressed() {
	running = !running;
}

function windowResized() {
	// resizeCanvas(windowWidth, windowHeight);
}
