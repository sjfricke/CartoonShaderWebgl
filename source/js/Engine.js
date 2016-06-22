////////////////////////////////////////////////////////////////////////////////
//
//  Engine Class
//      Manages the entire 3D world and any process involved.
//  
////////////////////////////////////////////////////////////////////////////////

function Engine() { };

Engine.init = function () {
    initCamera();

    initRenderer();

    initFirstPass();

    initVirtualViewport();

    // Creates list of lights in scene
    Engine.light = {};

    // Create list of models in scene
    Engine.model = {};

    //sets uniform for shaders
    Engine.uniforms = {
        outColor: { type: "v3", value: new THREE.Vector3(0, 1, 0) },
        time: { type: "f", value: 1.0 }
    };

    //creates shaderMaterial with uniforms and shaders
    Engine.ShaderMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    /* INITIALIZATION FUNCTIONS */
    function initCamera() {
        Engine.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50);
        Engine.camera.speed = 0.02;
        Engine.camera.theta = 0;
        Engine.camera.phi = 90;
        Engine.camera.camZoom = 10;
        Engine.camera.position.z = Engine.camera.camZoom;
        Engine.camera.lookAtPos = new THREE.Vector3(0, 0, 0);
        Engine.camera.eyeSideDir = new THREE.Vector3(1, 0, 0);
        Engine.camera.eyeDir = (new THREE.Vector3(
            Engine.camera.lookAtPos.x - Engine.camera.position.x,
            Engine.camera.lookAtPos.y - Engine.camera.position.y,
            Engine.camera.lookAtPos.z - Engine.camera.position.z
        )).normalize();
    }

    function initRenderer() {
        Engine.renderer = new THREE.WebGLRenderer({ antialias: true });
        Engine.renderer.setClearColor(0x2A3744);
        Engine.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(Engine.renderer.domElement);
    }

    // Initializes components for First Pass Render
    function initFirstPass() {
        // Initializes the 3D scene where all the world objects reside
        Engine.scene = new THREE.Scene();

        // Initializes the render target for the first pass render
        Engine.renderTarget = new THREE.WebGLRenderTarget(screen.width, screen.height,
                    { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
        // Enable depth buffer texture 
        Engine.renderTarget.depthTexture = new THREE.DepthTexture();
    }

    // Initializes the virtual viewport to display the processed scene
    function initVirtualViewport() {
        // Initialize the camera to look at the virtual viewport
        Engine.vpCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Initialize the final processed image
        Engine.finalScene = new THREE.Scene();

        // Initialize quad that simulates the viewport and displays the final image
        Engine.vpQuad = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2), // window wide
            new THREE.ShaderMaterial({
                vertexShader: document.querySelector('#post-vert').textContent.trim(),
                fragmentShader: document.querySelector('#post-frag').textContent.trim(),
                uniforms: {
                    cameraNear: { value: Engine.camera.near },
                    cameraFar: { value: Engine.camera.far },
                    tDiffuse: { value: Engine.renderTarget.texture },
                    tDepth: { value: Engine.renderTarget.depthTexture },
                    filterMode: { value: params.Filter } // mode controlled by GUI element
                }
            }));
        Engine.finalScene.add(Engine.vpQuad);
    }
}

Engine.addModel = function (id, folderPath, objPath, mtlPath) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(folderPath);
    mtlLoader.load(mtlPath, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(folderPath);
        objLoader.load(objPath, function (object) {
            Engine.model[id] = object;
            Engine.model[id].position.y = -2;

            // // Uncomment to enable custom shading (Engine.ShaderMaterial)
            // Engine.model[id].traverse(function (child) {
            // 
            //     if (child instanceof THREE.Mesh) {
            // 
            //         child.material = Engine.ShaderMaterial;
            // 
            //     }
            // 
            // });

            Engine.scene.add(Engine.model[id]);

            // // Draws wireframe on top of objects surface
            // Engine.model[id].edges = new THREE.EdgesHelper(object.children[0], 0x000000);
            // Engine.scene.add(Engine.model[id].edges);
        });
    });
}

Engine.removeModel = function (id) {
    Engine.scene.remove(Engine.model[id]);
}

Engine.addAmbientLight = function (id, color, intensity) {
    // Work aroud for missing params
    if (color === undefined) { color = 0xffffff; }
    if (intensity === undefined) { intensity = 1; }
    
    // Require ID to successfully add light source
    if (id !== undefined) {
        Engine.light[id] = new THREE.AmbientLight(color, intensity);
        Engine.scene.add(Engine.light[id]);
    }
}

Engine.addPointLight = function (id, pos, color, intensity, dist, decay) {
    // Work aroud for missing params
    if (color === undefined) { color = 0xffffff;}
    if (intensity === undefined) { intensity = 1;}
    if (dist === undefined) { dist = 0;}
    if (decay === undefined) { decay = 0; }

    // Require ID and position to successfully add light source
    if (id !== undefined && pos !== undefined) {
        Engine.light[id] = new THREE.PointLight(color, intensity, dist, decay);
        Engine.light[id].position.set(pos[0], pos[1], pos[2]);
        Engine.scene.add(Engine.light[id]);
    }
}

Engine.addCube = function (id) {
    // Require ID to successfully add cube
    if (id !== undefined) {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        geometry.computeVertexNormals();

        //var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        //Engine.model[id] = new THREE.Mesh(geometry, material);

        //grabs the material shader
        Engine.model[id] = new THREE.Mesh(geometry, Engine.ShaderMaterial);
        Engine.scene.add(Engine.model[id]);

        // // Draws wireframe on top of objects surface
        // Engine.model[id].edges = new THREE.EdgesHelper(Engine.model[id], 0x000000);
        // Engine.finalScene.add(Engine.model[id].edges);
    }
}

Engine.render = function (isProcessed) {
    // Render onto our off-screen texture
    Engine.renderer.render(Engine.scene, Engine.camera, Engine.renderTarget);

    if (isProcessed) {
        // Display processed scene
        Engine.renderer.render(Engine.finalScene, Engine.vpCamera);
    } else {
        // Display original scene
        Engine.renderer.render(Engine.scene, Engine.camera);
    }
}