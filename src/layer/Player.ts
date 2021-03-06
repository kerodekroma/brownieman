import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { KeyName, on } from '@toolbox/EventWrapper';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';

export default class PlayerLayer extends Layer {
    width = Config.CELL_SIZE - Config.CELL_SIZE / Config.UNIT;
    height = Config.CELL_SIZE - Config.CELL_SIZE / Config.UNIT;
    x = Config.CELL_SIZE + Config.UNIT;
    y = Config.CELL_SIZE + Config.UNIT;
    strokeStyle = '';
    vx = Config.PLAYER_VELOCITY;
    vy = Config.PLAYER_VELOCITY;
    fillStyle = 'rgba(136, 160, 240, 0.4)'; // '#88a0f0';
    //shared
    isCollided: boolean;
    isKeyPressed: boolean;
    direction: KeyName;
    nextPos: Layer;
    attack: boolean;
    alive: boolean = true;

    start(gameFeatures: GameFeatures): void {
        this.x = Config.CELL_SIZE;
        this.y = Config.CELL_SIZE;
        this.shared.isCollided = false;
        const cb = (evt) => {
            this.isKeyPressed = true;
            this.direction = undefined;
            console.log('evt.keyCode', evt.keyCode);
            if (evt.keyCode == KeyName.ARROW_RIGHT) {
                this.direction = KeyName.ARROW_RIGHT;
            }
            if (evt.keyCode == KeyName.ARROW_LEFT) {
                this.direction = KeyName.ARROW_LEFT;
            }
            if (evt.keyCode == KeyName.ARROW_UP) {
                this.direction = KeyName.ARROW_UP;
            }
            if (evt.keyCode == KeyName.ARROW_DOWN) {
                this.direction = KeyName.ARROW_DOWN;
            }
            if (evt.keyCode == KeyName.D) {
                this.attack = true;
            }
        };
        on(document, 'keydown.player', cb);
        gameFeatures.padMobile.link('player', cb);
    }
    update(gameFeatures: GameFeatures): void {
        if (this.nextPos !== undefined) {
            this.x = this.nextPos.x;
            this.y = this.nextPos.y;
        }
    }
    render(gameFeatures: GameFeatures): void {
        if (this.nextPos !== undefined) {
            rectangleShape(this.nextPos, gameFeatures);
        }
        rectangleShape(this, gameFeatures);
    }

    public nextStep(keyName: KeyName): Layer {
        if (keyName === KeyName.ARROW_RIGHT) {
            return <Layer>{ ...this, x: this.x + this.vx, y: this.y, fillStyle: '#a777b7' };
        }
        if (keyName === KeyName.ARROW_LEFT) {
            return <Layer>{ ...this, x: this.x - this.vx, y: this.y, fillStyle: '#cf9f00' };
        }
        if (keyName === KeyName.ARROW_UP) {
            return <Layer>{ ...this, x: this.x, y: this.y - this.vy, fillStyle: '#cf4f2f' };
        }
        if (keyName === KeyName.ARROW_DOWN) {
            return <Layer>{ ...this, x: this.x, y: this.y + this.vy, fillStyle: '#479f57' };
        }
        return this;
    }

    public lost() {
        if (this.alive) {
            this.alive = false;
            console.log('TOUCHED BY A BROWNIE HAHA!');
        }
    }
}
