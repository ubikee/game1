import Sprite from './sprite.js'

console.log('Game Engine v0.0.1')

/** 
 * Engine 
 **/
const engine = {
    perspective: "CARTESIAN", // CARTESIAN || ISOMETRIC
    x: 0,
    y: 0,
    keys: {},
    monitor,
    screen,
    background: null,
    scene: null,
    sprite: null,
    clockSpeed: 50,
    scroll: false
}

engine.start = (map) => {

    engine.monitor = document.getElementById('monitor')
    engine.screen = document.getElementById('screen')
    engine.background = document.getElementById('background')
    engine.scene = document.getElementById('scene')
    engine.map = document.getElementById('map')
    engine.sprite = Sprite(document.getElementById('sprite1'), 50, 62, 7)

    //render map
    map.forEach( item => {
        const elem = document.createElement('div')
        elem.classList.add('block')
        elem.style.top = `${item.y}rem`
        elem.style.left = `${item.x}rem`
        elem.style.width = `${item.width}rem`
        elem.style.height = `${item.height}rem`
        engine.map.appendChild(elem)
    })

    document.addEventListener('keyup', (event) => {
        const { key } = event
        engine.keys[key] = false
    })

    document.addEventListener('keydown', (event) => {
        const { key } = event
        engine.keys[key] = true
    })

    setInterval(() => {

        if (engine.keys['ArrowUp'] === true) engineProxy.y = engine.y - 1
        if (engine.keys['ArrowDown'] === true) engineProxy.y = engine.y + 1
        if (engine.keys['ArrowRight'] === true) engineProxy.x = engine.x + 1
        if (engine.keys['ArrowLeft'] === true && engine.x > 0) engineProxy.x = engine.x - 1

        if (engine.perspective === "CARTESIAN") {
                if (engine.scroll) {
                    engine.scene.style.backgroundPosition = `${-engine.x*2}rem ${-engine.y}rem`
                    engine.scene.scrollTo({ left: engine.x*10, top: engine.y*10, behaviour: 'smooth' })
                }
        } else if (engine.perspective === "ISOMETRIC") {
            const isoX = engine.x - engine.y
            const isoY = (engine.x + engine.y) / 2
            engine.scene.style.backgroundPosition = `${-isoX}rem ${-isoY}rem`
        }

        engine.sprite.animate(engine.keys, map)

    }, engine.clockSpeed)

}

const engineProxy = new Proxy(engine, {

    get: function (obj, prop) {
        return obj[prop]
    },

    set: function (obj, prop, value) {
        obj[prop] = value
        monitor.innerHTML = (` x: ${engine.x}, y: ${engine.y}`)
        return true
    }
})

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

export default engine

