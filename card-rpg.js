
// game constants
const opponentField = document.getElementById('oppField')
                              .getContext('2d'),
    playerField     = document.getElementById('plaField')
                              .getContext('2d'),
    cardWidth  = 64, 
    cardHeight = 128,
    sword      = 0, 
    shield     = 64,
    bow        = 128,
    wand       = 192,
    plus       = 258,

    message = document.getElementById('battlemsg').innerText,

    // player objects
    Player = {
        name: '',
        hp: 10,
        dead: false,
        dmg: Math.random()*10,
        doDmg: (player) => {
            player.hp -= this.dmg
            if (player.hp <= 0) {
                player.dead = true
                message = `${player.name} has died.`
            }
        },
        cards: []
    },
    player   = Object.create(Player),
    opponent = Object.create(Player),

    Game = {
        playing: false,
        turn: player, // you start
        switchTurn: () => {
            // your turn is over; their turn starts
            if (Game.turn===player) {
                Game.turn = opponent
            } else {
                Game.turn = player
            }
        },

        // draw 1 card at certain position
        drawCard: (card, pos, player) =>
            player.drawImage(
                cards, 
                card, pos*64, 
                cardWidth, cardHeight,
                card, pos*64, 
                cardWidth, cardHeight),
        
        // fill field of player with cards
        populateField: (player) => {
            const fieldPositions = [0, 1, 2, 3, 4]
            // get random position (reduces to card constants 
            // 'sword', 'shield', etc as above)
            const random = fieldPositions.indexOf((Math.random()*5)/64)
            // draw all cards
             fieldPositions.forEach(
                pos => Game.drawCard(random, pos, player)) 
        }
    },

    // load an image and return it from file path
    imagePreload = function(path) {
        let loaded = false
        let img = new Image()
        img.onload = () => loaded = true
        img.src = path
        return img
    },

    cards = new imagePreload('./img/cards.png')





// event listeners
document.getElementById('play')
        .addEventListener('click', (e) => {
            if (Game.playing === false) {
                Game.playing = true
                console.log('playing')
            } else {
                Game.playing = false
                console.log('stopped')
            }
        }, false)

document.getElementById('draw')
        .addEventListener('click', (e) => {
            if (Game.turn === player) {
                // currently allows mulliganing
                Game.populateField(playerField)
                console.log('cards drawn')
            }
        }, false)

document.getElementById('endturn')
        .addEventListener('click', (e) => {
            if (Game.turn === player) {
                Game.turn = opponent
                Game.populateField(opponentField)
                console.log('turn skipped')
            }
        }, false)







// start game code
const init = () => {
    Game.populateField(opponentField)
    Game.populateField(playerField)
}

const update = () => {
    opponentField.clearRect(
        0, 0, opponentField.width, opponentField.height)
    playerField.clearRect(
        0, 0, playerField.width, playerField.height)
}

const draw = () => {
    // might constantly run
}

const main = () => {
    requestAnimationFrame(main)
    update()
    draw()
}

window.onload = () => {
    init()
    main()
}
