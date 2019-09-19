
(function (ScoreTable) {
  'use strict';

  var gameTime = 10;

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
    $('#game-time').text(gameTime);
    setClockUpdate();
  };

  var setPhraseChange = function setPhraseChange () {
    $.get('/api/phrases', function success (response) {
      response = JSON.parse(response);
      var index = Math.floor(Math.random() * response.length);
      var text = response[index].text;
      gameTime = response[index].time;
      $('#game-phrase').text(text);
      $('#game-phrase-word-amount').text($('#game-phrase').text().split(/\s+/).length);
      $('#game-time').text(gameTime);
    });
  };

  var setScoreUpdate = function setScoreUpdate () {
    var gameInput = $('#game-input');
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
      var gamePhrase = $('#game-phrase').text();
      var isGameInputCorrect = function isGameInputCorrect () {
        return gameInputValue !== '' && gameInputValue === gamePhrase.slice(0, gameInputValueLength);
      };

      $('#game-input-length').text(gameInputValueLength);
      $('#game-input-word-amount').text(gameInputValue.split(/\s+/).filter(isNonEmptyString).length);
      void (isGameInputCorrect() ? setGameInputAsCorrect() : setGameInputAsWrong());
    });
  };

  var showGameScore = function showGameScore () {
    $('#game-score-table').stop().fadeToggle(500);
  };

  var startGame = function startGame () {
    $('#game-phrase-word-amount').text($('#game-phrase').text().split(/\s+/).length);
    $('#game-change-phrase-button').click(setPhraseChange);
    $('#game-restart-button').click(setGameRestart);
    $('#game-show-score-button').click(showGameScore);
    $('#game-time').text(gameTime);
    setScoreUpdate();
    setClockUpdate();
  };

  var updateTableScore = function updateTableScore (score) {
    ScoreTable.insert(score);
  };

  $(document).ready(startGame);
}(ScoreTable));
