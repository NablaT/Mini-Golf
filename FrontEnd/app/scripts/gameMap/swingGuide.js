/**
 * Created by Remi on 05/02/2016.
 */
if (BABYLON.Engine.isSupported()) {
  createScene();
}

/**
 * Function createScene. This function create the complete game view (the scene).
 * @returns {BABYLON.Scene}
 */
function createScene() {


  var canvas = document.getElementById("renderCanvas");

  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 1000, new BABYLON.Vector3(0, 0, 0), scene);

  BABYLON.SceneLoader.Load("", "girl.babylon", engine, function (newScene) {
    var Scene = newScene;
   // Scene.meshes[1].rotation=new BABYLON.Vector3(3*(Math.PI)/2,0,3*(Math.PI)/2);
    for(var i=0; i<Scene.meshes.length;i++){
      Scene.meshes[i].rotation=new BABYLON.Vector3(3*(Math.PI)/2, 0 , 3*(Math.PI)/2);

    }
    Scene.executeWhenReady(function () {
      Scene.activeCamera.attachControl(canvas);

      engine.runRenderLoop(function () {
        Scene.render();
      })
    })
  });

  camera.attachControl(canvas, false);

  // The first parameter can be used to specify which mesh to import. Here we import all meshes
  /*BABYLON.SceneLoader.ImportMesh("", "", "girl.babylon", scene, function (newMeshes) {
   // Set the target of the camera to the first imported mesh
   camera.target = newMeshes[0];

   newMeshes[0].material = new BABYLON.StandardMaterial("skull", scene);
   newMeshes[0].material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
   engine.runRenderLoop(function(){
   scene.render();
   })
   });*/


  window.addEventListener("resize", function (newScene) {
    engine.resize();
  })
  return scene;
}
