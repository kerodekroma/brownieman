import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import { rectangleShape } from '@toolbox/Shape';
import Config from 'src/Config';
import DebugScene from './Debug';
import MazeScene from './Maze';

export default class ViewportLayer extends Layer {
    fillStyle = 'orange';
    layers: Layer[] = [new MazeScene(), new DebugScene()];
    cellSize: number = Config.CELL_SIZE;

    start(gameFeatures: GameFeatures): void {
        const { height, width, x, cellSize } = this.resize(gameFeatures);
        this.height = height;
        this.width = width;
        this.x = x;
        this.cellSize = cellSize;
        gameFeatures.viewport = this;
        this.layers.forEach((l) => l.start(gameFeatures));
    }

    update(gameFeatures: GameFeatures): void {
        const { height, width, x, cellSize } = this.resize(gameFeatures);
        this.height = height;
        this.width = width;
        this.x = x;
        this.cellSize = cellSize;
        gameFeatures.viewport = this;
        this.layers.forEach((l) => l.update(gameFeatures));
    }

    render(gameFeatures: GameFeatures): void {
        rectangleShape(this, gameFeatures);
        this.layers.forEach((l) => l.render(gameFeatures));
    }

    private resize(gameFeatures: GameFeatures) {
        if (gameFeatures.isMob()) {
            return {
                height: Config.HEIGHT - Config.PAD_VIEWPORT_HEIGHT,
                width: Config.WIDTH - Config.PAD_VIEWPORT_HEIGHT / 2,
                x: Config.UNIT * 5,
                cellSize: Config.MOBILE_CELL_SIZE,
            };
        }
        return {
            height: Config.HEIGHT,
            width: Config.WIDTH,
            x: 0,
            cellSize: Config.CELL_SIZE,
        };
    }
}