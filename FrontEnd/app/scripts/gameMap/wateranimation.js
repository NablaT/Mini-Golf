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
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), scene);

  var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

  camera.setPosition(new BABYLON.Vector3(-10, 1000, 0));

  //Lights initialization
  initialisationLights(scene);

  //Create the skybox
  skybox = initialisationSkyBox(scene);

  //We initialize the ground
  initialisationGround(scene);

  //We initialize the stairs
  //initialisationStairs(scene);

  //We initialize the track
  initialisationTrack(scene);

  //We create the starting point
  initialisationStartingPoint(scene);

  //Create the golf hole
  createGolfHole(scene);

  //Create boxes for the envrionment
  createBoxes(scene);

  //La source d'eau
  var fountain = initialisationFountain(scene);

  //On crée les particules et leurs comportements.
  var particleSystem = initialisationParticles(scene, fountain);

  particleSystem.start();

  //On initialise l'animation
  var animation = initialisationAnimation();

  fountain.animations.push(animation);

  //on lance l'animation
  scene.beginAnimation(fountain, 0, 100, true);

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
  // Lumiere 3
  var light3 = new BABYLON.SpotLight("spot03", new BABYLON.Vector3(-400, 50, 630),
    new BABYLON.Vector3(8, -1, -10), 1.1, 16, scene);
  light3.intensity = 100.4;
  light3.rotation = new BABYLON.Vector3(0, Math.PI , 0);
  var lightSphere3 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
  lightSphere3.position = light3.position;
  lightSphere3.material = new BABYLON.StandardMaterial("light", scene);
  lightSphere3.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
  lightSphere3.rotation=new BABYLON.Vector3(0, Math.PI , 0);
}

/**
 * Function createGolfHole. THis function initializes the golf hole.
 * @param scene
 * @returns {*}
 */
function createGolfHole(scene) {
  var hole = BABYLON.Mesh.CreateCylinder("cylinder", 3, 30, 10, 6, 1, scene, false);// 15,15,
  var holeMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  hole.position = new BABYLON.Vector3(180, 6, -350);
  hole.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  hole.diffuseColor = new BABYLON.Color3(0, 0, 0);


  holeMaterial.diffuseTexture = new BABYLON.Texture("textures/hole.png", scene);
  hole.material = holeMaterial;
  return hole;
}

/**
 * Function initialisationSkyBox. This function initializes the skybox (game box).
 * @param scene
 */

function initialisationSkyBox(scene) {
  // Skybox
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
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
  //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap2.png", 800, 1200, 100, 0, 10, scene, false);
  var ground = BABYLON.Mesh.CreateGround("ground", 800, 1200, 100, scene);
  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/grass.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.y = 7;
  ground.material = groundMaterial;
}


/**
 * Function initialisationFountain. This function initializes the fountain. The fountain is the source of water.
 * @param scene
 * @returns {*}
 */
function initialisationFountain(scene) {
  // On crée ensuite l'objet fountain. Cet objet est une sphere et va servir de "source visuelle"
  // a la fontaine.
  var fountain = BABYLON.Mesh.CreateSphere("foutain", 1, 1, scene); // 15,15,
  fountain.position = new BABYLON.Vector3(250, 17, 550);
  fountain.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 2 * (Math.PI));
  return fountain;
}

/**
 * Function initliasationParticles. This function initializes particles behavior.
 * @param scene
 * @param fountain
 * @returns {BABYLON.ParticleSystem}
 */
function initialisationParticles(scene, fountain) {
  // On cree une particule. Cette particule correspond a une goute d'eau de la fontaine.
  var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);

  //On definit la texture de la particule
  particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

  // On definit la source de la particule. L'emetteur est ici notre fontaine.
  particleSystem.emitter = fountain; // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(50, 0, 0); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(-50, 0, -1); // To...

  // On definit les couleurs de particules. On definit un spectre de 3 couleurs.
  /*particleSystem.color1 = new BABYLON.Color4(0, 0.7, 1, 1.0);
   particleSystem.color2 = new BABYLON.Color4(0, 0.4, 1, 1.0);
   particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.7, 0.0);
   */

  particleSystem.color1 = new BABYLON.Color4(0.7, 0, 0, 1.0);
  particleSystem.color2 = new BABYLON.Color4(1, 0, 0, 1.0);
  particleSystem.colorDead = new BABYLON.Color4(0.9, 0.3, 0.2, 0.0);

  // On definit la taille d'une particule. On donne deux valeurs qui sont la taille minimum
  // et la taille minimum de nos particules. Ensuite un random est fait entre ces deux valeurs
  // lors de la creation du particule
  particleSystem.minSize = 5; //0.1;
  particleSystem.maxSize = 7; //0.5;

  // On définit la durée de vie d'une particule. Comme pour sa taille, on donne deux valeurs min/max
  //et on randomise ensuite la durée de vie d'une particule emise
  particleSystem.minLifeTime = 3.5//0.8;
  particleSystem.maxLifeTime = 4.5;//2.1;

  // On definit le taux d'émission des particules
  particleSystem.emitRate = 1000000;

  // On initialise ensuite le blend mode du system de particule à BLENDMODE_ONEONE (ou BLENDMODE_STANDARD)
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

  // On définit la gravité des particules
  particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);//(0, -9.81, 0);

  // On définit la direction de propagation des particules
  particleSystem.direction1 = new BABYLON.Vector3(-4, 8, 3);
  particleSystem.direction2 = new BABYLON.Vector3(4, 8, -3);

  // On définit l'angle des particules (aleatoirement entre le max et le min)
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = 0;//Math.PI;

  // On définit la vitesse de propagation (min et max) et la vitesse de mise a jour
  particleSystem.minEmitPower = 5;
  particleSystem.maxEmitPower = 7;
  particleSystem.updateSpeed = 0.015;
  return particleSystem;
}

/**
 * Function initialisationAnimation. This function initializes all fountain's animation.
 * @returns {*}
 */
function initialisationAnimation() {
  var keys = [];
  //On initialise la variable animation
  var animation = new BABYLON.Animation("animation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  // At the animation key 0, the value of scaling is "1"
  keys.push({
    frame: 0,
    value: 0
  });

  // At the animation key 50, the value of scaling is "0.2"
  keys.push({
    frame: 50,
    value: (Math.PI) / 2
  });

  // Launch animation
  animation.setKeys(keys);
  return animation;
}

/**
 * Function initialisationStartingPoint. This function initializes the starting point
 */

function initialisationStartingPoint(scene) {
  var ground = BABYLON.Mesh.CreateGround("ground", 50, 50, 100, scene);

  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/sand3.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.rotation = new BABYLON.Vector3(0, Math.PI / 5.2, 0);
  ground.position.z = 450;
  ground.position.x = -290;
  ground.position.y = 7.5;
  ground.material = groundMaterial;
}

/**
 * Function initialisationWater. This function initializes the water.
 * @param scene
 */
function initialisationWater(scene) {
  //var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
  var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 2000, 2000, 16, scene, false);  //2048, 2048, 16, scene, false);
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

/**
 * Function initialisationTrack. This function create the golf track. We just create walls.
 * @param scene
 */
function initialisationTrack(scene) {

  /*var wall1 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial1 = new BABYLON.StandardMaterial("wall", scene);
   wall1.scaling.x = 70;
   wall1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
   wall1.position = new BABYLON.Vector3(150, 15, 200);
   wallMaterial1.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall1.material = wallMaterial1;

   var wall2 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial2 = new BABYLON.StandardMaterial("wall", scene);
   wall2.scaling.x = 70;
   wall2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
   wall2.position = new BABYLON.Vector3(-150, 15, 200);
   wallMaterial2.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall2.material = wallMaterial2;

   var wall3 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial3 = new BABYLON.StandardMaterial("wall", scene);
   wall3.scaling.x = 15;
   wall3.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
   wall3.position = new BABYLON.Vector3(-220, 15, -150);
   wallMaterial3.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall3.material = wallMaterial3;

   var wall4 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial4 = new BABYLON.StandardMaterial("wall", scene);
   wall4.scaling.x = 37;
   wall4.scaling.x = 15;
   wall4.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
   wall4.position = new BABYLON.Vector3(220, 15, -150);
   wallMaterial4.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall4.material = wallMaterial4;

   var wall5 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial5 = new BABYLON.StandardMaterial("wall", scene);
   wall5.scaling.x = 41;
   wall5.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
   wall5.position = new BABYLON.Vector3(300, 15, -350);
   wallMaterial5.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall5.material = wallMaterial5;

   var wall5 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
   var wallMaterial5 = new BABYLON.StandardMaterial("wall", scene);
   wall5.scaling.x = 41;
   wall5.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
   wall5.position = new BABYLON.Vector3(-300, 15, -350);
   wallMaterial5.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
   wall5.material = wallMaterial5;
   */
  var wall6 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
  var wallMaterial6 = new BABYLON.StandardMaterial("wall", scene);
  wall6.scaling.x = 60;
  wall6.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
  wall6.position = new BABYLON.Vector3(0, 15, -550);
  wallMaterial6.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
  wall6.material = wallMaterial6;

  var wall7 = BABYLON.Mesh.CreateBox("wall", 10.0, scene);
  var wallMaterial7 = new BABYLON.StandardMaterial("wall", scene);
  wall7.scaling.x = 31;
  wall7.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
  wall7.position = new BABYLON.Vector3(0, 15, 550);
  wallMaterial7.diffuseTexture = new BABYLON.Texture("textures/wall.png", scene);
  wall7.material = wallMaterial7;
}

/**
 * Function createBoxes. This function create boxes for the design of the page.
 * @param scene
 */

function createBoxes(scene) {
  var box1 = BABYLON.Mesh.CreateBox("wall", 25.0, scene);
  var boxMaterial1 = new BABYLON.StandardMaterial("wall", scene);
  box1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  box1.position = new BABYLON.Vector3(190, 25, 150);
  boxMaterial1.diffuseTexture = new BABYLON.Texture("textures/box.png", scene);
  box1.material = boxMaterial1;

  var box1 = BABYLON.Mesh.CreateBox("wall", 25.0, scene);
  var boxMaterial1 = new BABYLON.StandardMaterial("wall", scene);
  box1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  box1.position = new BABYLON.Vector3(180, 25, 200);
  boxMaterial1.diffuseTexture = new BABYLON.Texture("textures/box2.png", scene);
  box1.material = boxMaterial1;


}

/**
 * Function initialisationStairs. This function initializes the stairs in the game.
 * @param scene
 */
function initialisationStairs(scene) {
  var stairs = BABYLON.Mesh.CreatePlane("stairs", 45, scene);
  var stairsMaterial = new BABYLON.StandardMaterial("stairs", scene);
  stairsMaterial.diffuseTexture = new BABYLON.Texture("textures/stairs.png", scene);
  /*stairsMaterial.diffuseTexture.uScale = 6;
   stairsMaterial.diffuseTexture.vScale = 6;*/
  stairsMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  //stairs.position.y = 7;
  stairs.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  stairs.position = new BABYLON.Vector3(200, 25, -100)
  stairs.material = stairsMaterial;
}
