
function Engine() { };

Engine.init = function () {
    Engine.scene = new THREE.Scene();

    Engine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    Engine.camera.position.z = 5;

    Engine.renderer = new THREE.WebGLRenderer({ antialias: true });
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

Engine.addCube = function () {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.computeVertexNormals();
    var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    Engine.model["cube"] = new THREE.Mesh(geometry, material);
    Engine.scene.add(Engine.model["cube"]);
}