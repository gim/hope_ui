var data;

var data = {
    d : null, 
    load : function() {
        schedule = JSON.parse(window.JSInterface.getScheduleJson(false));
        this.setSchedule(schedule);
    },
    setSchedule : function(schedule) {
        data.d = schedule;

        now    = new Date();
        offset = now.getTimezoneOffset() * 60;

        for (var i in data.d) {
            data.d[i].timestamp -= offset;
        }
    },
    loadForce : function() {
        data.d = JSON.parse(window.JSInterface.getScheduleJson(true));
    },
    numberOfTalks : function() {
        return data.d.length;
    },
    talks : function() {
        return data.d;
    },
    talkById : function(wanted) {
        var i, n = data.d.length;
        for(i = 0; i < n; ++i) {
          var talk = data.d[i];
          if (talk.id == wanted)
            return talk;
        }
        return undefined;
    }
};
