var delta, controls;

window.onload = function () {
    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 5, 5], 0xffffff, 3, 100, 15);
    Engine.addCube("cube");
    Engine.addCube("cube2");

    //uses Orbit Control library to allow mouse movement
    controls = new THREE.OrbitControls( Engine.camera );
    controls.addEventListener( 'change', renderScene );

    clock = new THREE.Clock(); //starts the clock
    
    var t = 0;

    // Initialize buttons
    fpsButton = new FPSButton();
    pauseButton = new PauseButton();

    // Run event manager
    EventManager.init();

    // Start application
    animateScene();


    /**
     * Renders the frame
     */
    function renderScene() {

        delta = 5 * clock.getDelta(); //gets new time from clock

        Engine.uniforms.time.value += 0.2 * delta; //ups the shaders timer

        Engine.renderer.render(Engine.scene, Engine.camera);

    }

    /**
     * Runs the animation loop
     */
    function animateScene(){

        requestAnimationFrame(animateScene); //runs request for animation frame again

        if(!pauseButton.isPaused()) {

            //rotates cube around
            Engine.model["cube"].rotation.x += 0.02;
            Engine.model["cube"].rotation.y += 0.02;
            Engine.model["cube"].position.x = 0.5 * Math.sin(t);
            Engine.model["cube"].position.y = 0.5 * Math.cos(t);
            t > 2 * Math.PI ? t = 0 : t += 0.01;
            //EventManager.manageCameraMotion();

            fpsButton.refreshFPS();
        }

        renderScene(); //calls to render new frame
        controls.update(); //updates mouse orbit
    }
}