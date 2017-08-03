(function (win, doc) {

    'use strict';

    var world, shape, body, ground, timeStep = 1 / 60,
        camera, scene, renderer, cube, plane,
        cubeSize = 1.5;

    function createCube(w, h, d) {
        var geometry = new THREE.CubeGeometry(w, h, d, 10, 10);
        var material = new THREE.MeshLambertMaterial({
            color: 0x666666
        });
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    function createPlane(w, h) {
        var geometry = new THREE.PlaneGeometry(w, h);
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xeeeeee,
            shininess: 50
        });
        var mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    function initCannon() {
        //Cannonの世界を生成
        world = new CANNON.World();

        //重力を設定
        world.gravity.set(0, -9.82, 0);
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;
        world.solver.tolerance = 0.1;

        //地面用にPlaneを生成
        var plane = new CANNON.Plane();

        //Planeの剛体を質量0で生成する
        ground= new CANNON.RigidBody(0, plane);

        //X軸に90度（つまり地面）に回転
        ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.add(ground);

        //Boxのシェイプを生成
        shape = new CANNON.Box(new CANNON.Vec3(cubeSize, cubeSize, cubeSize));

        //質量は1
        var mass = 1;
        body = new CANNON.RigidBody(mass, shape);
        body.position.y = 10;

        //Z軸に10の角速度を設定
        body.angularVelocity.set(0, 0, 10);
        body.angularDamping = 0.1;
        world.add(body);
    }

    function initThree() {
        var w = win.innerWidth;
        var h = win.innerHeight;
        camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
        camera.position.set(Math.cos(Math.PI / 5) * 30, 5, Math.sin(Math.PI / 5) * 30);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 200);
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 1);
        renderer.shadowMapEnabled = true;

        var light = new THREE.DirectionalLight(0xffffff, 2);
        var amb   = new THREE.AmbientLight(0x404040);
        var d = 10;

        light.position.set(d, d, -d);

        light.castShadow = true;
        // light.shadowCameraVisible = true;

        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

        light.shadowCameraLeft = -d;
        light.shadowCameraRight = d;
        light.shadowCameraTop = d;
        light.shadowCameraBottom = -d;

        light.shadowCameraFar = 100;
        light.shadowCameraNear = 0;
        light.shadowDarkness = 0.5;

        cube = createCube(cubeSize, cubeSize, cubeSize);
        cube.castShadow = true;
        cube.receiveShadow = true;

        plane = createPlane(300, 300);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = cubeSize / 2;
        plane.receiveShadow = true;

        scene.add(camera);
        scene.add(light);
        scene.add(amb);
        scene.add(cube);
        scene.add(plane);

        doc.body.appendChild(renderer.domElement);

        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        updatePhysics();
        render();
    }

    function updatePhysics() {
        //物理エンジンの時間を進める
        world.step(timeStep);

        //物理エンジンで計算されたbody(RigidBody)の位置をThree.jsのMeshにコピー
        body.position.copy(cube.position);
        body.quaternion.copy(cube.quaternion);
        //ground.position.copy(plane.position);
        //ground.quaternion.copy(plane.quaternion);
    }

    function render() {
        renderer.render(scene, camera);
    }

    initCannon();
    initThree();
    animate();

    Leap.loop({enableGestures: true}, function(frame){

      if(frame.valid && frame.gestures.length > 0){
          frame.gestures.forEach(function(gesture){
            switch (gesture.type){
              // case "circle":
              //   $('#gesture').html('<p>circle</p>');
              //   break;
              case "keyTap":
                body.applyImpulse(new CANNON.Vec3(0, 5, 0), body.position);
                break;
              case "screenTap":
                body.applyImpulse(new CANNON.Vec3(0, 5, 0), body.position);
                break;
              case "swipe":
                body.applyImpulse(new CANNON.Vec3(0, 5, 0), body.position);
                break;
              }
          });
        }
    });

}(window, document));
