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