
(function () {
  'use strict';

  var isNonEmptyString = function isNonEmptyString (word) {
    return word !== '';
  };

  $('#game-phrase-word-amount').text($('#game-phrase').text().split(/\s+/).length);

  var input = $('#game-input');
  input.on('input', function onInput () {
    $('#game-input-length').text(input.val().length);
    $('#game-input-word-amount').text(input.val().split(/\s+/).filter(isNonEmptyString).length);
  });

  input.one('focus', function onFocus () {
    var gameInterval = setInterval(function tick () {
      var time = parseInt($('#game-time').text(), 10);
      if (time <= 1) {
        clearInterval(gameInterval);
        input.attr('disabled', true);
      }
      $('#game-time').text(time - 1);
    }, 1000);
  });
}());
