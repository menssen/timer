define([
    './circle-meter',
    './percent-to-arc',
    './time-formatter'
], function(meter, drawer, formatter, colors) {

    // pad leading 0
    // not unit tested, sorry universe
    function pad(num) {
        num += '';
        if (num.length >= 2) {
            return num;
        }
        num = '0' + num;
        return pad(num);
    };

    var view = function(stroke, spacing, innerRadius, colors, initialMs, currentMs) {
        this._stroke = stroke;
        this._spacing = spacing;
        this._innerRadius = innerRadius;
        this._colors = colors;
        this._initialMs = initialMs;
        this._formatter = new formatter(initialMs, currentMs);
        this._meter = new meter(drawer, stroke, spacing, innerRadius, [
            {
                color: colors[0],
                percent: this._formatter.secondsPercent()
            },
            {
                color: colors[1],
                percent: this._formatter.minutesPercent()
            },
            {
                color: colors[2],
                percent: this._formatter.hoursPercent()
            }
        ]);
    };

    view.prototype = {

        // actual text of svg object
        svg: function() {
            return this._meter.svg;
        },

        // size of svg bounds
        size: function() {
            return this._meter.size;
        },

        // string representation of current timer time
        timeString: function() {
            return pad(this._formatter.totalHours()) + ':' 
                + pad(this._formatter.modMinutes()) + ':' + pad(this._formatter.modSeconds());
        },

        // create a new timer view at a new end time, with the same properties
        tick: function(newMs) {
            return new view(this._stroke,this._spacing,this._innerRadius,this._colors,this._initialMs,newMs);
        }
    };

    return view;
});
