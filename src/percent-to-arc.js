define(function() {
    function getXYForPercent(r,percent) {
        // since we're moving clockwise instead of a unit circle's
        // normal counter clockwise, we need to negate the angle, and then
        // swap 0 for pi and vice versa
        var angle = -1 * percent * (2 * Math.PI);
        if (percent === .5) {
            angle = 0;
        }
        if (percent === 0) {
            angle = Math.PI;
        }

        // round these to nearest 10th
        // x is offset by the radius because we started at the top, not
        //  the vertical middle
        // x and y are switched because the circle starts 90 degress from
        //  where the unit circle usually starts
        var x = -1 * Math.round(10 * r * Math.sin(angle))/10;
        var y = r - (-1 * Math.round(10 * r * Math.cos(angle))/10);

        return [x,y];
    };
    return function(cX,cY,r,percent) {
        // Draw two arcs when there are more than 50%
        var secondPercent = 0;
        if (percent > .5) {
            secondPercent = percent - .5;
            percent = .5;
        }

        var firstXY = getXYForPercent(r,percent);

        var arc = 'M ' + cX + ',' + cY + '\n'
                + 'm 0' + ',-' + r + '\n'
                + 'a ' + r + ',' + r + ' 0 1,0 ' + firstXY[0] + ',' + firstXY[1];

        if (!secondPercent) {
            return arc;
        }

        var secondXY;
        secondXY = getXYForPercent(r,secondPercent);
        // movement for the second arc will always go up/left
        // so the coordinates become negative
        arc += '\n'
            + 'a ' + r + ',' + r + ' 0 1,0 ' + (secondXY[0]*-1) + ',' + (secondXY[1] * -1);

        return arc;
    };
});
