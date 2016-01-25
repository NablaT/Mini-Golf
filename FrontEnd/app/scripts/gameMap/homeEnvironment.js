
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
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 1000, new BABYLON.Vector3(0, -10, 0), scene);

  var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

  camera.setPosition(new BABYLON.Vector3(-55, 60, 55));

  //Lights initialization
  initialisationLights(scene);

  //Create the skybox
  skybox = initialisationSkyBox(scene);

  //We initialize the ground
  var ground = initialisationGround(scene);
  var ground2= initialisationGround2(scene);
  //initialisationGround3(scene);

  var ground3=initialisationGround3(scene);

  var track=initialisationTrack(scene);
  initialisationMagmaSphere(scene);

  var arrayPodium=initialisePodium(scene);
  //Create the golf hole
  var golfHole=createGolfHole(scene);
  var arrayPiquet=initialisePiquet(scene);

  initialisationWater(scene);

  camera.attachControl(canvas);

  // scene.registerBeforeRender(beforeRenderFunction);
  /*var h= getH(24,25);
  getAlpha(25,h);*/
  var alpha = 0.76;

  //Init ground2
  var alphaGround2=0;
  var hGround2=getH(24,25);
  alphaGround2= getAlpha(25,hGround2);


  //Init ground3
  var alphaGround3=0;
  var hGround3=getH(0,-30);
  alphaGround3= getAlpha(-30,hGround3);


  //Init track
  var alphaTrack=0;
  var hTrack=getH(5,5);
  alphaTrack= getAlpha(5,hTrack);

  //Init podium
//(-30, 8, -10);
  var alphaPodium=0;
  var hPodium=-getH(-30,-10);
  alphaPodium= getAlpha(-10,hPodium);

  //(-26, 8, -10);
  var alphaPodium2=0;
  var hPodium2=-getH(-26,-10);
  alphaPodium2= getAlpha(-10,hPodium);

  //(-34, 7.5, -10);
  var alphaPodium3=0;
  var hPodium3=-getH(-34,-10);
  alphaPodium3= getAlpha(-10,hPodium);

  //Golf hole
  //(20, 6, -5);
  var alphaHole=0;
  var hHole=getH(20,-5);
  alphaHole= getAlpha(-5,hHole);


  //piquet
  var alphaPiquet=0;
  var hPiquet=getH(20,-5);
  alphaPiquet= getAlpha(-5,hPiquet);

  //flag
  var alphaFlag=0;
  var hFlag=getH(20,-7.2);
  alphaFlag= getAlpha(-7.2,hFlag);

  /*
  cylinder.position = new BABYLON.Vector3(20, 6, -5);
  cylinder.material = cylinderMaterial;

  wall1.position = new BABYLON.Vector3(20, 20, -7.2);*/


  scene.registerBeforeRender(function () {
    //ground.rotation.x += 0.01;
    ground.rotation.y += 0.001;

    //rotation
    ground2.position = new BABYLON.Vector3(Math.sin(alphaGround2) *hGround2 , 6.9, Math.cos(alphaGround2) * hGround2);
    alphaGround2+=0.001;
    ground2.rotation.y+=0.001;

    //rotation ground 3
    ground3.position = new BABYLON.Vector3(Math.sin(alphaGround3) *hGround3 , 6.9, Math.cos(alphaGround3) * hGround3);
    alphaGround3+=0.001;
    ground3.rotation.y+=0.001;

    //rotation track
    track.position = new BABYLON.Vector3(Math.sin(alphaTrack) *hTrack , 7.1, Math.cos(alphaTrack) * hTrack);
    alphaTrack+=0.001;
    track.rotation.y+=0.001;

    //rotation podium
    arrayPodium[0].position = new BABYLON.Vector3(Math.sin(alphaPodium) *hPodium , 8, Math.cos(alphaPodium) * hPodium);
    alphaPodium+=0.001;
    arrayPodium[0].rotation.y+=0.001;

    arrayPodium[1].position = new BABYLON.Vector3(Math.sin(alphaPodium2) *hPodium2 , 8, Math.cos(alphaPodium2) * hPodium2);
    alphaPodium2+=0.001;
    arrayPodium[1].rotation.y+=0.001;

    arrayPodium[2].position = new BABYLON.Vector3(Math.sin(alphaPodium3) *hPodium3 , 8, Math.cos(alphaPodium3) * hPodium3);
    alphaPodium3+=0.001;
    arrayPodium[2].rotation.y+=0.001;

    //rotation golfHole
    golfHole.position = new BABYLON.Vector3(Math.sin(alphaHole) *hHole ,6, Math.cos(alphaHole) * hHole);
    alphaHole+=0.001;
    golfHole.rotation.y+=0.001;

    //rotation piquet
    arrayPiquet[0].position = new BABYLON.Vector3(Math.sin(alphaPiquet) *hPiquet ,6, Math.cos(alphaPiquet) * hPiquet);
    alphaPiquet+=0.001;
    arrayPiquet[0].rotation.y+=0.001;

    //rotation flag
    arrayPiquet[1].position = new BABYLON.Vector3(Math.sin(alphaFlag) *hFlag ,20, Math.cos(alphaFlag) * hFlag);
    alphaFlag+=0.001;
    arrayPiquet[1].rotation.y+=0.001;


    //ground2.position = new BABYLON.Vector3(Math.sin(alpha) * 35.65, 6.9, Math.cos(alpha) * 35.65);
    /*ground3.rotation.y += 0.001;
    track.rotation.y += 0.001;
    arrayPodium[0].rotation.y += 0.001;
    arrayPodium[1].rotation.y += 0.001;
    arrayPodium[2].rotation.y += 0.001;
    golfHole.rotation.y += 0.001;
    arrayPiquet[0].rotation.y += 0.001;
    arrayPiquet[1].rotation.y += 0.001;*/
    //ground.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 10, Math.sin(alpha) * 30);

    alpha += 0.001;

  });
  engine.runRenderLoop(function () {
    scene.render();
  });
}

function getH(x, z){
  var h= Math.sqrt(Math.pow(x,2)+ Math.pow(z,2));
  return h;
}

function getAlpha(z,h){
  var alpha=Math.acos(z/h);
  return alpha;
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
  var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(-150, 250, 150),
    new BABYLON.Vector3(1, -1, -4), 1.1, 16, scene);
  light2.intensity = 100;

  var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
  lightSphere2.position = light2.position;
  lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
  lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

  // Lumiere 3
  var light3 = new BABYLON.SpotLight("spot03", new BABYLON.Vector3(-30, 50, 630),
    new BABYLON.Vector3(1, -1, -10), 1.1, 16, scene);
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
  var hole = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false);// 15,15,
  var holeMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  hole.position = new BABYLON.Vector3(20, 6, -5);
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
  var ground = BABYLON.Mesh.CreateGround("ground", 90, 90, 100, scene);
  //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap3.png", 90, 90, 30, 0, 10, scene, false);

  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/grass.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.y = 7;
  ground.material = groundMaterial;


  return ground;
}

/**
 * Function initialisationGround2. This function initializes one mountain.
 */
function initialisationGround2(scene){
  var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap.png", 30, 30, 70, 0, 10, scene, false);

  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/sand1.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.z = 25;
  ground.position.x= 24;
  ground.position.y = 6.9;
  ground.material = groundMaterial;

  return ground;
}


/**
 * Function initialisationGround3. This function initializes one mountain.
 */
function initialisationGround3(scene){
  var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap3.png", 80, 30, 20, 0, 10, scene, false);
  //hole.position = new BABYLON.Vector3(20, 6, -5);
  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/sand1.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.position.z = -30;
  ground.position.x= 0;
  ground.position.y = 6;
  ground.material = groundMaterial;


  return ground;
}

/**
 * Function initialisationTrack. This game initializes the track
 */
function initialisationTrack(scene){
  //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMaps/heightMap4.png", 80, 30, 5, 0, 10, scene, false);
  var ground = BABYLON.Mesh.CreateGround("ground", 80, 15, 100, scene);

  var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture("textures/sand3.png", scene);
  groundMaterial.diffuseTexture.uScale = 6;
  groundMaterial.diffuseTexture.vScale = 6;
  groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  ground.rotation=new BABYLON.Vector3(0, Math.PI / 5.2, 0);
  ground.position.z = 12;
  ground.position.x= -5;
  ground.position.y = 7.1;
  ground.material = groundMaterial;
  return ground;

}

function initialisePodium(scene){
  //First place
  var cylinder1 = BABYLON.Mesh.CreateCylinder("cylinder",4, 4, 4, 0, 1, scene, false);
  var cylinder1Material = new BABYLON.StandardMaterial("cylinder", scene);
  cylinder1.position = new BABYLON.Vector3(-30, 8, -10);
  cylinder1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  //cylinderMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  cylinder1Material.diffuseTexture = new BABYLON.Texture("textures/gold.png", scene);
  cylinder1.material = cylinder1Material;

  //Second place
  var cylinder2 = BABYLON.Mesh.CreateCylinder("cylinder",2, 4, 4, 0, 1, scene, false);
  var cylinderMaterial2 = new BABYLON.StandardMaterial("cylinder", scene);
  cylinder2.position = new BABYLON.Vector3(-26, 8, -10);
  cylinder2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  //cylinderMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  cylinderMaterial2.diffuseTexture = new BABYLON.Texture("textures/silver.png", scene);
  cylinder2.material = cylinderMaterial2;

  //Third place
  var cylinder3 = BABYLON.Mesh.CreateCylinder("cylinder",1, 4, 4, 0, 1, scene, false);
  var cylinderMaterial3 = new BABYLON.StandardMaterial("cylinder", scene);
  cylinder3.position = new BABYLON.Vector3(-34, 7.5, -10);
  cylinder3.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  //cylinderMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

  cylinderMaterial3.diffuseTexture = new BABYLON.Texture("textures/bronze.png", scene);
  cylinder3.material = cylinderMaterial3;

  var results=[cylinder1,cylinder2, cylinder3];

  return results;

}

function initialisePiquet(scene){

  /*var cylinder = BABYLON.Mesh.CreateCylinder("cylinder",30, 0.7, 1, 0, 1, scene, false);
  var cylinderMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  cylinderMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
  cylinder.position = new BABYLON.Vector3(0, 6, 0);
  cylinder.material = cylinderMaterial;

  var cylinder = BABYLON.Mesh.CreateCylinder("cylinder",30, 0.7, 1, 0, 1, scene, false);
  var cylinderMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  cylinderMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  cylinder.position = new BABYLON.Vector3(50, 6, 0);
  cylinder.material = cylinderMaterial;

  var cylinder = BABYLON.Mesh.CreateCylinder("cylinder",30, 0.7, 1, 0, 1, scene, false);
  var cylinderMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  cylinderMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
  cylinder.position = new BABYLON.Vector3(0, 6, 50);
  cylinder.material = cylinderMaterial;*/


  //First place
  var cylinder = BABYLON.Mesh.CreateCylinder("cylinder",30, 0.7, 1, 0, 1, scene, false);
  var cylinderMaterial = new BABYLON.StandardMaterial("cylinder", scene);
  cylinderMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
  cylinder.position = new BABYLON.Vector3(20, 6, -5);
  cylinder.material = cylinderMaterial;

  var wall1 = BABYLON.Mesh.CreateBox("wall", 0.1, scene);
  var wallMaterial1 = new BABYLON.StandardMaterial("wall", scene);
  wall1.scaling.x = 40;
  wall1.scaling.y = 25;
  wall1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  wall1.position = new BABYLON.Vector3(20, 20, -7.2);
  wallMaterial1.diffuseTexture = new BABYLON.Texture("textures/flag.png", scene);
  wall1.material = wallMaterial1;

  var results=[cylinder,wall1];
  return results;
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

function initialisationMagmaSphere(scene){
  // Box5 material
  material = new BABYLON.StandardMaterial("bab5", scene);
  material.emissiveColor = new BABYLON.Color3(1, 0, 0);
  material.specularColor = new BABYLON.Color3(1, 0, 0);

  //box5.material = material;

  var sphere5 = BABYLON.Mesh.CreateSphere("Sphere5", 64, 5, scene);
  sphere5.position=new BABYLON.Vector3(-50, 40, -32);

  // Sphere5 material
  material = new BABYLON.StandardMaterial("kosh5", scene);
  material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  material.reflectionTexture = new BABYLON.CubeTexture("magma/magma", scene);
  material.reflectionTexture.level = 3;
  material.specularPower = 150;
  material.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.05);
  material.alpha = 0.8;

  // Fresnel
  material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
  material.emissiveFresnelParameters.bias = 0.4;
  material.emissiveFresnelParameters.power = 140;
  material.emissiveFresnelParameters.leftColor = BABYLON.Color3.Red();
  material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Blue();

  sphere5.material = material;
}
