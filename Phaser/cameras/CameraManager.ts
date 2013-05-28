/// <reference path="Game.ts" />
/// <reference path="system/Camera.ts" />

/**
* Phaser - CameraManager
*
* Your game only has one CameraManager instance and it's responsible for looking after, creating and destroying
* all of the cameras in the world.
*/

module Phaser {

    export class CameraManager {

        /**
         * CameraManager constructor
         * This will create a new <code>Camera</code> with position and size.
         *
         * @param x {number} X Position of the created camera.
         * @param y {number} y Position of the created camera.
         * @param width {number} Width of the created camera.
         * @param height {number} Height of the created camera.
         */
        constructor(game: Game, x: number, y: number, width: number, height: number) {

            this._game = game;

            this._cameras = [];

            this.current = this.addCamera(x, y, width, height);

        }

        /**
         * Local private reference to Game.
         */
        private _game: Game;

        /**
         * Local container for storing cameras.
         */
        private _cameras: Camera[];

        /**
         * Local helper stores index of next created camera.
         */
        private _cameraInstance: number = 0;

        /**
         * Currently used camera.
         */
        public current: Camera;

        /**
         * Get all the cameras.
         *
         * @returns {Camera[]} An array contains all the cameras.
         */
        public getAll(): Camera[] {
            return this._cameras;
        }

        /**
         * Update cameras.
         */
        public update() {
            this._cameras.forEach((camera) => camera.update());
        }

        /**
         * Render cameras.
         */
        public render() {
            this._cameras.forEach((camera) => camera.render());
        }

        /**
         * Create a new camera with specific position and size.
         *
         * @param x {number} X position of the new camera.
         * @param y {number} Y position of the new camera.
         * @param width {number} Width of the new camera.
         * @param height {number} Height of the new camera.
         * @returns {Camera} The newly created camera object.
         */
        public addCamera(x: number, y: number, width: number, height: number): Camera {

            var newCam: Camera = new Camera(this._game, this._cameraInstance, x, y, width, height);

            this._cameras.push(newCam);

            this._cameraInstance++;

            return newCam;

        }

        /**
         * Remove a new camera with its id.
         *
         * @param id {number} ID of the camera you want to remove.
         * @returns {boolean} True if successfully removed the camera, otherwise return false.
         */
        public removeCamera(id: number): bool {

            for (var c = 0; c < this._cameras.length; c++)
            {
                if (this._cameras[c].ID == id)
                {
                    if (this.current.ID === this._cameras[c].ID)
                    {
                        this.current = null;
                    }

                    this._cameras.splice(c, 1);

                    return true;
                }
            }

            return false;

        }

        /**
         * Clean up memory.
         */
        public destroy() {

            this._cameras.length = 0;

            this.current = this.addCamera(0, 0, this._game.stage.width, this._game.stage.height);

        }

    }

}