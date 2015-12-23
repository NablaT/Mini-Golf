var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);


var scene = createAndGetScene();


engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

/**
 * Function createAndGetScene. This function create the complete game view (the scene).
 * @returns {BABYLON.Scene}
 */
function createAndGetScene() {
    var scene = new BABYLON.Scene(engine);

    // Mise en place de l'environnement: camera et point de lumiere
    //var light0 =  new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-5, -2, -1), scene);
    //new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 1), scene);
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), scene);

    camera.attachControl(canvas, true);

    // Les lumieres
    initialisationLights(scene);

    //La source d'eau
    var fountain = initialisationFountain(scene);

    //On initialise le plateau
    initialisationGround(scene);

    //On crée les particules et leurs comportements.
    var particleSystem = initialisationParticles(scene, fountain);

    //On lance le systeme de particule
    particleSystem.start();

    //On initialise l'animation
    var animation = initialisationAnimation();

    fountain.animations.push(animation);

    //on lance l'animation
    scene.beginAnimation(fountain, 0, 100, true);
    return scene;
}



/**
 * Function getLights. This function initializes three lights in the scene (in the game)
 * @param scene
 */

function initialisationLights(scene){
    // Les lumieres sur le terrain sont definies par 2 spheres, elles font office de projecteur
    // Lumiere 1
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
    light2.intensity = 0.8;

    var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere2.position = light2.position;
    lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Lumiere 3
    var light3 = new BABYLON.SpotLight("spot03", new BABYLON.Vector3(70, 40, 70),
        new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
    light3.intensity = 1.4;

    var lightSphere3 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
    lightSphere3.position = light3.position;
    lightSphere3.material = new BABYLON.StandardMaterial("light", scene);
    lightSphere3.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

}

/**
 * Function initialisationGround. This function initializes the ground (game floor).
 * @param scene
 */
function initialisationGround(scene){
    // On crée le sol en definissant ses caracteristiques
    var ground = BABYLON.Mesh.CreatePlane("ground", 50.0, scene);
    ground.position = new BABYLON.Vector3(15, -10, 20);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.backFaceCulling = false;
    ground.material.diffuseColor = new BABYLON.Color3(0, 0.7, 0.3);
    //BABYLON.Color3(0.3, 0.3, 1);
}

/**
 * Function initialisationFountain. This function initializes the fountain. The fountain is the source of water.
 * @param scene
 * @returns {*}
 */
function initialisationFountain(scene){
    // On crée ensuite l'objet fountain. Cet objet est une sphere et va servir de "source visuelle"
    // a la fontaine.
    var fountain = BABYLON.Mesh.CreateSphere("foutain", 1.0,1.0, scene);
    fountain.position = new BABYLON.Vector3(0, -10, 0);
    fountain.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
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
    particleSystem.minEmitBox = new BABYLON.Vector3(0.1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.1, 0, -1); // To...

    // On definit les couleurs de particules. On definit un spectre de 3 couleurs.
    particleSystem.color1 = new BABYLON.Color4(0, 0.7, 1, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0, 0.4, 1, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.7, 0.0);

    // On definit la taille d'une particule. On donne deux valeurs qui sont la taille minimum
    // et la taille minimum de nos particules. Ensuite un random est fait entre ces deux valeurs
    // lors de la creation du particule
    particleSystem.minSize = 0.1; //0.1;
    particleSystem.maxSize = 0.5; //0.5;

    // On définit la durée de vie d'une particule. Comme pour sa taille, on donne deux valeurs min/max
    //et on randomise ensuite la durée de vie d'une particule emise
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // On definit le taux d'émission des particules
    particleSystem.emitRate = 1500;

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

    // At the animation key 100, the value of scaling is "1"
    /*keys.push({
     frame: 100,
     value: 0
     });*/

    // Launch animation
    animation.setKeys(keys);

    return animation;
}
