window.onload = function () {
    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 5, 5], 0xffffff, 3, 100, 15);
    Engine.addCube("cube");
    Engine.addCube("cube2");

    var t = 0;

    // Initialize buttons
    fpsButton = new FPSButton();
    pauseButton = new PauseButton();

    // Run event manager
    EventManager.init();

    // Start application
    renderScene();

    function renderScene() {
        requestAnimationFrame(renderScene);
        if(!pauseButton.isPaused()) {
            Engine.renderer.render(Engine.scene, Engine.camera);

            Engine.model["cube"].rotation.x += 0.02;
            Engine.model["cube"].rotation.y += 0.02;
            Engine.model["cube"].position.x = 0.5 * Math.sin(t);
            Engine.model["cube"].position.y = 0.5 * Math.cos(t);
            t > 2 * Math.PI ? t = 0 : t += 0.01;
            EventManager.manageCameraMotion();
            fpsButton.refreshFPS();
        }

    }
}