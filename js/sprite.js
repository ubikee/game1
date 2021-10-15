function cuad(x) {
    return -(x * x) + (10 * x) + 30
}

function collide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width
        && rect1.x + rect1.width > rect2.x
        && rect1.y < rect2.y + rect2.height
        && rect1.height + rect1.y > rect2.y
}

function checkCollisions(item, items) {
    return items.filter(i => collide(i, item))
}

const Player = (x = 0, y = 0, width = 5, height = 5 ) => {

    return {
        x,
        y,
        width,
        height,
        sprite,
        canJump: true,
        canClimb: false,

        move: function(moves=[]) {

            if (sprt.move === 'Right') {
                this.sprite = ''
                sprt.x = sprt.x + 1
            }

            if (sprt.move === 'Left') {
                sprt.x = sprt.x - 1
            }

            if (sprt.move === 'Up' && sprt.canClimb) {
                sprt.y = sprt.y - 2
            }

            if (sprt.move === 'Down' && sprt.canClimb) {
                sprt.y = sprt.y + 2
            }

        }
    }

}

/**
 * Sprites
 */
const Sprite = (element, width, height, steps, gravity = 1) => {

    const sprt = {
        element,
        width: 3,
        height: 5,
        step: 0,
        move: 0,
        x: 30,
        y: 0,
        jump: 0,
        canClimb: false,
    }

    sprt.animate = (keys, items = []) => {

        // MOVEMENT
        var move = ''

        if (keys[' '] === true) {
            if (sprt.jump === 0) sprt.jump = 1
            keys[' '] = false
        }

        if (keys['ArrowUp'] === true) move = 'Up'
        if (keys['ArrowDown'] === true) move = 'Down'
        if (keys['ArrowRight'] === true) move = 'Right'
        if (keys['ArrowLeft'] === true) move = 'Left'

        sprt.move = move
        if (sprt.move === '') {
            element.style.backgroundPosition = '-0px -0px'
        } else {

            if (sprt.move === 'Right') {
                element.style.transform = `scaleX(1)`
                sprt.x = sprt.x + 1
            }
            if (sprt.move === 'Left') {
                element.style.transform = `scaleX(-1)`
                sprt.x = sprt.x - 1
            }
            if (sprt.move === 'Up' && sprt.canClimb) {
                sprt.y = sprt.y - 2
            }
            if (sprt.move === 'Down' && sprt.canClimb) {
                sprt.y = sprt.y + 1
            }

            sprt.step = sprt.step <= steps ? sprt.step + 1 : 0
            element.style.backgroundPosition = `-${width * sprt.step}px -${height * 0}px`
        }

        // COLLIDE
        const collisions = checkCollisions(sprt, items)
        if (collisions.length > 0) {

            sprt.canClimb = collisions.some(item => item.type === 'stair')

        } else {
            sprt.y = (sprt.y + 1) * gravity
        }


        if (sprt.jump > 0) {
            sprt.jump = sprt.jump + 1
            if (sprt.jump < 10) sprt.y = sprt.y - 2
            if (sprt.jump === 21) sprt.jump = 0
        }

        element.style.left = `${sprt.x}rem`
        element.style.top = `${sprt.y}rem`

    }

    sprt.stop = () => {

    }

    return sprt
}

export default Sprite