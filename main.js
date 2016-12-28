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
var tryCount = 5;
var trueNumber;
var selectedNumber;
var canPush = false;
var successResults = 0;
var stage2 = false;

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
  scene.box1_1 = scene.box1.getChild("box1_1");
  scene.box2_1 = scene.box2.getChild("box2_1");
  scene.box1_2 = scene.box1.getChild("box1_2");
  scene.box2_2 = scene.box2.getChild("box2_2");

  //scene.legal = createPlane('legal.png', -sW/2 + 5, -sH/2 + 5, sW - 10, 140, 'left');
  scene.adultOn = createPlane('adult_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68 * 2 + 20, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.adultOff = createPlane('adult_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68 * 2 + 20, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.childOn = createPlane('child_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.childOff = createPlane('child_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.watchOn = createPlane('watch_on.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');
  scene.watchOff = createPlane('watch_off.png', - sW * 2/3/2, -sH/2 + (sW * 2/3)/3.68, sW * 2/3, (sW * 2/3)/3.68, 'left', 'bottom');

  scene.backArrow = createPlane('arrow.png', -sW/2, sH/2, sW/3, (sW/3)/1.39, 'left', 'top');

  scene.ok = createPlane('ok.png', 0, -sH/2 + (sW * 1/3)/1.84, sW * 1/3, (sW * 1/3)/1.84, 'left', 'bottom');
  scene.back = createPlane('back.png', - sW/3/2, -sH/2 + (sW * 1/3)/1.84, sW * 1/3, (sW * 1/3)/1.84, 'left', 'bottom');

  scene.message1 = createPlane('message1.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');
  scene.message2 = createPlane('message2.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');
  scene.message3 = createPlane('message3.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');
  scene.message4 = createPlane('message4.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');
  scene.message5 = createPlane('message5.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');
  scene.message6 = createPlane('message6.png', - sW * 2/3/2, + (sW * 2/3)/1.676/2, sW * 2/3, (sW * 2/3)/1.676, 'left', 'top');

  scene.try1 = createPlane('try_1.png', - sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, sW * 2/3, (sW * 2/3)/4.184, 'left', 'top');
  scene.try2 = createPlane('try_2.png', - sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, sW * 2/3, (sW * 2/3)/4.184, 'left', 'top');
  scene.try3 = createPlane('try_3.png', - sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, sW * 2/3, (sW * 2/3)/4.184, 'left', 'top');
  scene.try4 = createPlane('try_4.png', - sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, sW * 2/3, (sW * 2/3)/4.184, 'left', 'top');
  scene.try5 = createPlane('try_5.png', - sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, sW * 2/3, (sW * 2/3)/4.184, 'left', 'top');

 // blipp.getPresets().override('Text', 'fontSize', 36);

 // // Create multiple text assets
 // scene.addText("Red text<br>with line break")
 //   .setTranslation(0, 500, 0)
 //   .setScale(1)
 //   .setColor(1, 1, 1)
 //   .setBgColor(250/255, 195/255, 36/255)
 //   .setColor(1, 0, 0)
 //   .setBgColor(1, 1, 1)
 //   .setTextMargins([10, 20]);

  scene.adultOn.setHidden(true);
  scene.adultOff.setHidden(true);
  scene.childOn.setHidden(true);
  scene.childOff.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.watchOff.setHidden(true);
  scene.backArrow.setHidden(true);
  scene.back.setHidden(true);
  scene.watchOn.setHidden(true);
  scene.ok.setHidden(true);
  hideMessages(true);
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
      scene.back.setHidden(false);
      scene.message1.setHidden(false);
      childMode = true;

      if(trackLost) {
        scene.setWorldOrientation([0, 0, 1, - 90]);
        scene.backArrow.setTranslation(-sH/2 + 50, sW/2, 0);
        rotateMessages(true);
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
    scene.cock.setScale(8, 8, 8).setTranslation(- 50, - 50, 0).setRotationY(45);
    scene.box1.applyToNodeAndDescendants('setHidden', true);
    scene.box2.applyToNodeAndDescendants('setHidden', true);
    scene.ok.setHidden(true);
    scene.back.setHidden(true);
    hideMessages(true);
    if(childMode) {
      childMode = false;
      scene.setWorldOrientation([0, 0, 1, 0]);
      scene.backArrow.setTranslation(-sW/2, sH/2, 0);
      rotateMessages(false);
      closeBox(scene.box1_2);
      closeBox(scene.box2_2);
      tryCount = 5;
      successResults = 0;
      stage2 = false;
    }
  });

  scene.back.on('touchEnd', function() {
    this.setHidden(true);
    scene.backArrow.setHidden(true);
    scene.adultOff.setHidden(false);
    scene.childOff.setHidden(false);
    scene.watchOff.setHidden(true);
    scene.watchOn.setHidden(true);
    scene.cock.applyToNodeAndDescendants('setHidden', false);
    scene.cock.setScale(8, 8, 8).setTranslation(- 50, - 50, 0).setRotationY(45);
    scene.box1.applyToNodeAndDescendants('setHidden', true);
    scene.box2.applyToNodeAndDescendants('setHidden', true);
    scene.ok.setHidden(true);
    scene.back.setHidden(true);
    hideMessages(true);
    if(childMode) {
      childMode = false;
      scene.setWorldOrientation([0, 0, 1, 0]);
      scene.backArrow.setTranslation(-sW/2, sH/2, 0);
      rotateMessages(false);
      closeBox(scene.box1_2);
      closeBox(scene.box2_2);
      tryCount = 5;
      successResults = 0;
      stage2 = false;
    }
  });

  scene.ok.on('touchEnd', function() {
    this.setHidden(true);
    hideMessages(true);
    canPush = true;
    closeBox(scene.box1_2);
    closeBox(scene.box2_2);
    if(!stage2) {
      trueNumber = random(1, 2);
    } else {
      trueNumber = 1;
    }

    console.log(trueNumber);

    tryMessages();

  });

  scene.box1_1.on('touchEnd', function() {
    if(canPush) {

      // Inserting cock into box
      scene.cock.applyToNodeAndDescendants('setHidden', false);

      if(trueNumber === 1) {
        scene.cock.setScale(4, 4, 4).setTranslation(- 200, - 120, 0).setRotationY(45);
      } else {
        scene.cock.setScale(4, 4, 4).setTranslation(200, - 120, 0).setRotationY(45);
      }

      selectedNumber = 1;
      checkBox(scene.box1_2);
      canPush = false;
    }
  });

  scene.box2_1.on('touchEnd', function() {
    if(canPush) {

      // Inserting cock into box
      scene.cock.applyToNodeAndDescendants('setHidden', false);

      if(trueNumber === 1) {
        scene.cock.setScale(4, 4, 4).setTranslation(- 200, - 120, 0).setRotationY(45);
      } else {
        scene.cock.setScale(4, 4, 4).setTranslation(200, - 120, 0).setRotationY(45);
      }
      selectedNumber = 2;
      checkBox(scene.box2_2);
      canPush = false;
    }
  });


};

scene.onShow = function() {
  snowParticles.start();
  isSnowing = true;

  scene.cock.setScale(8, 8, 8).setTranslation(-50, - 50, 0).setRotationY(45);
  scene.box1.setScale(4, 4, 4).setTranslation(- 200, - 120, 0).setRotationY(45);
  scene.box2.setScale(4, 4, 4).setTranslation(200, - 120, 0).setRotationY(45);
  scene.playSound('1.mp3', true);

  delay(2000, function() {
    scene.playSound('2voc.mp3');
  });

  delay(12000, function() {
    scene.adultOff.setHidden(false);
    scene.childOff.setHidden(false);
  });

};

scene.on('trackLost', function () {
  trackLost = true;
  rotateModels(true);
  if(childMode) {
    scene.setWorldOrientation([0, 0, 1, - 90]);
    scene.backArrow.setTranslation(-sH/2 + 50, sW/2, 0);
    rotateMessages(true);
  }
});

scene.on('track', function () {
  trackLost = false;
  scene.setWorldOrientation([0, 0, 1, 0]);
  scene.backArrow.setTranslation(-sW/2, sH/2, 0);
  rotateMessages(false);
  rotateModels(false);
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

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkBox(box) {
  if(selectedNumber == trueNumber) {
    // TODO: show cock
    openFull(box);
  } else {
    // TODO: show empty
    openEmpty(box);
  }
}

function rotateMessages(rotate) {
  if (rotate) {
    scene.message1.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.message2.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.message3.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.message4.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.message5.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.message6.setScale(sH * 2/4, (sH * 2/4)/1.676, 0).setTranslation(- sH * 2/4/2, + (sH * 2/4)/1.676/2, 0);
    scene.try1.setTranslation(- sW * 2/3/2, sW/2, 0);
    scene.try2.setTranslation(- sW * 2/3/2, sW/2, 0);
    scene.try3.setTranslation(- sW * 2/3/2, sW/2, 0);
    scene.try4.setTranslation(- sW * 2/3/2, sW/2, 0);
    scene.try5.setTranslation(- sW * 2/3/2, sW/2, 0);
    scene.ok.setTranslation(0, - sW/2, 0);
    scene.back.setTranslation(- sW/3, - sW/2, 0);
  } else {
    scene.message1.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.message2.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.message3.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.message4.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.message5.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.message6.setScale(sW * 2/3, (sW * 2/3)/1.676, 0).setTranslation(- sW * 2/3/2, + (sW * 2/3)/1.676/2, 0);
    scene.try1.setTranslation(- sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, 0);
    scene.try2.setTranslation(- sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, 0);
    scene.try3.setTranslation(- sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, 0);
    scene.try4.setTranslation(- sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, 0);
    scene.try5.setTranslation(- sW * 2/3/2, sH/2 - (sW * 2/3)/4.184 * 2, 0);
    scene.ok.setTranslation(0, - sH/2 + (sW * 1/3)/1.84, 0);
    scene.back.setTranslation(- sW/3, - sH/2 + (sW * 1/3)/1.84, 0);
  }
}

function hideMessages(hide) {
  scene.message1.setHidden(hide);
  scene.message2.setHidden(hide);
  scene.message3.setHidden(hide);
  scene.message4.setHidden(hide);
  scene.message5.setHidden(hide);
  scene.message6.setHidden(hide);
  scene.try1.setHidden(hide);
  scene.try2.setHidden(hide);
  scene.try3.setHidden(hide);
  scene.try4.setHidden(hide);
  scene.try5.setHidden(hide);
  scene.back.setHidden(hide);
}

function openEmpty(box) {
  // TODO: Empty box animation
  box.animate().translationY(100).duration(500);
  delay(500, function() {
    if (tryCount === 0 && successResults < 3) {
      // TODO: Cock shows himself in first box animation.)
      stage2 = true;

      hideMessages(true);
      scene.playSound('5voc.mp3');
      delay(10000, function() {
        scene.message6.setHidden(false);
        scene.ok.setHidden(false);
        scene.back.setHidden(false);
      });
    } else {
      if (tryCount >=1) {
        scene.message2.setHidden(false);
      } else {
        scene.message6.setHidden(false);
      }
      scene.ok.setHidden(false);
      scene.back.setHidden(false);
    }
  });
}

function openFull(box) {
  // TODO: Full box animation
  box.animate().translationY(100).duration(500);
  successResults ++;
  delay(500, function() {
    if(successResults < 3) {
      if (tryCount === 0) {
        hideMessages(true);
        scene.playSound('5voc.mp3');
        delay(10000, function() {
          scene.message6.setHidden(false);
          scene.ok.setHidden(false);
          scene.back.setHidden(false);
        });
      } else {
        scene.playSound('7voc.mp3');
        delay(3000, function() {
          if(tryCount >= 2 && successResults < 2) {
            scene.message3.setHidden(false);
          } else if (tryCount >= 1) {
            scene.message4.setHidden(false);
          } else if (tryCount === 0) {
            scene.message5.setHidden(false);
          }

          scene.ok.setHidden(false);
          scene.back.setHidden(false);
        });
      }
    } else {
      hideMessages(true);
      scene.playSound('9voc.mp3');
      delay(8000, function() {
        scene.message5.setHidden(false);
        scene.ok.setHidden(false);
        scene.back.setHidden(false);
        tryCount = 0;
        successResults = 0;
        stage2 = falsel
      });
    }
  });
}

function tryMessages() {
  if(tryCount === 5) {
    scene.try5.setHidden(false);
    tryCount = 4;
  } else if(tryCount === 4) {
    scene.try4.setHidden(false);
    tryCount = 3;
  } else if(tryCount === 3) {
    scene.try3.setHidden(false);
    tryCount = 2;
  } else if(tryCount === 2) {
    scene.try2.setHidden(false);
    tryCount = 1;
  } else if(tryCount === 1) {
    scene.try1.setHidden(false);
    tryCount = 0;
  } else if(tryCount === 0) {
    tryCount = 5;
    scene.try5.setHidden(false);
    successResults = 0;
  }
}

function closeBox(box) {
  box.animate().translationY(49.32584762573242).duration(500);
}

function rotateModels(rotate) {
  if (rotate) {
    scene.cock.setRotationX(35.264);
    scene.box1.setRotationX(35.264);
    scene.box2.setRotationX(35.264);
  } else {
    scene.cock.setRotationX(0);
    scene.box1.setRotationX(0);
    scene.box2.setRotationX(0);
  }
}
