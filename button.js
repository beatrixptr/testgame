import './pixi.js';
export class Button extends PIXI.Sprite{
	constructor(texture, y, x = 400, scale = 0.9){
		super(texture);
		this.y = y;
		this.x = x;
		this.scale.set(scale);
		this.anchor.set(0.5);
		this.interactive = true;
		this.cursor = "pointer";
	}
}