if (BABYLON.Engine.isSupported()) {
    //Initialisation canvas
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    //Initialisation camera
    //var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    //var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10,new BABYLON.Vector3(0, 0, 0), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), scene);

    var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

    camera.setPosition(new BABYLON.Vector3(-40, 40, 0));

    var light = new BABYLON.SpotLight("spot01", new BABYLON.Vector3(20, 40, 50),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light.intensity = 0.8;

    var lightSphere1 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere1.position = light.position;
    lightSphere1.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere1.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Lumiere 2
    var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(50, 40, 20),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light2.intensity = 10.8;

    var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere2.position = light2.position;
    lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Lumiere 3
    var light3 = new BABYLON.SpotLight("spot03", new BABYLON.Vector3(70, 40, 70),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light3.intensity = 2.4;

    var lightSphere3 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere3.position = light3.position;
    lightSphere3.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere3.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Lumiere 4
    var light4 = new BABYLON.SpotLight("spot04", new BABYLON.Vector3(50, 50, 70),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light4.intensity = 1.8;

    var light4 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    light4.position = light2.position;
    light4.material = new BABYLON.StandardMaterial("light", scene);
    light4.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;


    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap2.png", 500, 500, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("grass.png", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = 6.5;
    ground.material = groundMaterial;

    /*(function() {
        WaterMaterial = function (name, scene, light) {
            this.name = name;
            this.id = name;
            this.light = light;

            this._scene = scene;
            scene.materials.push(this);
        };


        WaterMaterial.prototype = Object.create(BABYLON.Material.prototype);

        WaterMaterial.bumpTexture = new BABYLON.Texture("water.png", scene);
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
        WaterMaterial.windForce = 45; // Represents the wind force applied on the water surface
        WaterMaterial.waveHeight = 1.3; // Represents the height of the waves
        WaterMaterial.bumpHeight = 0.3; // According to the bump map, represents the pertubation of reflection and refraction
        WaterMaterial.windDirection = new BABYLON.Vector2(1.0, 1.0); // The wind direction on the water surface (on width and height)
        WaterMaterial.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6); // Represents the water color mixed with the reflected and refracted world
        WaterMaterial.colorBlendFactor = 2.0; // Factor to determine how the water color is blended with the reflected and refracted world
        WaterMaterial.waveLength = 0.1; // The lenght of waves. With smaller values, more waves are generated
    })();
    */
    //var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 1000, 1000, 16, scene, false);  //2048, 2048, 16, scene, false);
    var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("13_DIFFUSE.png", scene);
    water.windForce = -10;
    water.waveHeight = 1.3;
    water.bumpHeight = 0.1;
    water.windDirection = new BABYLON.Vector2(1, 1);
    water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
    water.colorBlendFactor = 0.0;
    water.addToRenderList(skybox);
    waterMesh.material = water;


    /* var beforeRenderFunction = function () {
         // Camera
         if (camera.beta < 0.1)
             camera.beta = 0.1;
         else if (camera.beta > (Math.PI / 2) * 0.9)
             camera.beta = (Math.PI / 2) * 0.9;

         if (camera.radius > 50)
             camera.radius = 50;

         if (camera.radius < 5)
             camera.radius = 5;
     };*/

    camera.attachControl(canvas);

   // scene.registerBeforeRender(beforeRenderFunction);

    engine.runRenderLoop(function () {
        scene.render();
    });
}