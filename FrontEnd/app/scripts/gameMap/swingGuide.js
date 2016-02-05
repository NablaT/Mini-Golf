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
  BABYLON.SceneLoader.Load("","girl.babylon",engine,function(newScene){
    var Scene= newScene;

    Scene.executeWhenReady(function(){
      Scene.activeCamera.attachControl(canvas);

      engine.runRenderLoop(function(){
        Scene.render();
      })
    })
  });



  window.addEventListener("resize", function(newScene){
    engine.resize();
  })
  return scene;
}
