// game constants
const play = document.getElementById('play'),
    draw = document.getElementById('draw'),
    endturn = document.getElementById('endturn'),
	message = document.getElementById('battlemsg'),
	
	imagePreload = function(path) {
		let loaded = false
		const img = new Image()
		img.onload = () => loaded = true
		img.src = path
		return img
	},
	sword = new imagePreload('./img/sword.png'),
	shield = new imagePreload('./img/shield.png'),
	bow = new imagePreload('./img/bow.png'),
	wand = new imagePreload('./img/wand.png'),
	plus = new imagePreload('./img/plus.png'),
	
// objects and methods
    rand = n => Math.round(Math.random()*n),
	
	Player = {
		name: '',
		hp: 20,
		alive: true,
		dmg: rand(10),
		doDmg: player => {
			player.hp -= this.dmg
			if (player.hp <= 0) {
				player.alive = false
				console.log(`${player.name} has died.`)
			}
		}
	},
	player = Object.create(Player),
	opponent = Object.create(Player),
	
	Game = {
		playing: false,
		turn: player, // you start
		switchTurn: () => {
			Game.turn = Game.turn===player? opponent: player
			console.log('turnover')
		},
		// current player draws card, or draws random cards onto field if no argument
		drawCard: (card) => {
			const currentPlayer = document.querySelector(Game.turn===player? 
				'#play-field.player': '#play-field.opponent')
			if (card) {
				currentPlayer.appendChild(card)
			} else {
				// draw 4 random cards
			}
		},
		// fills current player's field with cards
		populateField: () => {}
	}

// event listeners
play.addEventListener('click', (e) => {
	Game.playing = Game.playing===false? true: false
	console.log(Game.playing===false? 'stopped': 'playing')
}, false)

draw.addEventListener('click', (e) => {
	//populate fields
	//redraw player cards
}, false)

endturn.addEventListener('click', (e) => {
	//turn control to opponent
	if (Game.turn === player) {
		Game.turn = opponent
		console.log('turn skipped')
	}
}, false)
