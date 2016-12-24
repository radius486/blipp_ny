var blipp = require('blippar').blipp;


blipp.getPeel()
     .setOrientation('portrait')
     .setType('fit');

  
blipp.read("main.json");
var scene   = blipp.getScene("default");
var markerW = blipp.getMarker().getWidth();
var markerH = blipp.getMarker().getHeight();


scene.onCreate = function() {

	scene.animations = ["animation_cock-2voc.json",
	"animation_cock-5voc.json",
	"animation_cock-7voc.json",
	"animation_cock-9voc.json",
	"animation_cock-idle_01.json",
	"animation_cock-idle_02.json",
	"animation_cock-idle_03.json",
	"animation_cock-idle_04.json",
	"animation_cock-idle_05.json"];

	scene.setRequiredAssets(scene.animations);

	scene.cock_model = scene.addTransform().read("cock_model.json");
	scene.box_model = scene.addTransform().read("box_model.json");


	}

scene.onShow = function() {	
	
	scene.cock_model.animate().scale(5, 5, 5).duration(200);
	scene.box_model.animate().scale(5, 5, 5).duration(200);


	scene.cock_model.setMesh(scene.animations[2]);
	scene.cock_model.setActiveMesh(1);
	scene.cock_model.animate();

	}