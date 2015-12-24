if (BABYLON.Engine.isSupported()) {
    //Initialisation canvas
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    //Initialisation camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

    camera.setPosition(new BABYLON.Vector3(-40, 40, 0));

    // Skybox
    /*var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    */

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap.png", 100, 100, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("Tree.png", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.0;
    ground.material = groundMaterial;

    (function() {
        WaterMaterial = function (name, scene, light) {
            this.name = name;
            this.id = name;
            this.light = light;

            this._scene = scene;
            scene.materials.push(this);
        };

        WaterMaterial.prototype = Object.create(BABYLON.Material.prototype);

        // Properties
        WaterMaterial.prototype.needAlphaBlending = function () {
            return false;
        };

        WaterMaterial.prototype.needAlphaTesting = function () {
            return false;
        };

        // Methods
        WaterMaterial.prototype.isReady = function (mesh) {
            return true;
        };

        WaterMaterial.prototype.bind = function (world, mesh) {
        };

        WaterMaterial.prototype.dispose = function () {
            this.baseDispose();
        };
    })();
    var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);

    var beforeRenderFunction = function () {
        // Camera
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;

        if (camera.radius > 50)
            camera.radius = 50;

        if (camera.radius < 5)
            camera.radius = 5;
    };

    camera.attachControl(canvas);

    scene.registerBeforeRender(beforeRenderFunction);

    engine.runRenderLoop(function () {
        scene.render();
    });
}