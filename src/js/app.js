
(function () {
  'use strict';

  var message = $('#message').text();
  var messageLength = message.split(' ').length;
  $('#message-length').text(messageLength === 1 ? 'A single word.' : messageLength + ' words.');
}());
