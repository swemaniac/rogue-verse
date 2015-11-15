/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="Ships/Ship"/>

namespace RogueVerse.Entities {
    export class Player {
        game: Phaser.Game;
        ship: Entities.Ships.Ship;
        controls: { forward: Phaser.Key, reverse: Phaser.Key, left: Phaser.Key, right: Phaser.Key, brake: Phaser.Key, toggleCouple: Phaser.Key, fireGroup1: Phaser.DeviceButton };

        constructor(ship: Entities.Ships.Ship, game: Phaser.Game) {
            this.ship = ship;
            this.game = game;

            this.game.add.existing(this.ship);
            this.game.physics.p2.enable(this.ship);
            this.game.camera.follow(this.ship);
            this.ship.body.collideWorldBounds = false;
            this.ship.checkWorldBounds = false;

            this.controls = this.game.input.keyboard.addKeys({ 'forward': Phaser.KeyCode.W, 'reverse': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'brake': Phaser.KeyCode.SPACEBAR, 'toggleCouple': Phaser.KeyCode.C });
            this.controls.fireGroup1 = this.game.input.activePointer.leftButton;
            this.controls.toggleCouple.onDown.add(() => this.ship.coupled = !this.ship.coupled);
        }

        update() {
            if (this.controls.fireGroup1.isDown) {
               this.ship.fire(1);
            }
            
            if (this.controls.brake.isDown) {
                this.ship.braking = true;
            } else {
                this.ship.braking = false;
                
                if (this.controls.forward.isDown) {
                    this.ship.strafeForward();
                } else if (this.controls.reverse.isDown) {
                    this.ship.strafeReverse();
                }
                
                if (this.controls.left.isDown) {
                    this.ship.strafeLeft();
                } else if (this.controls.right.isDown) {
                    this.ship.strafeRight();
                }
            }

            this.ship.yaw(this.getRotationToPointer());
            this.game.world.wrap(this.ship.body);
        }
        
        private getRotationToPointer() {
            var angleToPointer = Phaser.Math.angleBetween(this.ship.x, this.ship.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
            var deltaMouseRad = this.ship.rotation - angleToPointer - Math.PI / 2;
            
            var mod = Math.PI * 2;
            deltaMouseRad = deltaMouseRad % mod;
  
            if (deltaMouseRad != deltaMouseRad % (mod / 2)) {
                deltaMouseRad = (deltaMouseRad < 0) ? deltaMouseRad + mod : deltaMouseRad - mod;
            }
            
            return deltaMouseRad;
        }
    }
}