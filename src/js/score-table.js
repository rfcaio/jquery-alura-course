
/* exported ScoreTable */
var ScoreTable = (function () {
  'use strict';

  var gameScoreTable = $('#game-score-table');

  var insert = function insert (content) {
    gameScoreTable.find('tbody').append(_newLine(content));
    gameScoreTable.fadeIn(500);
  };

  var _newCell = function _newCell (content) {
    return $('<td>').append(content);
  };

  var _newDeleteButton = function _newDeleteButton () {
    var onClickToRemove = function onClickToRemove () {
      var self = $(this).parent().parent();
      self.fadeOut('slow', function remove () {
        self.remove();
      });
    };
    return $('<button>').text('Remove').click(onClickToRemove);
  };

  var _newLine = function _newLine (content) {
    return $('<tr>')
      .append(_newCell(content))
      .append(_newCell(_newDeleteButton()));
  };

  return {
    insert: insert
  };
}());
