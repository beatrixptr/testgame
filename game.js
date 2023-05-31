import {Particle} from './particle.js';
import {Feather} from './feather.js';
import {Button} from './button.js';
import {Cloud} from './cloud.js';

	let app = new PIXI.Application({ width: 800, height: 600, background: '#54e3ff' });
	document.body.appendChild(app.view);
	
	const menu = new PIXI.Container();
	const exitscreen = new PIXI.Container();
	const game = new PIXI.Container();
	const splashscreen = new PIXI.Container();
	app.stage.addChild(menu);
	app.stage.addChild(exitscreen);
	app.stage.addChild(game);
	app.stage.addChild(splashscreen);
	exitscreen.visible = false;
	game.visible = false;
	
	const feathers = [];
	const duckArray = [];
	const particles = [];
	const cloudArray = [];
	
	let cloud1, cloud2, cloud3, score, scoreText, intervalId;
	
	
	PIXI.Assets.load('assets/spritesheet.json');
	PIXI.Assets.load(['assets/star.png', 'assets/feather.png', 'assets/cloud2.png', 'assets/button.png']).then(splashScreen);
	
	function splashScreen(){
		const splash = PIXI.Sprite.from('assets/splash.png');
		splashscreen.addChild(splash);
		app.ticker.add(fadeSplashScreen);
		menuSetup();
		
	}
	
	let elapsed = 0.0;
	
	function fadeSplashScreen(delta){
		elapsed += 1/60 * delta;
		if(elapsed > 2){
			splashscreen.alpha -= 0.02
			if(splashscreen.alpha <= 0){
				app.ticker.remove(fadeSplashScreen);
			}
		}
		
	}
	
	function menuSetup(){
		
		for(let i=0; i<20; i++){
			const feather = new Feather(PIXI.Assets.cache.get('assets/feather.png'));
			feathers.push(feather);
			menu.addChild(feather);
		}
		
		app.ticker.add(moveFeathers)
		
		const logo = PIXI.Sprite.from('assets/logo.png');
		logo.anchor.set(0.5);
		logo.x = app.screen.width * 0.5;
		logo.y = 70;
		menu.addChild(logo);
		
		const buttonStyle = new PIXI.TextStyle({
			fontFamily: 'Calibri',
			fontSize: 40,
		});
		
		let bx = 200;
		for(let i = 0; i<3; i++){
			const buttonText = new PIXI.Text('Game ' + (i+1), buttonStyle);
			const gameButton= new Button(PIXI.Assets.cache.get('assets/button.png'), bx)
			buttonText.anchor.set(0.5);
			buttonText.x = gameButton.x;
			buttonText.y = gameButton.y;
			gameButton.on('pointerdown', gameSetup);
			menu.addChild(gameButton);
			menu.addChild(buttonText);
			bx += 100;
			
		}
		
		const exitButton = new Button(PIXI.Assets.cache.get('assets/button.png'), 500);
		const exitButtonText = new PIXI.Text('Exit', buttonStyle);
		exitButtonText.anchor.set(0.5);
		exitButtonText.x = exitButton.x;
		exitButtonText.y = exitButton.y;
		exitButton.on('pointerdown', exitClick);
		menu.addChild(exitButton);
		menu.addChild(exitButtonText);
	
	}
	
	function moveFeathers(){
		for(let i = 0; i < feathers.length; i++){
			const feather = feathers[i];
			feather.move();
			feather.outOfBounds(featherBounds);
		}
	}
	
	function exitClick(){
		
		exitscreen.visible = true;
		menu.visible = false;
		
		const exit = PIXI.Sprite.from('assets/exit.png');
		exit.anchor.set(0.5);
		exit.scale.set(0.9);
		exit.y = 500;
		exit.x = app.screen.width * 0.5;
		exit.interactive = true;
		exit.on('pointerdown', exitClick);
		menu.addChild(exit);

		const style = new PIXI.TextStyle({
			fontFamily: 'Calibri',
			fontSize: 70,
			fill: '#fffc52',
			stroke: '#23241e'
		});

		const thx = new PIXI.Text('Thank you for playing!', style);
		thx.x = 100;
		thx.y = 200;

		exitscreen.addChild(thx);

		const exitduck = PIXI.Sprite.from('assets/duck.png');
		exitduck.anchor.set(0.5);
		exitduck.scale.set(0.17);
		exitduck.x = 600;
		exitduck.y = 450;
		exitscreen.addChild(exitduck);
	}
	
	function gameSetup(){
		
		game.visible = true;
		menu.visible = false;
		const background = PIXI.Sprite.from('assets/background.png');
		background.width = app.screen.width;
		background.height = app.screen.height;
		game.addChild(background);

		const crosshair = "url('assets/crosshair1.png'), auto";
		app.renderer.events.cursorStyles.default = crosshair;
		
		score = 0;
		scoreText = new PIXI.Text('Total score: ' + score);
		scoreText.x = 50;
		scoreText.y = 550;
		game.addChild(scoreText);
		
		
		for(let i = 0; i<3; i++){
			const cloud = new Cloud(PIXI.Assets.cache.get('assets/cloud2.png'), (i+1)*100);
			
			game.addChild(cloud);
			cloudArray.push(cloud);
			
		}
		
		const backStyle = new PIXI.TextStyle({
			fontFamily: 'Calibri',
			fontSize: 20,
		});
		
		const backButton = new Button(PIXI.Assets.cache.get('assets/button.png'), 40, 75, 0.5);
		const backText = new PIXI.Text('Back', backStyle);
		backText.x = backButton.x;
		backText.y = backButton.y;
		backText.anchor.set(0.5);
		backButton.on('pointerdown', backClick);
		game.addChild(backButton);
		game.addChild(backText);
		
		
		gameStart();
		
	}
	
	function backClick(){
		game.visible = false;
		menu.visible = true;
		app.renderer.events.cursorStyles.default = "default";
		app.ticker.add(moveFeathers);
		app.ticker.remove(moveCloud);
		app.ticker.remove(moveDucks);
		app.ticker.remove(moveParticles);
		app.ticker.remove(duckWallCollision);
		app.ticker.remove(duckCollision);
		clearInterval(intervalId);
	}

	function gameStart(){
		app.ticker.remove(moveFeathers);
		app.ticker.add(moveCloud);
		intervalId = setInterval(spawnDuck, 2000);
		app.ticker.add(moveParticles);
		app.ticker.add(moveDucks);
		app.ticker.add(duckWallCollision);
		app.ticker.add(duckCollision);
	}
	
	function moveCloud(){
		for(let i = 0; i< cloudArray.length; i++){
			const cloud = cloudArray[i];
			if(cloud.x < 850){
				cloud.x += Math.sin(cloud.direction) * cloud.speed;
			}else{
				cloud.x = -50
			}
		}
		
	}
	
	function spawnDuck(){
		const animations = PIXI.Assets.cache.get('assets/spritesheet.json').data.animations;
		const duck = PIXI.AnimatedSprite.fromFrames(animations["duck"]);
		duck.animationSpeed = 0.1;
		duck.play();
		duck.anchor.set(0.5);
		duck.x = app.screen.width * Math.random();
		duck.y = app.screen.height * Math.random();
		duck.scale.set(5);
		duck.direction = Math.random() * Math.PI * 2;
		if(0 < duck.direction && duck.direction < Math.PI){
				duck.scale.x *= -1;
		}
		duck.speed = 2 + Math.random() * 2;
		duck.interactive = true;
		duck.on('pointerdown', onClick);
		
		game.addChild(duck);
		duckArray.push(duck);
		
		function onClick(){
			spawnParticles(duck.x, duck.y);
			game.removeChild(duck);
			score += 1;
			scoreText.text = 'Total score: ' + score;
			const index = duckArray.indexOf(duck);
			if (index > -1) { 
				duckArray.splice(index, 1); 
			}
		}
	
	}
	
	function moveDucks(){
		
		for (let i = 0; i < duckArray.length; i++) {
		
			const duck = duckArray[i];
		
			duck.x += Math.sin(duck.direction) * duck.speed;
			duck.y += Math.cos(duck.direction) * duck.speed;
		}
	}
	
	function duckWallCollision(){
		for (let i = 0; i < duckArray.length; i++) {
			const duck = duckArray[i];
			if (duck.y >= app.screen.height) {
					duck.direction = duck.direction + Math.PI * 0.5;
				}
			
			if(duck.y <= 0){
				duck.direction = duck.direction + Math.PI * 0.5;
			}		
			if (duck.x <= 0 || duck.x >= app.screen.width) {
				duck.direction = -duck.direction;
				duck.scale.x *= -1;
			}
		}
	}
	
	function duckCollision(){
		for(let i = 0; i< duckArray.length; i++){
			for(let j=0; j<duckArray.length; j++){
				if(i!=j){
					if(intersects(duckArray[i], duckArray[j])){
						duckArray[i].direction = duckArray[i].direction * 2;
						duckArray[j].direction = duckArray[j].direction * 2;
					}
				}
			}
		}
	}
	
	
	function spawnParticles(a,b){
		for(let i = 0; i<20; i++){
			const particle_ = new Particle(PIXI.Assets.cache.get('assets/star.png'), a, b);
			game.addChild(particle_);
			particles.push(particle_);
		}
	}
	
	function moveParticles(){
		for(let i =0; i<particles.length; i++){
			const particle_ = particles[i];
			particle_.move();
		}
	}
	
	
	const featherBoundsPadding = 100;
	const featherBounds = new PIXI.Rectangle(
		-featherBoundsPadding,
		-featherBoundsPadding,
		app.screen.width + featherBoundsPadding * 2,
		app.screen.height + featherBoundsPadding * 2,
	);
	
	function intersects(a, b)
	{
		let ab = a.getBounds();
		let bb = b.getBounds();
		return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
	}
	
	