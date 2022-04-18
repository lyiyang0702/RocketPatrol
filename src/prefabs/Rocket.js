//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,texture,frame,position){
        super (scene,x,y,texture,frame);

        // add object to existing scene
        scene.add.existing (this);
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2;
    }
    
    update(){
        // left/right movement
        if (!this.isFiring) {
            if (keyUP.isDown||keyW.isDown && this.y <= borderUISize + this.width){
                this.y += this.moveSpeed;
            }
            else if (keyDOWN.isDown || keyS.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.y -= this.moveSpeed;
            }
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown (keyF) || Phaser.Input.Keyboard.JustDown (keySPACE) &&!this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize *3 + borderPadding){
            this.y -= this.moveSpeed;
        }

        // reset
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    
    // reset rocket to ground
    reset(){
        this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
    }

}

