if (BABYLON.Engine.isSupported()) {
  createScene();
}

/**
 * Function createScene. This function create the complete game view (the scene).
 * @returns {BABYLON.Scene}
 */
function createScene() {
  //Initialisation canvas
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  //Initialisation camera
  //var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
  //var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10,new BABYLON.Vector3(0, 0, 0), scene);
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 1000, new BABYLON.Vector3(0, 0, 0), scene);

  var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

  camera.setPosition(new BABYLON.Vector3(-40, 40, 0));

  //Lights initialization
  initialisationLights(scene);

  //Create the skybox
  skybox = initialisationSkyBox(scene);

  initialisationGround(scene);


  createGolfHole(scene);

  initialisationWater(scene);

  camera.attachControl(canvas);

  // scene.registerBeforeRender(beforeRenderFunction);

  engine.runRenderLoop(function () {
    scene.render();
  });
}


/**
 * Function getLights. This function initializes three lights in the scene (in the game)
 * @param scene
 */

function initialisationLights(scene) {
  //Lumiere 1
  var light = new BABYLON.SpotLight("spot01", new BABYLON.Vector3(-50, 40, -32),
    new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
  light.intensity = 108;

  var lightSphere1 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
  lightSphere1.position = light.position;
  lightSphere1.material = new BABYLON.StandardMaterial("light", scene);
  lightSphere1.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

  // Lumiere 2
  var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(-80, 250, -80),
    new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
  light2.intensity = 100;

  var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
  lightSphere2.position = light2.position;
  lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
  lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

  // Lumiere 3
  var light3 = new BABYLON.SpotLight("spot03", new BABYLON.Vector3(350, 250, 350),
    new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
  light3.intensity = 100.4;

  var lightSphere3 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
  lightSphere3.position = light3.position;
  lightSphere3.material = new BABYLON.StandardMaterial("light", scene);
  lightSphere3.material.emissiveColor = new BABYLON.Color3(1, 1, 0);


}

/**
 * Function createGolfHole. THis function initializes the golf hole.
 * @param scene
 * @returns {*}
 */
function createGolfHole(scene) {
  var hole = BABYLON.Mesh.CreateCylinder("cylinder", 3, 10, 10, 6, 1, scene, false);// 15,15,
  hole.position = new BABYLON.Vector3(-180, 6, -180);
  hole.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  hole.diffuseColor = new BABYLON.Color3(0, 1, 0);
  return hole;
}

/**
 * Function initialisationSkyBox. This function initializes the skybox (game box).
 * @param scene
 */
function initialisationSkyBox(scene) {
  // Skybox
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1600.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
  return skybox;
}

/**
 * Function initialisationGround. This function initializes the ground (game floor).
 * @param scene
 */
function initialisationGround(scene) {
  var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap2.png", 500, 1000, 100, 0, 10, scene, false);
  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/grass.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.y = 7;
  ground.material = groundMaterial;
}


/**
 * Function initialisationWater. This function initializes the water.
 * @param scene
 */
function initialisationWater(scene) {
  //var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
  var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 1600, 1600, 16, scene, false);  //2048, 2048, 16, scene, false);
  var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
  water.backFaceCulling = true;
  water.bumpTexture = new BABYLON.Texture("textures/13_DIFFUSE.png", scene); //13_DIFFUSE
  water.windForce = -10;
  water.waveHeight = 0.5;
  water.bumpHeight = 0.1;
  water.windDirection = new BABYLON.Vector2(1, 1);
  water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
  water.colorBlendFactor = 0.0;
  water.addToRenderList(skybox);
  waterMesh.material = water;
}
