
function EventManager() { };

EventManager.init = function () {
    runWindowEventHandlers();

    function runWindowEventHandlers() {
        // On window resize, updates canvas size and camera aspect ratio
        window.onresize = function () {
            Engine.renderer.setSize(window.innerWidth, window.innerHeight);
            Engine.camera.aspect = window.innerWidth / window.innerHeight;
            Engine.camera.updateProjectionMatrix();
        }
    }

}