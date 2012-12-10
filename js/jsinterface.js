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
            }
    }
}
