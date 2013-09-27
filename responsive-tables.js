(function($){
  $("table.responsive").each(function(){
    var table = $(this);
    if (table.parent(".table-wrapper").length === 1) return;

    var wrapper = $("<div>").addClass("table-wrapper"),
        pinned = $("<div>").addClass("pinned"),
        scrollable = $("<div>").addClass("scrollable");
    table.wrap(wrapper);
    table.after(pinned);
    table.wrap(scrollable);
    pinned.html(table.clone().removeClass("responsive"));
    
    // Make everything but first column visible
    pinned.find("th,td").not(pinned.find("th:first-child, td:first-child")).hide();
  });
})(jQuery);