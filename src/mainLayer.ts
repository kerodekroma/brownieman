import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import padMobileLayer from '@layer/padMobile';
import MazeScene from './scene/maze';

export default class MainLayer extends Layer {
    x = 10;
    y = 10;
    width = 20;
    height = 20;

    scenes: Layer[] = [new MazeScene()];

    // TODO: PROGRAM UI
    paddleMobile = new padMobileLayer();

    start(gameFeatures: GameFeatures): void {
        gameFeatures.on();
        if (gameFeatures.isMob()) {
            this.paddleMobile.start(gameFeatures);
        }
        this.scenes.forEach((scene) => scene.start(gameFeatures));
    }
    update(gameFeatures: GameFeatures): void {
        this.scenes.forEach((scene) => scene.update(gameFeatures));
    }
    render(gameFeatures: GameFeatures): void {
        if (gameFeatures.isMob()) {
            this.paddleMobile.render(gameFeatures);
        }
        this.scenes.forEach((scene) => scene.render(gameFeatures));
    }
}