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




