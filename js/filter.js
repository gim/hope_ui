var filter = {
    filter : 'all',
    query : null,
    filterFunc : function(talk) { return true; },
    load : function() {
        filter.filter = window.JSInterface.getFilter();
        var q = $.jqURL.get('q');
        if (q) {
          filter.query = decodeURI(q);
          filter.querylc = filter.query.toLowerCase();
        }
    },
    save : function() {
        window.JSInterface.saveFilter(filter.filter);
    },
    display : function() {
        var html = '';
        html = '<p id="filter">';
        html += '<span id="day-sunday" filter="sunday">Sun</span>&thinsp;';
        html += '<span id="day-monday" filter="monday">Mon</span>&thinsp;';
        html += '<span id="day-tuesday" filter="tuesday">Tue</span>&thinsp;';
        html += '<span id="day-wednesday" filter="wednesday">Wed</span>&thinsp;';
        html += '<span id="day-thursday" filter="thursday">Thu</span>&thinsp;';
        html += '<span id="day-fri" filter="fri">Fri</span>&thinsp;';
        html += '<span id="day-saturday" filter="saturday">Sat</span>&thinsp;';
        html += '<span id="day-all" filter="all">ALL</span>';
        html += '</p>';
        if (filter.query) {
            html += '<p id="query" class="only">';
            // FIXME: escape query
            html += 'Searching for <strong id="filter_query">';
            html += Util.escapeHtml(filter.query);
            html += '</strong>';
            html += '<br />';
            html += '<a href="#" id="clear_query">Clear Search</a>';
            html += '</p>';
        }
        return html;
    },
    bindCallbacks : function() {
        // set current filter
        $("#day-"+filter.filter).addClass('current');
        
        // set callbacks
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'fri', 'saturday', 'all'];
        for(day in days) {
            $("#day-"+days[day]).bind('click', function() {
                $("#day-"+filter.filter).removeClass('current');
                filter.filter = $(this).attr('filter');
                filter.save();
                $("#day-"+filter.filter).addClass('current');
                displayTalks(filter.filterFunc);
            });
        }
        $("#clear_query").click(function() {
            filter.query = null;
            $("#query").remove();
            displayTalks(filter.filterFunc);
        });
    }
}

