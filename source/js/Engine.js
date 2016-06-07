
function Engine() { };

Engine.init = function () {
    Engine.scene = new THREE.Scene();

    Engine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    Engine.camera.speed = 0.02;
    Engine.camera.theta = 0;
    Engine.camera.phi = 90;
    Engine.camera.camZoom = 10;
    Engine.camera.position.z = Engine.camera.camZoom;
    Engine.camera.lookAtPos = new THREE.Vector3( 0, 0, 0 );
    Engine.camera.eyeSideDir = new THREE.Vector3( 1, 0, 0 );
    Engine.camera.eyeDir = ( new THREE.Vector3(
        Engine.camera.lookAtPos.x - Engine.camera.position.x,
        Engine.camera.lookAtPos.y - Engine.camera.position.y,
        Engine.camera.lookAtPos.z - Engine.camera.position.z
    ) ).normalize();

    Engine.renderer = new THREE.WebGLRenderer({ antialias: true });
    Engine.renderer.setClearColor( 0x2A3744 );
    Engine.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(Engine.renderer.domElement);

    // Creates list of lights in scene
    Engine.light = {};

    // Create list of models in scene
    Engine.model = {};

    //sets uniform for shaders
    Engine.uniforms =  {
        outColor: { type: "v3", value: new THREE.Vector3( 0, 1, 0 ) },
        time: { type: "f", value: 1.0 }
    };

    //creates shaderMaterial with uniforms and shaders
    Engine.ShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: this.uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

}

Engine.addModel = function (id, folderPath, objPath, mtlPath) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(folderPath);
    mtlLoader.load( mtlPath, function( materials ) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath(folderPath);
        objLoader.load( objPath, function ( object ) {
            Engine.model[id] = object;
            Engine.scene.add( Engine.model[id] );
        });
    });
}

Engine.removeModel = function (id) {
    Engine.scene.remove( Engine.model[id] );
}

Engine.addAmbientLight = function (id, color, intensity) {
    Engine.light[id] = new THREE.AmbientLight( color, intensity );
    Engine.scene.add( Engine.light[id] );
}

Engine.addPointLight = function (id, pos, color, intensity, dist, decay) {
    Engine.light[id] = new THREE.PointLight( color, intensity, dist, decay );
    Engine.light[id].position.set( pos[0], pos[1], pos[2] );
    Engine.scene.add( Engine.light[id] );
}

Engine.addCube = function (id) {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.computeVertexNormals();

    //var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    //Engine.model[id] = new THREE.Mesh(geometry, material);


    //grabs the material shader
    Engine.model[id] = new THREE.Mesh(geometry, Engine.ShaderMaterial);

    Engine.scene.add(Engine.model[id]);
}

