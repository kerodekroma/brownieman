import Layer from '@abstract/Layer';
import { GameFeatures } from '@interface/GameFeatures';
import BombLayer from '@layer/bomb';
import GridLayer from '@layer/grid';
import HudLayer from '@layer/hud';
import PlayerLayer from '@layer/player';
export default class MazeScene extends Layer {
    hud = new HudLayer();
    grid = new GridLayer();
    player = new PlayerLayer();

    bombs: BombLayer[] = [];

    start(gameFeatures: GameFeatures): void {
        this.hud.start(gameFeatures);
        this.grid.start(gameFeatures);
        this.player.start(gameFeatures);
    }

    update(gameFeatures: GameFeatures): void {
        this.clean();
        if (this.player.isKeyPressed) {
            let pp = this.player.nextStep(this.player.direction);
            this.player.nextPos = pp;
            let result = this.grid.gvalidB([pp]).filter((e) => e !== undefined).length;
            if (!result) {
                this.player.nextPos = undefined;
            }
            if (this.player.attack) {
                const c = this.grid.gblock(this.player);
                this.createBomb(gameFeatures, c);
                this.player.attack = false;
            }
            this.player.isKeyPressed = false;
        }
        this.hud.update(gameFeatures);
        this.bombs.forEach((b) => {
            b.update(gameFeatures);
            if (b.isExpanded) {
                this.boom(b, gameFeatures, (wave) => {
                    if (wave.some((b) => b.collideWith(this.player))) {
                        this.player.lost();
                    }
                });
                b.isExpanded = false;
            }
        });
        this.player.update(gameFeatures);
    }

    createBomb(gameFeatures, c: Layer) {
        const b = new BombLayer();
        b.x = b.sP(c).x;
        b.y = b.sP(c).y;
        b.start(gameFeatures);
        this.bombs.push(b);
    }

    boom(b: BombLayer, gameFeatures, cb: (wave: Layer[]) => void) {
        b.wave = this.grid.gvalidB(b.wave); // conditioning initial explotion
        b.wave.forEach((w, index) => {
            if (w !== undefined) {
                b.expand(index);
            }
        }); // expantion without rules
        b.wave = this.grid.gvalidB(b.wave); // conditioning in the maze
        cb(b.wave.filter((b) => b !== undefined));
    }

    render(gameFeatures: GameFeatures): void {
        this.hud.render(gameFeatures);
        this.grid.render(gameFeatures);
        this.bombs.forEach((b) => b.render(gameFeatures));
        this.player.render(gameFeatures);
    }

    private clean() {
        this.bombs = this.bombs.filter((b) => b.rm == false);
    }
}
