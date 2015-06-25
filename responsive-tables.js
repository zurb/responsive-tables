(function ($, window) {
  // DOM Ready.
  $(function () {
    var $window = $(window);
    var $responsiveTable = $('table.responsive');
    var switched = false;

    function setCellHeights(original, copy) {
      var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

      tr.each(function (index) {
        var self = $(this),
          tx = self.find('th, td');

        tx.each(function () {
          var height = $(this).outerHeight(true);
          heights[index] = heights[index] || 0;
          if (height > heights[index]) {
            heights[index] = height;
          }
        });
      });

      tr_copy.each(function (index) {
        $(this).height(heights[index]);
      });
    }

    function splitTable(original) {
      original.wrap('<div class="table-wrapper" />');

      var copy = original.clone();
      copy.find('td:not(:first-child), th:not(:first-child)').css('display', 'none');
      copy.removeClass("responsive");

      original.closest('.table-wrapper').append(copy);
      copy.wrap('<div class="pinned" />');
      original.wrap('<div class="scrollable" />');

      setCellHeights(original, copy);
    }

    function unsplitTable(original) {
      original.closest('.table-wrapper').find('.pinned').remove();
      original.unwrap();
      original.unwrap();
    }

    function updateTables() {
      if ($window.width() < 767 && !switched) {
        switched = true;
        $responsiveTable.each(function (i, element) {
          splitTable($(element));
        });
        return true;
      }

      if (switched && $window.width() > 767) {
        switched = false;
        $responsiveTable.each(function (i, element) {
          unsplitTable($(element));
        });
      }
    }

    $window.on('load', updateTables);
    // @todo Debounce this.
    $window.on('resize', updateTables);
    $window.on('redraw', function () {
      switched = false;
      updateTables();
    });
  });

})(jQuery, window);
