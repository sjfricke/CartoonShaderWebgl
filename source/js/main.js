window.onload = function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    var t = 0;

    // Run master event handler
    initializeMasterEventHandler();

    renderScene();

    function renderScene() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.x = 2 * Math.sin(t);
        cube.position.y = 2 * Math.cos(t);
        t > 2 * Math.PI ? t = 0 : t += 0.01;
    }

    function initializeMasterEventHandler() {
        // On window resize, updates canvas size and camera aspect ratio
        window.onresize = function () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }

    }
}