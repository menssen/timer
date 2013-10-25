define(function() {
    var tf = function(initialMs, currentMs) {
        this.initialMs = initialMs;
        this.currentMs = currentMs;
    };

    tf.prototype = {
        totalSeconds: function() {
            return (Math.floor((this.currentMs - this.initialMs)/1000));
        },
        totalMinutes: function() {
            return (Math.floor(this.totalSeconds()/60));
        },
        totalHours: function() {
            return (Math.floor(this.totalMinutes()/60));
        },
        modSeconds: function() {
            return this.totalSeconds() - this.totalMinutes() * 60;
        },
        modMinutes: function() {
            return this.totalMinutes() - this.totalHours() * 60;
        },
        secondsPercent: function() {
            return this.modSeconds() / 60;
        },
        minutesPercent: function() {
            return this.modMinutes() / 60;
        },
        totalDays: function() {
            return (Math.floor(this.totalHours()/24));
        },
        modHours: function() {
            return this.totalHours() - this.totalDays() * 24;
        },
        hoursPercent: function() {
            return this.modHours() / 24;
        }
    };

    return tf;
});
