if (BABYLON.Engine.isSupported()) {
    createScene();
}

/**
 * Function createScene. This function create the complete game view (the scene).
 * @returns {BABYLON.Scene}
 */
function createScene(){
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

    //Lights initialization
    initialisationLights(scene);

    //Create the skybox
    skybox = initialisationSkyBox(scene);

    initialisationGround(scene);


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

function initialisationLights(scene){
    //Lumiere 1
    var light = new BABYLON.SpotLight("spot01", new BABYLON.Vector3(-50, 40, 250),
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

    // Lumiere 4
    var light4 = new BABYLON.SpotLight("spot04", new BABYLON.Vector3(50, 50, 70),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light4.intensity = 100;

    var light4 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    light4.position = light2.position;
    light4.material = new BABYLON.StandardMaterial("light", scene);
    light4.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

}

/**
 * Function initialisationSkyBox. This function initializes the skybox (game box).
 * @param scene
 */
function initialisationSkyBox(scene){
    // Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
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
function  initialisationGround(scene){
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightMap2.png", 500, 500, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("grass.png", scene);
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
function initialisationFountain(scene){
    // On crée ensuite l'objet fountain. Cet objet est une sphere et va servir de "source visuelle"
    // a la fontaine.
    var fountain = BABYLON.Mesh.CreateSphere("foutain", 1,1, scene); // 15,15,
    fountain.position = new BABYLON.Vector3(170, 17, -150);
    fountain.rotation = new BABYLON.Vector3(Math.PI/2 , Math.PI, 2*(Math.PI));
    return fountain;
}

/**
 * Function initliasationParticles. This function initializes particles behavior.
 * @param scene
 * @param fountain
 * @returns {BABYLON.ParticleSystem}
 */

function initialisationParticles(scene, fountain){

    // On cree une particule. Cette particule correspond a une goute d'eau de la fontaine.
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //On definit la texture de la particule
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

    // On definit la source de la particule. L'emeteur est ici notre fontaine.
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(20, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(-20, 0, -1); // To...

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
    particleSystem.minSize = 1; //0.1;
    particleSystem.maxSize = 1.5; //0.5;

    // On définit la durée de vie d'une particule. Comme pour sa taille, on donne deux valeurs min/max
    //et on randomise ensuite la durée de vie d'une particule emise
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // On definit le taux d'émission des particules
    particleSystem.emitRate = 150000;

    // On initialise ensuite le blend mode du system de particule à BLENDMODE_ONEONE (ou BLENDMODE_STANDARD)
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // On définit la gravité des particules
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // On définit la direction de propagation des particules
    particleSystem.direction1 = new BABYLON.Vector3(-4, 8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(4, 8, -3);

    // On définit l'angle des particules (aleatoirement entre le max et le min)
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // On définit la vitesse de propagation (min et max) et la vitesse de mise a jour
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;


    return particleSystem;
}

/**
 * Function initialisationAnimation. This function initializes all fountain's animation.
 * @returns {*}
 */

function initialisationAnimation(){
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
        value: (Math.PI)/2
    });

    // Launch animation
    animation.setKeys(keys);

    return animation;
}

/**
 * Function initialisationWater. This function initializes the water.
 * @param scene
 */
function initialisationWater(scene){
    //var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 1000, 1000, 16, scene, false);  //2048, 2048, 16, scene, false);
    var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
    water.backFaceCulling = true;
    water.bumpTexture = new BABYLON.Texture("13_DIFFUSE.png", scene); //13_DIFFUSE
    water.windForce = -10;
    water.waveHeight = 0.5;
    water.bumpHeight = 0.1;
    water.windDirection = new BABYLON.Vector2(1, 1);
    water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
    water.colorBlendFactor = 0.0;
    water.addToRenderList(skybox);
    waterMesh.material = water;
}
