////////////////////////////////////////////////////////////////////////////////
//
//  Main Class
//      Builds the entire 3D world with the assistance of the Engine Class
//      and administrates any dynamicity in the 3D world.
//  
////////////////////////////////////////////////////////////////////////////////

/*Globals*/
var delta, controls;
var PickachuToggle; //model vars
var fpsButton, pauseButton, resetButton; //web UI
var newColor; //used in render loop

var PikachuOBJ = {
        id: "Pikachu",
        folderPath: "/res/model/Pikachu/",
        objPath: "Pikachu Improved.obj",
        mtlPath: "Pikachu Improved.mtl"
}

var churchOBJ = {
    id: "Church",
    folderPath: "/res/model/Church/",
    objPath: "church.obj",
    mtlPath: "church.mtl"
}

window.onload = function () {

    guiInit();

    //Things above need to be done prior to Engine.init()

    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 2, 5], 0xffffff, 1.4, 100, 15);
    Engine.addPointLight("pl1", [5, 4, 2], 0xffffff, 1.4, 100, 15);
    Engine.addPointLight("pl2", [-5, 4, 2], 0xffffff, 1.4, 100, 15);
    Engine.addPointLight("pl3", [5, 4, -2], 0xffffff, 1.4, 100, 15);
    Engine.addPointLight("pl4", [-5, 4, -2], 0xffffff, 1.4, 100, 15);
    Engine.addPointLight("pl4", [0, 4, -5], 0xffffff, 1.4, 100, 15);
    Engine.addSkybox("negx.png", "posx.png", "posy.png", "negy.png", "posz.png", "negz.png","\\res\\skybox\\toonSky\\");
    Engine.addCube("cube");
    Engine.addModel(PikachuOBJ.id, PikachuOBJ.folderPath, PikachuOBJ.objPath, PikachuOBJ.mtlPath);
    Engine.loadModel(churchOBJ.id, churchOBJ.folderPath, churchOBJ.objPath, churchOBJ.mtlPath, false);


    //uses Orbit Control library to allow mouse movement
    controls = new THREE.OrbitControls(Engine.camera);

    clock = new THREE.Clock(); //starts the clock

    var t = 0;

    // Initialize buttons
    fpsButton = new FPSButton();
    pauseButton = new PauseButton();
    //resetButton = new ResetButton();
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
        if (Engine.model.skybox != null) {
            Engine.model.skybox.position.x = Engine.camera.position.x;
            Engine.model.skybox.position.y = Engine.camera.position.y;
            Engine.model.skybox.position.z = Engine.camera.position.z;
        }

        //sets the background color if option toggled
        if (params_BackgroundColor.toggle) {
            Engine.renderer.setClearColor(new THREE.Color(params_BackgroundColor.color));
        }

        //sets the point light color if option toggled
        if (params_LightColor.toggle) {
            newColor = new THREE.Color(params_LightColor.color);
            Engine.light["pl0"].color.set(newColor);
            Engine.light["pl1"].color.set(newColor);
        }

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