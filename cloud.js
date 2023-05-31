import './pixi.js';

export class Cloud extends PIXI.Sprite{
	constructor(texture, y){
		super(texture);
		this.anchor.set(0.5);
		this.scale.set(0.1 + Math.random() * 0.1);
		this.x = Math.random() * 800;
		this.y = y;
		this.direction = Math.PI / 2;
		this.speed = 1 + Math.random() * 2;
	}
}