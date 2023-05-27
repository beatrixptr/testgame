let app = new PIXI.Application({ width: 800, height: 600, background: '#54e3ff' });
	document.body.appendChild(app.view);
	PIXI.Assets.load('assets/spritesheet.json');
	

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
	
	

	let intervalId;

	function exitClick(){
		menu.visible = false; 
		exitscreen.visible = true
	}

	function gameClick(){
		menu.visible = false; game.visible = true;
		intervalId = setInterval(spawnDuck, 2000);	
	}
	
	function backClick(){
		game.visible = false;
		menu.visible = true;
		clearInterval(intervalId);
	}
	
	const splash = PIXI.Sprite.from('assets/splash.png');
	splashscreen.addChild(splash);

	const feathers = [];

	for(let i=0; i<20; i++){
		const feather = PIXI.Sprite.from('assets/feather.png');
		feather.anchor.set(0.5);
		feather.scale.set(0.2);
		feather.x = Math.floor(Math.random() * app.screen.width);
		feather.y = Math.floor(Math.random() * app.screen.height);
		feather.direction = Math.random() * Math.PI * 2;
		feather.speed = 2;
		feather.turningSpeed = Math.random() - 0.8;
		feathers.push(feather);
		menu.addChild(feather);
	}
	const featherBoundsPadding = 100;
	const featherBounds = new PIXI.Rectangle(
		-featherBoundsPadding,
		-featherBoundsPadding,
		app.screen.width + featherBoundsPadding * 2,
		app.screen.height + featherBoundsPadding * 2,
	);

	const logo = PIXI.Sprite.from('assets/logo.png');
	logo.anchor.set(0.5);
	logo.x = app.screen.width * 0.5;
	logo.y = 70;
	menu.addChild(logo);

	const game1 = PIXI.Sprite.from('assets/game1.png');
	game1.anchor.set(0.5);
	game1.scale.set(0.9);
	game1.y = 200;
	game1.x = app.screen.width * 0.5;
	game1.interactive = true;
	game1.on('pointerdown', gameClick);
	menu.addChild(game1);

	const game2 = PIXI.Sprite.from('assets/game2.png');
	game2.anchor.set(0.5);
	game2.scale.set(0.9);
	game2.y = 300;
	game2.x = app.screen.width * 0.5;
	game2.interactive = true;
	game2.on('pointerdown', gameClick);
	menu.addChild(game2);
	
	const game3 = PIXI.Sprite.from('assets/game3.png');
	game3.anchor.set(0.5);
	game3.scale.set(0.9);
	game3.y = 400;
	game3.x = app.screen.width * 0.5;
	game3.interactive = true;
	game3.on('pointerdown', gameClick);
	menu.addChild(game3);

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
	
	const background = PIXI.Sprite.from('assets/background.png');
	background.width = app.screen.width;
	background.height = app.screen.height;
	game.addChild(background);

	const crosshair = "url('assets/crosshair1.png'), auto";
	app.renderer.events.cursorStyles.default = crosshair;
	
	const cloud1 = PIXI.Sprite.from('assets/cloud1.png');
	cloud1.anchor.set(0.5);
	cloud1.scale.set(0.3);
	cloud1.y = 70;
	cloud1.x = Math.random() * app.screen.width;
	cloud1.direction = Math.PI / 2;
	cloud1.speed = 3;
	game.addChild(cloud1);
	
	const cloud2 = PIXI.Sprite.from('assets/cloud2.png');
	cloud2.anchor.set(0.5);
	cloud2.scale.set(0.15);
	cloud2.y = 200;
	cloud2.x = Math.random() * app.screen.width;
	cloud2.direction = Math.PI * 1.5;
	cloud2.speed = 2;
	game.addChild(cloud2);
	
	const cloud3 = PIXI.Sprite.from('assets/cloud3.png');
	cloud3.anchor.set(0.5);
	cloud3.scale.set(0.1);
	cloud3.y = 300;
	cloud3.x = Math.random() * app.screen.width;
	cloud3.direction = Math.PI / 2;
	cloud3.speed = 1;
	game.addChild(cloud3);
	
	let score = 0;
	const scoreText = new PIXI.Text('Total score: ' + score);
	scoreText.x = 50;
	scoreText.y = 550;
	game.addChild(scoreText);
	
	
	const back = PIXI.Sprite.from('assets/back.png');
	back.anchor.set(0.5);
	back.x = 75;
	back.y = 40;
	back.scale.set(0.5);
	back.interactive = true;
	back.on('pointerdown', backClick);
	game.addChild(back);
	
	
	const duckArray = [];
	const particles = [];
	
	function spawnParticles(a,b){
		for(let i = 0; i<20; i++){
			const particle = PIXI.Sprite.from('assets/star.png');
			particle.anchor.set(0.5)
			particle.scale.set(0.005);
			particle.x = a;
			particle.y = b;
			particle.direction = Math.random() * Math.PI * 2;
			particle.speed = 6;
			game.addChild(particle);
			particles.push(particle);
		}
	}
	
	function spawnDuck(){
		const animations = PIXI.Assets.cache.get('assets/spritesheet.json').data.animations;
		const duck = PIXI.AnimatedSprite.fromFrames(animations["duck"]);
		duck.animationSpeed = 0.1;
		duck.play();
		game.addChild(duck);
		duck.anchor.set(0.5);
		duck.x = app.screen.width / 2;
		duck.y = app.screen.height / 2;
		duck.scale.set(5);
		duck.direction = Math.random() * Math.PI * 2;
		if(0 < duck.direction && duck.direction < Math.PI){
				duck.scale.x *= -1;
		}
		duck.speed = 2 + Math.random() * 2;
		duck.interactive = true;
		duck.on('pointerdown', onClick);
		
		//game.addChild(duck);
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
	
	function intersects(a, b)
	{
		let ab = a.getBounds();
		let bb = b.getBounds();
		return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
	}
	
	elapsed = 0.0;
	
	app.ticker.add((delta) => {
		elapsed += 1/60 * delta;
		if(elapsed > 2){
			splashscreen.alpha -= 0.02
		}
		
		for(let i = 0; i < feathers.length; i++){
			const feather = feathers[i];
			feather.direction += feather.turningSpeed * 0.01;
			feather.x += Math.sin(feather.direction) * feather.speed;
			feather.y += Math.cos(feather.direction) * feather.speed;
			feather.rotation = -feather.direction - Math.PI / 2;
			if (feather.x < featherBounds.x) {
				feather.x += featherBounds.width;
			} else if (feather.x > featherBounds.x + featherBounds.width) {
				feather.x -= featherBounds.width;
			}

			if (feather.y < featherBounds.y) {
				feather.y += featherBounds.height;
			} else if (feather.y > featherBounds.y + featherBounds.height) {
				feather.y -= featherBounds.height;
			}
		}
		
		
		if(cloud1.x < 850){
			cloud1.x += Math.sin(cloud1.direction) * cloud1.speed;
		}else{
			cloud1.x = -50
		}
		if(cloud2.x > -50){
			cloud2.x += Math.sin(cloud2.direction) * cloud2.speed;
		}else{
			cloud2.x = 850
		}
		if(cloud3.x < 850){
			cloud3.x += Math.sin(cloud3.direction) * cloud3.speed;
		}else{
			cloud3.x = -50
		}
			
			
		for (let i = 0; i < duckArray.length; i++) {
		
			const duck = duckArray[i];
		
			duck.x += Math.sin(duck.direction) * duck.speed;
			duck.y += Math.cos(duck.direction) * duck.speed;
		
			if (duck.y > (app.screen.height - 100)) {
				duck.direction = duck.direction + Math.PI * 0.5;
			}
		
			if(duck.y < 100){
				duck.direction = duck.direction + Math.PI * 0.5;;
			}
		
			if (duck.x < 100 || duck.x > (app.screen.width - 100)) {
				duck.direction = -duck.direction;
				duck.scale.x *= -1;
			}
			
		
		}
		for(let i =0; i<particles.length; i++){
			particle = particles[i];
			particle.x += Math.sin(particle.direction) * particle.speed;
			particle.y += Math.cos(particle.direction) * particle.speed;
		}
        
    
	});