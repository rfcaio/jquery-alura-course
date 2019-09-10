
/* exported ScoreTable */
var ScoreTable = (function () {
  'use strict';

  var gameScoreTable = $('#game-score-table').find('tbody');

  var insert = function insert (content) {
    gameScoreTable.append(_newLine(content));
  };

  var _newCell = function _newCell (content) {
    return $('<td>').append(content);
  };

  var _newDeleteButton = function _newDeleteButton () {
    var onClickToRemove = function onClickToRemove () {
      $(this).parent().parent().remove();
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
