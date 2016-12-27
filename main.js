var blipp = require('blippar').blipp;

blipp.setAutoRequiredAssets(true);

blipp.read("main.json");

var scene = blipp.getScene("default");

// Global variables
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();
var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;

var isSnowing = false;
var snowParticles = snow([0, 0, 200], 1);
var childMode = false;
var trackLost = false;

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
  scene.box1 = scene.getChild("box1");
  scene.box2 = scene.getChild("box2");

  //scene.legal = createPlane('legal.png', -sW/2 + 5, -sH/2 + 5, sW - 10, 140, 'left');
  scene.adultOn = createPlane('adult_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68 * 2, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.adultOff = createPlane('adult_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68 * 2, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.childOn = createPlane('child_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.childOff = createPlane('child_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.watchOn = createPlane('watch_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.watchOff = createPlane('watch_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.backArrow = createPlane('arrow.png', -sW/2, sH/2, sW/3, (sW/3)/1.39, 'left', 'top');

  scene.ok = createPlane('ok.png', - sW/3/2, -sH/2 + (sW * 1/3)/1.84, sW * 1/3, (sW * 1/3)/1.84, 'left', 'bottom');

  scene.message1 = createPlane('message1.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');

  scene.adultOn.setHidden(true);
  scene.adultOff.setHidden(true);
  scene.childOn.setHidden(true);
  scene.childOff.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.watchOff.setHidden(true);
  scene.backArrow.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.ok.setHidden(true);
  scene.message1.setHidden(true);
  scene.box1.applyToNodeAndDescendants('setHidden', true);
  scene.box2.applyToNodeAndDescendants('setHidden', true);

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
      scene.box1.applyToNodeAndDescendants('setHidden', false);
      scene.box2.applyToNodeAndDescendants('setHidden', false);
      scene.ok.setHidden(false);
      scene.message1.setHidden(false);
      childMode = true;

      if(trackLost) {
        scene.setWorldOrientation([0, 0, 1, - 90]);
        scene.backArrow.setTranslation(-sH/2 + 50, sW/2, 0);
        scene.ok.setTranslation(-sW/3/2, -sW/2, 0);
        scene.message1.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, sW - (sH * 2/4)/1.676, 0);
      }
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
    scene.box1.applyToNodeAndDescendants('setHidden', true);
    scene.box2.applyToNodeAndDescendants('setHidden', true);
    scene.ok.setHidden(true);
    scene.message1.setHidden(true);
    if(childMode) {
      childMode = false;
      scene.setWorldOrientation([0, 0, 1, 0]);
      scene.backArrow.setTranslation(-sW/2, sH/2, 0);
      scene.ok.setTranslation(- sW/3/2, -sH/2 + (sW * 1/3)/1.84, 0);
      scene.message1.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    }
  });

};

scene.onShow = function() {
  snowParticles.start();
  isSnowing = true;

  scene.cock.setScale(10, 10, 10).setTranslation(-50, - 50, 0).setRotationY(45).setRotationX(35.264);
  scene.box1.setScale(4, 4, 4).setTranslation(- 200, - 120, 0).setRotationY(45).setRotationX(35.264);
  scene.box2.setScale(4, 4, 4).setTranslation(200, - 120, 0).setRotationY(45).setRotationX(35.264);
  scene.playSound('1.mp3', true);

  delay(2000, function() {
    scene.playSound('2voc.mp3');
  });

 // delay(12000, function() {
 //   scene.adultOff.setHidden(false);
 //   scene.childOff.setHidden(false);
 // });

  delay(10, function() {
    scene.adultOff.setHidden(false);
    scene.childOff.setHidden(false);
  });


};

scene.on('trackLost', function () {
  trackLost = true;
  if(childMode) {
    scene.setWorldOrientation([0, 0, 1, - 90]);
    scene.backArrow.setTranslation(-sH/2 + 50, sW/2, 0);
    scene.ok.setTranslation(-sW/3/2, -sW/2, 0);
    scene.message1.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, sW - (sH * 2/4)/1.676, 0);
  }
});

scene.on('track', function () {
  trackLost = false;
  scene.setWorldOrientation([0, 0, 1, 0]);
  scene.backArrow.setTranslation(-sW/2, sH/2, 0);
  scene.ok.setTranslation(- sW/3/2, -sH/2 + (sW * 1/3)/1.84, 0);
  scene.message1.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
});

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

function snow(position, gravityFactor) {
  var particles = scene.addParticles().setCenter(position).setEmitterType("continual").setBirthRate(1000).setEmitterSize(5000, 5000, 5000)
    .setMaximum(2000).setSpread(0, 0).setTrajectory(0, 0, -1).setTextures(["snow1.png", "snow2.png", "snow3.png", "snow4.png"]).setSpin(8,45,180,1)
    .setColorProfile(0, 0.3, 0.6, 0.1, 0).setStartSize(80, 80).setEndSize(0, 0).setLifetime(3000 / 1000, 3000 / 1000)
    .setSpeed(100, 10).setMass(1.0, 5.0).setGravity(0, 0, -9.8 * gravityFactor).setWindDirection(0.5, -1, 0).setWindSpeed(100, 500)
    .setWindStability(0.4);

    return particles;
}

function clear(duration, alpha, onEnd){
  if(isSnowing){
    snowParticles.stop(true);
    isSnowing = false;
  }
}
