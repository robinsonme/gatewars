Countdown = (function () {

    // Constructor
    function Countdown(countdown, settings) {
        this._settings = settings || {};
        this._dependency = new Tracker.Dependency;
        this._countdown = countdown;
        this._interval = this._settings.interval || 1000;
        this._steps = this._settings.steps || 1;
        this._id = false;
    };

    Countdown.prototype.start = function(completed, tick){

        if(completed) this._settings.completed = completed;
        if(tick) this._settings.tick = tick;

        this._current = this._countdown;

        this._id = Meteor.setInterval(function(){

            this._current = this._current - this._steps;

            if(typeof(this._settings.tick) == "function") {
                this._settings.tick();
            }

            this._dependency.changed();

            if(this._current <= 0) {

                this._current = this._countdown;

                if(typeof(this._settings.completed) == "function") {
                    this._settings.completed();
                }
            }

        }.bind(this), this._interval);
    };

    Countdown.prototype.stop = function(){
        Meteor.clearInterval(this._id);
        this._id = false;
    };

    Countdown.prototype.add = function(unit) {
        this._current = this._current + (unit || 0);
    };

    Countdown.prototype.remove = function(unit) {
        this._current = this._current - (unit || 0);
    };

    Countdown.prototype.get = function() {

        this._dependency.depend();

        return this._current;
    };

    Countdown.prototype.getFormattedObject = function(seconds){

        var ms = (seconds | this._current) * 1000;

        return {
            seconds: Math.floor((ms % 6e4) / 1e3),
            minutes: Math.floor((ms % 3.6e6) / 6e4),
            hours:  (ms % 8.64e7)/ 3.6e6 | 0,
            days: ms / 8.64e7 | 0
        }
    };

    Countdown.prototype.getFormattedString = function(format){

        var format = (typeof format == 'string' || format instanceof String) ? format : '<!%DD days >%HH hours %MM minutes %SS seconds',
            current = this.getFormattedObject();

        var parts = [['S', 'seconds'], ['M', 'minutes'], ['H', 'hours'], ['D', 'days']];
        for(var i = 0; i < parts.length ; i++) {

            var part = parts[i], v =  current[part[1]] | 0;

            format = format.replace(new RegExp("<!([^>]*)(%" + part[0] + part[0] + "?)([^>]*)>", "g"), v ? "$1$2$3" : "" )
                            // If any %X or %XX is 0, anything within the surrounding `<!` and `>` to be "" (removed)
                            // This is required if a user doesn't want to display a part that is equal to 0
                            // eg. in format "<! %HH hours > ....", if the user doesn't want to display hours when (hours == 0), its of no use displaying the string next to it " hours"
                            // To do so, all he has to do is enclose a part within <! and > and it will be removed from formatted string if the part is 0.

                            .replace(new RegExp("(.*)%" + part[0] + part[0] + "(.*)", "g"), "$1" + ((v >= 0) && (v < 10) ? '0' : '') + v + "$2")
                            //To pad single digit parts with a preceding zero, The user has to specify %XX instead of %X

                            .replace(new RegExp("(.*)%" + part[0] + "(.*)", "g"), "$1" + v + "$2");
                            //finally replace %X not enclosed within <! >

        }

        return format;
    };

    return Countdown;
})();
