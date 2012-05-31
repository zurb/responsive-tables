$(document).ready(function() {
  var switched = false;

  function updateTables() {
    var fixTable;
    if (($(window).width() < 767) && !switched) {
      switched = true;
      fixTable = splitTable;
    } else if (switched && ($(window).width() > 767)) {
      switched = false;
      fixTable = unsplitTable;
    }
    $('table.responsive').each(function(i, element) {
      fixTable($(element));
    });
  };

  $(window).load(updateTables).bind('resize', updateTables);

  function splitTable(original) {
    original.wrap('<div class=table-wrapper>');

    var copy = original.clone();
    copy.removeClass('responsive').find('td:not(:first-child), th:not(:first-child)').css('display', 'none');

    original.closest('.table-wrapper').append(copy);
    copy.wrap('<div class=pinned>');
    original.wrap('<div class=scrollable>');
  }

  function unsplitTable(original) {
    original.closest('.table-wrapper').find('.pinned').remove();
    original.unwrap();
    original.unwrap();
  }
});
