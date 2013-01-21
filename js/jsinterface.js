// If we're running under a webview in IOS then...
if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)) {

    // .. insert a well known div in which we can place 'hope://' URIs and ...
    $(function() {
        $("html").append("<div id='jsinterface' style='display:none'></div>")
    })

    // ... instance the JSInterface and setup the required DOM elements. Assume
    // the interface is already in place if we're under Android.
    window.JSInterface = {
            returnValue : null,
            runCommand : function(command) {
                    $("#jsinterface").html('<iframe src="'+command+'"></iframe>');
            },
            getScheduleJson : function(forceDownload) {
                    if(forceDownload)
                            JSInterface.runCommand('hope://getScheduleJson/true');
                    else
                            JSInterface.runCommand('hope://getScheduleJson/false');
                    return JSInterface.returnValue;
            },
            getNoticeJson : function() {
                    JSInterface.runCommand('hope://getNoticeJson');
                    return JSInterface.returnValue;
            },
            getFavorites : function() {
                    JSInterface.runCommand('hope://getFavorites');
                    return JSInterface.returnValue;
            },
            saveFavorites : function(favorites) {
                    JSInterface.runCommand('hope://saveFavorites/'+favorites);
            },
            getFilter : function() {
                    JSInterface.runCommand('hope://getFilter');
                    return JSInterface.returnValue;
            },
            saveFilter : function(filter) {
                    JSInterface.runCommand('hope://saveFilter/'+filter);
            },
            haveCalendar : function ()
                { return false; }
    }
}

if (!window.JSInterface) {
    // This is a quick debugging implementation of the interfaces for use
    // within a desktop webbrowser. It may not reliably keep state across
    // pages, and includes some nasty races.
    window.JSInterface = {
        root        : "http://localhost:3000/",
        filter      : "",
        favorites   : "{ }",

        // HACK: The current architecture assumes all JSInterface functions
        // are blocking, but there does not appear to be a reliable way to
        // simulate this in browser. As this function is only called by the
        // initialisation routines on page load we quickly just call the
        // display routine after jamming the schedule into 'data'.
        getScheduleJson : function (forceDownload) {
            "use strict";
            $.ajax({
                url: this.root + 'json.php',
                dataType: 'jsonp'
            }).done (function (data) {
                window.data.setSchedule(data)
                displayTalks();
            })

            return "{ }";
        },

        getFavorites : function ()
            { return this.favorites; },

        getFilter : function ()
            { return this.filter; },

        saveFilter : function (filter)
            { this.filter = filter; },

        saveFavorites : function (favorites)
            { this.favorites = favorites; },

        // HACK: This is an Android specific function.
        haveCalendar : function ()
            { return false; }
    };
}
