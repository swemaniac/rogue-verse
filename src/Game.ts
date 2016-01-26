/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="States/Boot"/>
/// <reference path="States/Preload"/>
/// <reference path="States/Testbed"/>

namespace RogueVerse {
    export class Game extends Phaser.Game {
        // the world group is affected by lighting
        worldLayer: Phaser.Group;

        // the ui group is rendered on top of the world group and is not affected by lighting
        uiLayer: Phaser.Group;

        addCollisions: Phaser.Signal = new Phaser.Signal();
        addLights: Phaser.Signal = new Phaser.Signal();

        constructor() {
            super(1280, 960, Phaser.AUTO);

            this.state.add(States.Boot.Key, States.Boot);
            this.state.add(States.Preload.Key, States.Preload);
            this.state.add(States.Testbed.Key, States.Testbed);

            this.state.start(States.Boot.Key);
        }
    }
}