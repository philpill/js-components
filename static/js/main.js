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