(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var RenderComponent = function () {
  console.log('module: Render Component');
  this.height = 100;
  this.width = 100;
}

RenderComponent.prototype = {
  tick : function () {
    console.log('render.tick()');
  }
}

module.exports = RenderComponent;
},{}],2:[function(require,module,exports){
'use strict';

var RenderComponent = require('./components/render');

var Entity = function (name) {
  console.log('module: Entity');
  this.name = name;
  this.components = [];
}

Entity.prototype = {
  tick : function () {
    console.log('Entity.tick()');
    this.tickComponents();
  },
  tickComponents : function () {
    var l = this.components.length;
    while (l--) {
      if (this.components[l].tick) {
        this.components[l].tick();
      }
    }
  },
  init : function () {
    this.components.push(new RenderComponent());
  }
}

module.exports = Entity;
},{"./components/render":1}],3:[function(require,module,exports){
'use strict';

var Entity = require('./entity');

var Game = function () {
  console.log('module: Game');
  this.entities = [];
}

Game.prototype = {

  init : function () {
    console.log('Game: init()');
    this.entities.push(new Entity());
    this.initEntities();
  },

  initEntities : function () {
    var l = this.entities.length;
    while (l--) {
      if (this.entities[l].init) {
        this.entities[l].init();
      }
    }
  },

  loop : function () {
    this.animationFrameId = window.requestAnimationFrame(this.loop.bind(this));
    this.tick();
  },

  tick : function () {
    console.log('tick()');
    this.tickEntities();
  },

  tickEntities: function () {
    var l = this.entities.length;
    while (l--) {
      if (this.entities[l].tick) {
        this.entities[l].tick();
      }
    }
  },

  start : function () {
    console.log('Game: start()');
    if (!this.animationFrameId) {
      this.loop();
    }
  },

  stop : function () {
    console.log('Game: stop()');
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

};

module.exports = Game;





},{"./entity":2}],4:[function(require,module,exports){
(function(){

  'use strict';

  require('./raf-polyfill');

  var Game = require('./game');

  var game;


  function onCanvasClick (e) {
    console.log(e);
  }

  function onStartStopLinkClick (e) {
    var el = e.currentTarget;
    if (el.innerHTML === 'start') {
      el.innerHTML = 'stop';
      game.start();
    } else {
      el.innerHTML = 'start';
      game.stop();
    }
  }

  function bindEventListeners () {
    var canvas = document.getElementById('Canvas');
    canvas.addEventListener('click', onCanvasClick);
    var startStopLink = document.getElementById('StartStopLink');
    startStopLink.addEventListener('click', onStartStopLinkClick);
  }

  function initGame () {
    game = new Game();
    game.init();
  }

  function init () {
    console.log('--- JS Component Entity System ---');
    bindEventListeners();
    initGame();
  };

  init();

})();
},{"./game":3,"./raf-polyfill":5}],5:[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

'use strict';

console.log('module: raf-polyfill');

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




},{}]},{},[4])