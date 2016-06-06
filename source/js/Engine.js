
function Engine() { };

Engine.init = function () {
    Engine.scene = new THREE.Scene();

    Engine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    Engine.camera.speed = 0.02;
    Engine.camera.theta = 0;
    Engine.camera.phi = 90;
    Engine.camera.camZoom = 1;
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
    var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    geometry.computeVertexNormals();
    var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    Engine.model[id] = new THREE.Mesh(geometry, material);
    Engine.scene.add(Engine.model[id]);
}