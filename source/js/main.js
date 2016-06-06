window.onload = function () {
    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 5, 5], 0xffffff, 3, 100, 15);
    Engine.addCube();

    // For FPS purposes
    var now;
    var then = Date.now() / 1000;
    var numFramesToAverage = 16;
    var frameTimeHistory = [];
    var frameTimeIndex = 0;
    var totalTimeForFrames = 0;
    var fpsBox = document.createElement("div");
    var fps = 0;
    fpsBox.innerText = "fps: " + fps;
    fpsBox.style =
        "background-color: #ED2553;"
        + "width: 5em;"
        + "border-radius: 10px;"
        + "font-size: 12px;"
        + "display: inline-block;"
        + "padding: 5px;"
        + "text-align: center;"
        + "font-family: Arial Black;"
        + "color: white;"
        + "position: absolute;"
        + "left: 1em;"
        + "top: 1em;"
        + "cursor: pointer;";
    document.body.appendChild(fpsBox);

    var t = 0;

    // Run event manager
    EventManager.init();

    // Start application
    renderScene();

    function renderScene() {
        requestAnimationFrame(renderScene);
        Engine.renderer.render(Engine.scene, Engine.camera);

        Engine.model["cube"].rotation.x += 0.01;
        Engine.model["cube"].rotation.y += 0.01;
        Engine.model["cube"].position.x = 2 * Math.sin(t);
        Engine.model["cube"].position.y = 2 * Math.cos(t);
        t > 2 * Math.PI ? t = 0 : t += 0.01;

        getFPS();

    }

    function getFPS() {
        var now = Date.now() / 1000;  // get time in seconds

        // compute time since last frame
        var elapsedTime = now - then;
        then = now;

        // update the frame history.
        // Add the new time and substract the oldest time from the total
        totalTimeForFrames += elapsedTime - (frameTimeHistory[frameTimeIndex] || 0);
        // record the new time
        frameTimeHistory[frameTimeIndex] = elapsedTime;
        // advance the history index.
        frameTimeIndex = (frameTimeIndex + 1) % numFramesToAverage;

        // compute fps
        var averageElapsedTime = totalTimeForFrames / numFramesToAverage;
        fps = 1 / averageElapsedTime;
        fpsBox.innerText = "fps: " + fps.toFixed(2);
    }
}