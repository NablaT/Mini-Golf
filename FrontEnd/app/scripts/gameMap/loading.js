var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  // Setup environment
  var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);

  var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, -2, -8), scene);
  var light3 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, 2, 2), scene);

  var light3 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-5, -2, -2), scene);
  var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 1.5, 20, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  // Fountain object
  var fountain = BABYLON.Mesh.CreateSphere("foutain", 10,2, scene);
  var foutainMaterial = new BABYLON.StandardMaterial("fountain", scene);
  foutainMaterial.diffuseTexture = new BABYLON.Texture("textures/golf.png", scene);
  fountain.material = foutainMaterial;


  //Plane
  var background = BABYLON.Mesh.CreatePlane("background", 45, scene);
  var backgroundMaterial = new BABYLON.StandardMaterial("backgroundMaterial", scene);
  backgroundMaterial.diffuseTexture = new BABYLON.Texture("textures/black.png", scene);
  /*stairsMaterial.diffuseTexture.uScale = 6;
   stairsMaterial.diffuseTexture.vScale = 6;*/
  backgroundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  //stairs.position.y = 7;
  background.rotation = new BABYLON.Vector3(0, 3*(Math.PI)/2 , 0);
  background.position =new BABYLON.Vector3(0,0,0)
  background.material = backgroundMaterial;

  // Ground

  // Create a particle system
  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

  //Texture of each particle
  particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

  // Where the particles come from
  particleSystem.emitter = fountain; // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

  // Colors of all particles
  /*particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
   particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
   particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);*/

  particleSystem.color1 = new BABYLON.Color4(0, 0.4, 0, 1.0);
  //particleSystem.color1 = new BABYLON.Color4(0.1, 0.2, 0, 1.0);
  particleSystem.color2 = new BABYLON.Color4(0.1, 0.4, 0, 1.0);
  particleSystem.colorDead = new BABYLON.Color4(0, 0.9, 0.1, 0.0);

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
  particleSystem.maxAngularSpeed = Math.PI;

  // Speed
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.005;

  // Start the particle system
  particleSystem.start();

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
  fountain.animations.push(animation);
  scene.beginAnimation(fountain, 0, 250, true);

  return scene;
}


var scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
