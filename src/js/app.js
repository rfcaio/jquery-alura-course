
(function () {
  'use strict';

  var setClockUpdate = function setClockUpdate () {
    var gameInput = $('#game-input');

    gameInput.one('focus', function onGameInputFocus () {
      var gameInterval = setInterval(function tick () {
        var time = parseInt($('#game-time').text(), 10);
        if (time <= 1) {
          $('#game-restart-button').removeAttr('disabled');
          clearInterval(gameInterval);
          gameInput.attr('disabled', true);
        }
        $('#game-time').text(time - 1);
      }, 1000);
    });
  };

  var setGameRestart = function setGameRestart () {
    $('#game-input').removeAttr('disabled').val('');
    $('#game-input-length').text(0);
    $('#game-input-word-amount').text(0);
    $('#game-restart-button').attr('disabled', true);
    $('#game-time').text(10);
    setClockUpdate();
  };

  var setScoreUpdate = function setScoreUpdate () {
    var gameInput = $('#game-input');
    var isNonEmptyString = function isNonEmptyString (word) {
      return word !== '';
    };

    gameInput.on('input', function onGameInputChange () {
      $('#game-input-length').text(gameInput.val().length);
      $('#game-input-word-amount').text(gameInput.val().split(/\s+/).filter(isNonEmptyString).length);
    });
  };

  var startGame = function startGame () {
    $('#game-phrase-word-amount').text($('#game-phrase').text().split(/\s+/).length);
    $('#game-restart-button').click(setGameRestart);
    setScoreUpdate();
    setClockUpdate();
  };

  $(document).ready(startGame);
}());
