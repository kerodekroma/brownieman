import { GameFeatures } from '@interface/GameFeatures';

export default abstract class Layer {
    // position
    x: number = 0;
    y: number = 0;
    // size
    width: number = 0;
    height: number = 0;
    radius?: number = 0;
    // styling
    filter?: string;
    fillStyle?: string | CanvasGradient = '#0f0';
    strokeStyle?: string = '#00f';
    lineWidth?: number = 0;
    img?: HTMLCanvasElement;
    // velocity
    vx?: number = 0;
    vy?: number = 0;
    //friction
    friction?: number = 0;
    //friction
    bounce?: number = 0;
    // acceleration
    accX?: number = 0;
    accY?: number = 0;
    // rotation
    rotation?: number = 0;
    // font
    font?: string;
    text?: string = '';

    //data shared
    shared?: any = {};
    // visibility
    isHidden?: boolean = false;

    abstract start?(gameFeatures: GameFeatures): void;
    abstract update?(gameFeatures: GameFeatures): void;
    abstract render?(gameFeatures: GameFeatures): void;

    collideWith?(layer: Layer): boolean {
        const left = this.x + this.width < layer.x;
        const right = this.x > layer.x + layer.width;
        const top = this.y + this.height < layer.y;
        const bottom = this.y > layer.y + layer.height;
        return !(left || right || top || bottom);
    }

    toggle?(): void {
        if (this.isHidden) {
            this.isHidden = false;
            return;
        }
        this.isHidden = true;
    }
}