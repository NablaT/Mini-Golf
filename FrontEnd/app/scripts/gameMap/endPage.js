var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var scene =createScene();

engine.runRenderLoop(function () {
  scene.render();
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});

/**
 * Function createScene. This function creates the all 3D environment. It calls all function used to build every 3D component.
 * @returns {BABYLON.Scene}
 */
function createScene(){
  var scene = new BABYLON.Scene(engine);

  // Setup environment
  var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 1.5, 20,
    new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  //camera.setPosition(new BABYLON.Vector3(25, -10, 0));

  var fountain = initialisationFountain(scene,0,-10,0);
  var fountain2 = initialisationFountain(scene,0,-10, 0);//15);
  var fountain3 = initialisationFountain(scene,0,-10,0);//-15);

  initialisationLights(scene,fountain);


  initialisationBackground(scene);

  initialisationParticles(scene,fountain, new BABYLON.Color4(0, 0.4, 0, 1.0),
    new BABYLON.Color4(0.1, 0.4, 0, 1.0),new BABYLON.Color4(0, 0.9, 0.1, 0.0));

  initialisationParticles(scene,fountain2, new BABYLON.Color4(0.8, 0.1, 0.4, 1.0),
    new BABYLON.Color4(0.9, 0.1, 0.2, 1.0),new BABYLON.Color4(1, 0.1, 0.1, 0.0));

  initialisationParticles(scene,fountain3, new BABYLON.Color4(1, 1, 0, 1.0),
    new BABYLON.Color4(	0.541176471, 1, 0, 1.0),new BABYLON.Color4(1.0,0.87,0.37, 0.0));

  /*var animation = initialisationAnimation(scene);

  fountain.animations.push(animation);
  fountain2.animations.push(animation);
  fountain3.animations.push(animation);*/
  scene.beginAnimation(fountain, 0, 250, true);
  scene.beginAnimation(fountain2, 0, 250, true);
  scene.beginAnimation(fountain3, 0, 250, true);

  return scene;
}

/**
 * Function InitialisationFountain. This function initializes the "foutain of particle". To be more precise, this function just initializes
 * the source of the particle, the object which emits particles.
 * @param scene
 * @returns {*}
 */
function initialisationFountain(scene, positionX, positionY, positionZ){
  // Fountain object
  var fountain = BABYLON.Mesh.CreateSphere("foutain", 10,2, scene);
  fountain.position=new BABYLON.Vector3(positionX, positionY, positionZ)
  var fountainMaterial = new BABYLON.StandardMaterial("fountain", scene);
  fountainMaterial.diffuseTexture = new BABYLON.Texture("../scripts/gameMap/textures/golf.png", scene); //../scripts/gameMap/
  fountain.material = fountainMaterial;

  fountain.actionManager = new BABYLON.ActionManager(scene);
  return fountain;
}

/**
 * Function initialisationLights. This functions initializes all the lights in the map and some events which change the color of the
 * golf ball by changing the color of the light after a click.
 * @param scene
 * @param fountain
 */
function  initialisationLights(scene, fountain){
  var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);
  //light0.diffuse=BABYLON.Color3.Green();

  var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, -2, -8), scene);
  //light1.diffuse= BABYLON.Color3.Yellow();

  var light3 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, 2, 2), scene);
  //light3.diffuse= BABYLON.Color3.FromInts(252,155,28);

  var light4 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-5, -2, -2), scene);

  //window.setInterval(changeColor(light0, new BABYLON.Color3.Green(),fountain),5000);
  //light0.diffuse= new BABYLON.Color3.Green();
  fountain.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light0, "diffuse", BABYLON.Color3.Green(), 1000));
  fountain.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light3, "diffuse", BABYLON.Color3.Yellow(), 1000));
  fountain.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light1, "diffuse", BABYLON.Color3.FromInts(252,155,28), 1000));

}

/**
 * Function initialisationBackground. This function creates a plan on which we load a texture. We define the size, the position and the orientation
 * of the background plane.
 * @param scene
 */
function initialisationBackground(scene){
  //Plane
  var background = BABYLON.Mesh.CreatePlane("background", 45, scene);
  var backgroundMaterial = new BABYLON.StandardMaterial("backgroundMaterial", scene);
  backgroundMaterial.diffuseTexture = new BABYLON.Texture("../scripts/gameMap/textures/black.png", scene); //../scripts/gameMap/
  /*stairsMaterial.diffuseTexture.uScale = 6;
   stairsMaterial.diffuseTexture.vScale = 6;*/
  backgroundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  //stairs.position.y = 7;
  background.rotation = new BABYLON.Vector3(0, 3*(Math.PI)/2 , 0);
  background.position =new BABYLON.Vector3(0,0,0)
  background.material = backgroundMaterial;
}

/**
 * Function initialisationParticles. This function creates the particle emition movement. We take in parameter the scene and the fountain, we
 * associate the particle system to the fountain (which is the source of the emission). We define several parameters for the particle animation
 * as the emit rate, the  quantity of particles we emit, colors etc..
 * @param scene
 * @param fountain
 */
function initialisationParticles(scene,fountain, color1Arg, color2Arg, color3Arg){
  // Create a particle system
  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

  //Texture of each particle
  particleSystem.particleTexture = new BABYLON.Texture("../scripts/gameMap/textures/flare.png", scene);//../scripts/gameMap/

  // Where the particles come from
  particleSystem.emitter = fountain; // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

  // Colors of all particles

  particleSystem.color1 = color1Arg;
  particleSystem.color2 =color2Arg;
  particleSystem.colorDead = color3Arg;

  // Size of each particle (random between...
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;

  // Life time of each particle (random between...
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // Emission rate
  particleSystem.emitRate = 1500;

  // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

  // Set the gravity of all particles
  particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

  // Direction of each particle after it has been emitted
  particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
  particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

  // Angular speed, in radians
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = Math.PI/2;

  // Speed
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.005;

  // Start the particle system
  particleSystem.start();

}


/**
 * Function initialisationAnimation. This function initializes the ball rotation.
 * @param scene
 * @returns {*}
 */
function initialisationAnimation(scene){
  // Fountain's animation
  var keys = [];
  var animation = new BABYLON.Animation("animation", "rotation.x", 50, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  // At the animation key 0, the value of scaling is "1"
  keys.push({
    frame: 0,
    value: 0
  });

  // At the animation key 50, the value of scaling is "0.2"
  keys.push({
    frame: 50,
    value: 0
  });

  // At the animation key 100, the value of scaling is "1"
  keys.push({
    frame: 100,
    value: 2*(Math.PI)
  });
  // Launch animation
  animation.setKeys(keys);
  return animation;
}
