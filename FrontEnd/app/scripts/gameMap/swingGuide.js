/**
 * Created by Remi on 05/02/2016.
 */
var socket;

if (BABYLON.Engine.isSupported()) {
  connect();
  createScene();
}

/**
 * Function Connect. This function makes the connection with the server.
 **/
function connect() {
  console.log("oui  je rentre dans conect");
  socket = io.connect("http://192.168.1.6:3000/ecran");

  socket.io.on('connect_error', function (err) {
    console.log('Error connecting to server');
  });
}

/**
 * Function createScene. This function create the complete game view (the scene).
 * @returns {BABYLON.Scene}
 */
function createScene() {

  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 1000, new BABYLON.Vector3(0, -5, 0), scene);

  BABYLON.SceneLoader.Load("", "girlwithgolffusion3.babylon", engine, function (newScene) {
    var Scene= newScene;

    socket.on("direction", function (params) {
      for(var i=0; i<Scene.meshes.length;i++){
        Scene.meshes[i].rotation=new BABYLON.Vector3(0, -params.direction -Math.PI/2,0 );
      }
    });

    Scene.executeWhenReady(function () {
      Scene.activeCamera.attachControl(canvas);

      engine.runRenderLoop(function () {
        Scene.render();
      })
    })
  });


  window.addEventListener("resize", function (newScene) {
    engine.resize();
  })
  return scene;
}
