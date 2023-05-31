import './pixi.js';
export class Particle extends PIXI.Sprite{
	constructor(texture, x, y){
		super(texture);
		this.x = x; 
		this.y = y;
		this.direction = Math.random()* Math.PI * 2;
		this.speed = 6;
		this.anchor.set(0.5);
		this.scale.set(0.005);
	}
	move(){
		this.x += Math.sin(this.direction) * this.speed;
		this.y += Math.cos(this.direction) * this.speed;
	}
}