/*Globals*/
var delta, controls;
var gui, params;
var PikachuOBJ, PickachuToggle;


PikachuOBJ = {
    id: "Pikachu",
    folderPath : "/res/model/pikachu/",
    objPath: "Pikachu Improved.obj",
    mtlPath: "Pikachu Improved.mtl"
}

window.onload = function () {

    gui = new dat.GUI(); //gets Control Panel Object
    //GUI parameters
    params = {
        red: .5,
        green: .5,
        blue: .5,
        PikachuLoad: false
    }
    //Adds parameters to gui
    gui.add(params, 'red', 0, 1);
    gui.add(params, 'green', 0, 1);
    gui.add(params, 'blue', 0, 1);
    PickachuToggle = gui.add(params, 'PikachuLoad');



    //Things above need to be done prior to Engine.init()

    Engine.init();
    Engine.addAmbientLight("al0", 0xffffff, 0.1);
    Engine.addPointLight("pl0", [0, 5, -5], 0xffffff, 3, 100, 15);
    Engine.addPointLight("pl0", [5, 5, 5], 0xffffff, 3, 100, 15);
    Engine.addPointLight("pl0", [-5, 5, 5], 0xffffff, 3, 100, 15);
   // Engine.addCube("cube");
   // Engine.addCube("cube2");




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

        //updates color to render from control panel
        //Engine.renderer.setClearColor( new THREE.Color(params.red,  params.green, params.blue) );
        Engine.uniforms.outColor.value =  new THREE.Color(params.red,  params.green, params.blue);

        if(!pauseButton.isPaused()) {

            //rotates cube around
            // Engine.model["cube"].rotation.x += 0.02;
            // Engine.model["cube"].rotation.y += 0.02;
            // Engine.model["cube"].position.x = 5 * Math.sin(t);
            // Engine.model["cube"].position.y = 5 * Math.cos(t);
            // t > 2 * Math.PI ? t = 0 : t += 0.01;
            //EventManager.manageCameraMotion();

            fpsButton.refreshFPS();
        }

        renderScene(); //calls to render new frame
        controls.update(); //updates mouse orbit
    }

    // Fires on every change of the control pannel
    PickachuToggle.onChange(function(value) {

        if (value) {
            Engine.addModel("Pikachu", '/res/model/pikachu/', 'Pikachu Improved.obj', 'Pikachu Improved.mtl');
        } else {
            Engine.removeModel("Pikachu");  
        }
    });

}