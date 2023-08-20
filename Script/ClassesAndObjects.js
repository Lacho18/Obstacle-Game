const heroStates = [
	{
		state: "stay",
		frames: 7,
	},

	{
		state: "jump",
		frames: 7,
	},

	{
		state: "fall",
		frames: 7,
	},

	{
		state: "walk",
		frames: 9,
	},

	{
		state: "sit",
		frames: 5,
	},

	{
		state: "attack",
		frames: 7,
	}
];

class Floor {
	constructor(speedModifier) {
		this.width = CANVAS_WIDTH;
		this.height = 30;
		this.x = 0;
		this.y = CANVAS_HEIGHT - this.height;
		this.x2 = this.width;
		this.speedModifier = speedModifier
		this.speeds = gamespeed * speedModifier;
	}

	update() {
		this.speeds = gamespeed + this.speedModifier;
		if(this.x < -this.width) {
			this.x = this.width + this.x2 - this.speeds;
		}

		if(this.x2 < -this.width) { 
			this.x2 = this.width + this.x - this.speeds;
		}

		this.x = this.x - this.speeds;
		this.x2 = this.x2 - this.speeds;
	}

	draw() {
		context.fillRect(this.x, this.y, this.width,this.height);
		context.fillRect(this.x2, this.y, this.width,this.height);
	}
}

class Obstacle {
	constructor() {
		this.minWidth = 20;
		this.minHeight = 70;
		this.width = Math.random() * 57 + this.minWidth;
		this.height = Math.random() * 120 + this.minHeight;
		this.y = CANVAS_HEIGHT - this.height;
		this.x = CANVAS_WIDTH;
		this.speed = Math.random() * 3 + gamespeed;
	}

	draw() {
		context.fillRect(this.x, this.y, this.width, this.height);
	}

	pause() {
		this.speed = 0;
	}

	stoppause() {
		this.speed = Math.random() * 3 + gamespeed;
	}
}