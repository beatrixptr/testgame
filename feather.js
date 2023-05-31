import './pixi.js';
export class Feather extends PIXI.Sprite{
	constructor(texture){
		super(texture);
		this.anchor.set(0.5);
		this.scale.set(0.2);
		this.x = Math.floor(Math.random() * 400);
		this.y = Math.floor(Math.random() * 600);
		this.direction = Math.random() * Math.PI * 2;
		this.speed = 2;
		this.turningSpeed = Math.random() - 0.8;
	}
	
	
	move(){
		this.direction += this.turningSpeed * 0.01;
		this.x += Math.sin(this.direction) * this.speed;
		this.y += Math.cos(this.direction) * this.speed;
		this.rotation = -this.direction - Math.PI / 2;
	}
	outOfBounds(featherBounds){
		
		if (this.x < featherBounds.x) {
				this.x += featherBounds.width;
			} else if (this.x > featherBounds.x + featherBounds.width) {
				this.x -= featherBounds.width;
			}

			if (this.y < featherBounds.y) {
				this.y += featherBounds.height;
			} else if (this.y > featherBounds.y + featherBounds.height) {
				this.y -= featherBounds.height;
			}
	}
	
}