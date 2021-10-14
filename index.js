import engine from './js/engine.js'

/**
 * Screen Manager
 */
const ScreenManager = (screens) => {
    
    const screen = document.getElementById('screen')
    var child

    return {
        goto : (id) => {

            while (screen.firstChild) {
                screen.removeChild(screen.firstChild);
            }

            const template = document.getElementById(`${id}_template`)
            const clone = template.content.cloneNode(true)
            child = screen.appendChild(clone)
            screens[id].init(child)
        }   
    }
} 

const screens = {
    
    'menu' : {
        init: () => {
            const newBtn = document.getElementById("NEW_GAME")
            newBtn.addEventListener('click', () => screen.goto('game'))
            const loadBtn = document.getElementById("LOAD_GAME")
            loadBtn.addEventListener('click', () => screen.goto('menu-load'))
        }
    },
    
    'menu-load' : {
        init: () => {
            const newBtn = document.getElementById("BACK")
            newBtn.addEventListener('click', () => screen.goto('menu'))
        }
    },
    
    'game' : {
        init: () => {

            const map = [
                { type: "platform", x: 32.5, y: 11.0, width: 54.0, height: 1    },
                { type: "platform", x: 97.5, y: 21.5, width: 20.0, height: 1    },
                { type: "platform", x: 0   , y: 32.5, width: 32.0, height: 1    },
                { type: "platform", x: 43.5, y: 32.5, width: 21.5, height: 1    },
                { type: "stair"   , x: 103 , y: 21.5, width: 7.0 , height: 23   },
                { type: "platform", x: 76  , y: 43.5, width: 63.0, height: 1    },
                { type: "stair"   , x: 20  , y: 32.5, width: 7.0 , height: 22.5 },
                { type: "wall"    , x: 76  , y: 43.5, width: 1.0 , height: 11.5 },
                { type: "platform", x: 0   , y: 54.0, width: 43.0, height: 1    },
                { type: "platform", x: 54  , y: 54.0, width: 23.0, height: 1    },
                { type: "platform", x: 200055, y: 200000, width: 10, height: 1 },
            ]
            
            engine.start(map)

        }
    }
}

const screen = ScreenManager(screens) 
screen.goto("menu")