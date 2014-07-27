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