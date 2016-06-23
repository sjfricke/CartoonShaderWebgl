////////////////////////////////////////////////////////////////////////////////
//
//  Main Class
//      Builds the entire 3D world with the assistance of the Engine Class
//      and administrates any dynamicity in the 3D world.
//  
////////////////////////////////////////////////////////////////////////////////

/*Globals*/
var delta, controls;
var gui, params;
var PikachuOBJ, PickachuToggle;

window.onload = function () {

    gui = new dat.GUI(); //gets Control Panel Object
    //GUI parameters
    params = {
        Processed: true,
        Filter: 0,
        red: .5,
        green: .5,
        blue: .5,
        PikachuLoad: true
    }
    //Adds parameters to gui
    gui.add(params, 'Processed');
    gui.add(params, 'Filter', { "None": 0, "Diffuse": 1, "Depth 1": 2, "Depth 2": 3, "Depth 3": 4, "Sobel": 5, "Edge Normals": 6});
    gui.add(params, 'red', 0, 1);
    gui.add(params, 'green', 0, 1);
    gui.add(params, 'blue', 0, 1);
    PickachuToggle = gui.add(params, 'PikachuLoad');

    //Things above need to be done prior to Engine.init()

    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 2, 5], 0xffffff, 3, 100, 15);
    Engine.addPointLight("pl1", [0, -3, -5], 0xffffff, 3, 100, 15);
    Engine.addCube("cube");
    Engine.addModel("Pikachu", '/res/model/pikachu/', 'Pikachu Improved.obj', 'Pikachu Improved.mtl');

    PikachuOBJ = {
        id: "Pikachu",
        folderPath: "/res/model/pikachu/",
        objPath: "Pikachu Improved.obj",
        mtlPath: "Pikachu Improved.mtl"
    }
    // Fires on every change of the control pannel
    PickachuToggle.onChange(function (value) {

        if (value) {
            Engine.addModel("Pikachu", '/res/model/pikachu/', 'Pikachu Improved.obj', 'Pikachu Improved.mtl');
        } else {
            Engine.removeModel("Pikachu");
        }
    });


    //uses Orbit Control library to allow mouse movement
    controls = new THREE.OrbitControls(Engine.camera);

    clock = new THREE.Clock(); //starts the clock

    var t = 0;

    // Initialize buttons
    fpsButton = new FPSButton();
    pauseButton = new PauseButton();
    document.onkeypress = function (e) {
        if (e.keyCode == 32) {
            pauseButton.button.click();
        }
    }

    // Run event manager
    EventManager.init();

    // Start application
    animateScene();

    /*** INNER FUNCTIONS ***/
    /**
     * Renders the frame
     */
    function renderScene() {
        /* Features that never pause */
        Engine.renderer.setClearColor(new THREE.Color(params.red, params.green, params.blue));
        Engine.vpQuad.material.uniforms.filterMode.value = params.Filter;
        // // Uncomment to allow motion control through keyboard
        //EventManager.manageCameraMotion();
        
        /* Features paused when user clicks the pause button */
        if (!pauseButton.isPaused()) {
            delta = 5 * clock.getDelta(); //gets new time from clock
            Engine.uniforms.time.value += 0.2 * delta; //ups the shaders timer

            //rotates cube around
            Engine.model["cube"].rotation.x += 0.02;
            Engine.model["cube"].rotation.y += 0.02;
            Engine.model["cube"].position.x = 5 * Math.sin(t);
            Engine.model["cube"].position.y = 5 * Math.cos(t);
            t > 2 * Math.PI ? t = 0 : t += 0.01;

            fpsButton.refreshFPS();
        }

        Engine.render(params.Processed);

    }

    /**
     * Runs the animation loop
     */
    function animateScene() {
        requestAnimationFrame(animateScene); //runs request for animation frame again
        
        renderScene(); //calls to render new frame

        controls.update(); //updates mouse orbit

    }

}