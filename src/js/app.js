
(function (ScoreTable) {
  'use strict';

  var setClockUpdate = function setClockUpdate () {
    var gameInput = $('#game-input');
    var finishGame = function finishGame (intervalId) {
      $('#game-restart-button').removeAttr('disabled');
      clearInterval(intervalId);
      gameInput.removeAttr('class').attr('disabled', true);
    };

    gameInput.one('focus', function onGameInputFocus () {
      var intervalId = setInterval(function tick () {
        var time = parseInt($('#game-time').text(), 10);
        if (time <= 1) {
          finishGame(intervalId);
          updateTableScore($('#game-input-word-amount').text());
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
    var gamePhrase = $('#game-phrase').text();
    var isNonEmptyString = function isNonEmptyString (word) {
      return word !== '';
    };
    var setGameInputAsCorrect = function setGameInputAsCorrect () {
      gameInput.addClass('is-correct').removeClass('is-wrong');
    };
    var setGameInputAsWrong = function setGameInputAsWrong () {
      gameInput.removeClass('is-correct').addClass('is-wrong');
    };

    gameInput.on('input', function onGameInputChange () {
      var gameInputValue = gameInput.val();
      var gameInputValueLength = gameInputValue.length;
      var isGameInputCorrect = function isGameInputCorrect () {
        return gameInputValue !== '' && gameInputValue === gamePhrase.slice(0, gameInputValueLength);
      };

      $('#game-input-length').text(gameInputValueLength);
      $('#game-input-word-amount').text(gameInputValue.split(/\s+/).filter(isNonEmptyString).length);
      void (isGameInputCorrect() ? setGameInputAsCorrect() : setGameInputAsWrong());
    });
  };

  var startGame = function startGame () {
    $('#game-phrase-word-amount').text($('#game-phrase').text().split(/\s+/).length);
    $('#game-restart-button').click(setGameRestart);
    setScoreUpdate();
    setClockUpdate();
  };

  var updateTableScore = function updateTableScore (score) {
    ScoreTable.insert(score);
  };

  $(document).ready(startGame);
}(ScoreTable));
