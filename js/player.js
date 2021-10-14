import Sprite from "./sprite"

const Player = ({ keys, sprite }) => {

    config: {
        control: {
            /*
            keys: {
                'up': '',
                'down': '',
                'left': '',
                'right': '',
                'fireA': '',
                'fireB': '',
                'fireC': '', 
            }
            */
           keys,
        }
    },

    /*
    sprite: {
        file: 'sprite1.png',
        width: 50px,
        height: 50px,
        moves: {
            'up': { key: key.up, row: 1 },
            'down': { key: key.down, row: 2 },
            'left': { key: key.left, row: 3 },
            'right': { key: key.right, row: 4 },
        },
        actions: []
            'jump': { key: key.fireA, row: 5 },
            'fire': { key: key.fireB, row: 6 }, 
        }
        
    }
    */
   sprite,
}