
function EventManager() { };

EventManager.init = function () {
    keysdown = {};

    document.body.onkeydown = function(e) {
        var event = window.event ? window.event : e;
        keysdown[event.keyCode] = true;
        e.stopPropagation();
    };
    document.body.onkeyup = function(e) {
        var event = window.event ? window.event : e;
        delete keysdown[event.keyCode];
        e.stopPropagation();
    };

    runWindowEventHandlers();

    function runWindowEventHandlers() {
        // On window resize, updates canvas size and camera aspect ratio
        window.onresize = function () {
            Engine.renderer.setSize(window.innerWidth, window.innerHeight);
            Engine.camera.aspect = window.innerWidth / window.innerHeight;
            Engine.camera.updateProjectionMatrix();
        }
    }

}

EventManager.manageCameraMotion = function () {
    // W key >> move cam forward
    if (keysdown[87]) {
        var deltVec = new THREE.Vector3(
            Engine.camera.eyeDir.x,
            0,
            Engine.camera.eyeDir.z
        ).normalize().multiplyScalar(Engine.camera.speed);

        Engine.camera.position.x += deltVec.x;
        Engine.camera.position.z += deltVec.z;
        Engine.camera.lookAtPos.x += deltVec.x;
        Engine.camera.lookAtPos.z += deltVec.z;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }

    // S key >> move cam backward
    if (keysdown[83]) {
        var deltVec = new THREE.Vector3(
            Engine.camera.eyeDir.x,
            0,
            Engine.camera.eyeDir.z
        ).normalize().multiplyScalar(Engine.camera.speed);

        Engine.camera.position.x -= deltVec.x;
        Engine.camera.position.z -= deltVec.z;
        Engine.camera.lookAtPos.x -= deltVec.x;
        Engine.camera.lookAtPos.z -= deltVec.z;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }

    // A key >> move cam left
    if (keysdown[65]) {
        var deltVec = new THREE.Vector3(
            Engine.camera.eyeSideDir.x,
            0,
            Engine.camera.eyeSideDir.z
        ).normalize().multiplyScalar(Engine.camera.speed);

        Engine.camera.position.x -= deltVec.x;
        Engine.camera.position.z -= deltVec.z;
        Engine.camera.lookAtPos.x -= deltVec.x;
        Engine.camera.lookAtPos.z -= deltVec.z;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }

    // D key >> move cam right
    if (keysdown[68]) {
        var deltVec = new THREE.Vector3(
            Engine.camera.eyeSideDir.x,
            0,
            Engine.camera.eyeSideDir.z
        ).normalize().multiplyScalar(Engine.camera.speed);

        Engine.camera.position.x += deltVec.x;
        Engine.camera.position.z += deltVec.z;
        Engine.camera.lookAtPos.x += deltVec.x;
        Engine.camera.lookAtPos.z += deltVec.z;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }

    // Q key >> move cam up
    if (keysdown[81]) {
        Engine.camera.position.y += Engine.camera.speed;
        Engine.camera.lookAtPos.y += Engine.camera.speed;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }

    // D key >> move cam down
    if (keysdown[69]) {
        Engine.camera.position.y -= Engine.camera.speed;
        Engine.camera.lookAtPos.y -= Engine.camera.speed;
        Engine.camera.lookAt(Engine.camera.lookAtPos);
    }


    if(keysdown[37] || keysdown[38] || keysdown[39] || keysdown[40]) {
        if (keysdown[39]) {
            // right arrow >> spin camera right
            Engine.camera.theta += 5;
        }
        if (keysdown[37]) {
            // left arrow >> spin camera left
            Engine.camera.theta -= 5;
        }

        if (keysdown[40]) {
            // down arrow >> orient camera down
            if (Engine.camera.phi < 180 - 5) {
                Engine.camera.phi += 5;
            }
        }

        if (keysdown[38]) {
            // up arrow >> orient camera up
            if (Engine.camera.phi > 5) {
                Engine.camera.phi -= 5;
            }
        }

        Engine.camera.position.x = Engine.camera.lookAtPos.x + Engine.camera.camZoom *
            Math.sin(Engine.camera.theta * (Math.PI / 180)) * Math.sin(Engine.camera.phi * (Math.PI / 180));
        Engine.camera.position.y = Engine.camera.lookAtPos.y + Engine.camera.camZoom *
            Math.cos(Engine.camera.phi * (Math.PI / 180));
        Engine.camera.position.z = Engine.camera.lookAtPos.z + Engine.camera.camZoom *
            Math.cos(Engine.camera.theta * (Math.PI / 180)) * Math.sin(Engine.camera.phi * (Math.PI / 180));
        Engine.camera.lookAt(Engine.camera.lookAtPos);

        Engine.camera.eyeDir = ( new THREE.Vector3(
            Engine.camera.lookAtPos.x - Engine.camera.position.x,
            Engine.camera.lookAtPos.y - Engine.camera.position.y,
            Engine.camera.lookAtPos.z - Engine.camera.position.z
        ) ).normalize();

        Engine.camera.eyeSideDir = ( new THREE.Vector3() ).crossVectors(
            Engine.camera.eyeDir, new THREE.Vector3(0, 1, 0)).normalize();
    }
}