var blipp = require('blippar').blipp;

blipp.setAutoRequiredAssets(true);

blipp.read("main.json");

var scene = blipp.getScene("default");

// Global variables
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();
var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;

scene.onCreate = function() {
  blipp.uiVisible('blippShareButton', false);
  blipp.uiVisible('photoShareButton', false);
  blipp.uiVisible('favouriteButton', false);

 // scene.animations = ["animation_cock-2voc.json",
 // "animation_cock-5voc.json",
 // "animation_cock-7voc.json",
 // "animation_cock-9voc.json",
 // "animation_cock-idle_01.json",
 // "animation_cock-idle_02.json",
 // "animation_cock-idle_03.json",
 // "animation_cock-idle_04.json",
 // "animation_cock-idle_05.json"];

 // scene.setRequiredAssets(scene.animations);

  //scene.cock_model = scene.addTransform().read("cock_model.json");
  //scene.box_model = scene.addTransform().read("box_model.json");
  //
  scene.cock = scene.getChild("cock");
  scene.box = scene.getChild("box");

  //scene.legal = createPlane('legal.png', -sW/2 + 5, -sH/2 + 5, sW - 10, 140, 'left');
  scene.adultOn = createPlane('adult_on.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68 * 2, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.adultOff = createPlane('adult_off.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68 * 2, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.childOn = createPlane('child_on.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.childOff = createPlane('child_off.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.watchOn = createPlane('watch_on.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.watchOff = createPlane('watch_off.png', -sW/2 + sW/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.backArrow = createPlane('arrow.png', -sW/2, sH/2, sW/3, (sW/3)/1.39, 'left', 'top');

  scene.adultOn.setHidden(true);
  scene.adultOff.setHidden(true);
  scene.childOn.setHidden(true);
  scene.childOff.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.watchOff.setHidden(true);
  scene.backArrow.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.box.applyToNodeAndDescendants('setHidden', true);

  scene.adultOn.on('touchEnd', function() {
    //this.setHidden(true);
    //scene.adultOff.setHidden(false);
  });

  scene.adultOff.on('touchEnd', function() {
    this.setHidden(true);
    scene.adultOn.setHidden(false);
    delay(200, function() {
      scene.adultOn.setHidden(true);
      scene.childOn.setHidden(true);
      scene.childOff.setHidden(true);
      scene.watchOff.setHidden(false);
      scene.backArrow.setHidden(false);
    });
  });

  scene.childOn.on('touchEnd', function() {
    //this.setHidden(true);
    //scene.childOff.setHidden(false);
  });

  scene.childOff.on('touchEnd', function() {
    this.setHidden(true);
    scene.childOn.setHidden(false);
    delay(200, function() {
      scene.childOn.setHidden(true);
      scene.adultOff.setHidden(true);
      scene.backArrow.setHidden(false);
      scene.cock.applyToNodeAndDescendants('setHidden', true);
      scene.box.applyToNodeAndDescendants('setHidden', false);
    });
  });

  scene.watchOn.on('touchEnd', function() {
    //this.setHidden(true);
    //scene.watchOff.setHidden(false);
  });

  scene.watchOff.on('touchEnd', function() {
    this.setHidden(true);
    scene.watchOn.setHidden(false);
    delay(200, function() {
      blipp.playInAppVideo('', 'video.mp4', function() {
        scene.watchOn.setHidden(true);
        scene.watchOff.setHidden(false);
      });
    });
  });

  scene.backArrow.on('touchEnd', function() {
    this.setHidden(true);
    scene.adultOff.setHidden(false);
    scene.childOff.setHidden(false);
    scene.watchOff.setHidden(true);
    scene.watchOn.setHidden(true);
    scene.cock.applyToNodeAndDescendants('setHidden', false);
    scene.box.applyToNodeAndDescendants('setHidden', true);
  });

};

scene.onShow = function() {

  scene.cock.setScale(10, 10, 10).setTranslation(-50, - 50, 0).setRotationY(45).setRotationX(35.264);
  scene.box.setScale(5, 5, 5).setTranslation(-50, - 50, 0).setRotationY(45).setRotationX(35.264);
  scene.playSound('1.mp3', true);
  scene.playSound('2voc.mp3');
  delay(10000, function() {
    scene.adultOff.setHidden(false);
    scene.childOff.setHidden(false);
  });

  //scene.box_model.animate().scale(5, 5, 5).duration(200);
  //scene.cock_model.animate(scene.animations[2], 0, 5000);

  //scene.cock_model.setMesh(scene.animations[2]);
  //scene.cock_model.setActiveMesh(1);
  //scene.cock_model.animate();

};

function createPlane(texture, x, y, sX, sY, directionX, directionY) {
  return scene.getScreen()
    .addSprite()
    .setTexture(texture)
    .setTranslation(x, y)
    .setScale(sX, sY)
    .setType('aura')
    .setHAlign(directionX)
    .setVAlign(directionY);
}

function delay(delay, onEnd){
  return scene.animate().delay(delay).onEnd = onEnd;
}
