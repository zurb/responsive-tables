$(document).ready(function() {
  var switched = false;

  function updateTables() {
    var $t = $('table.responsive');
    if (($(window).width() < 767) && !switched) {
      switched = true;
      $t.each(function(i, element) {
        splitTable($(element), ':first-child');
      });
    } else if (switched && ($(window).width() > 767)) {
      switched = false;
      $t.each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };

  $(window).load(updateTables).bind('resize', updateTables);

  function splitTable(original, selector) {
    original.wrap('<div class=table-wrapper>');

    var copy = original.clone();
    copy.removeClass('responsive').find('td:not('+selector+'), th:not('+selector+')').hide();

    original.find('td, th').show().filter(selector).hide();
    original.closest('.table-wrapper').append(copy);
    copy.wrap('<div class=pinned>');
    var ths = original.wrap('<div class=scrollable>').find('th');
    ths.click(function() {
      var n;
      for (var i = 0, l = ths.length; i <= l; i++) {
        if (ths[i] == this) n = i + 1;
      }
      unsplitTable(original);
      var copy = splitTable(original, ':nth-child('+n+')');
      var offset = original.find('th:nth-child('+(n+1)+')').position().left - copy.width();
      original.closest('.scrollable').animate({scrollLeft: offset});
    });
    return copy;
  }

  function unsplitTable(original) {
    original.closest('.table-wrapper').find('.pinned').remove();
    original.unwrap();
    original.unwrap().find('td, th').show();
  }
});
