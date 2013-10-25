define([
    '../src/timer-view'
], function(timerView) {
    describe('timer-view', function() {
        var tv;
        var colors = ['#f00','#0f0','#00f'];

        beforeEach(function() {
            tv = new timerView(2, 10, 100, colors, 0, 86462200);
        });

        it('gets an svg with three paths from the meter', function() {
            expect(tv.svg().match(/\<path/g).length).toBe(3);
        });

        it('gets the correct size for the display', function() {
            expect(tv.size()).toBe(252);
        });

        it('displays the time correctly', function() {
            expect(tv.timeString()).toBe('24:01:02');
        });

        it('ticks', function() {
            expect(tv.tick(86584200).timeString()).toBe('24:03:04');
        });

        it('knows the start time', function() {
            expect(tv.startTime()).toBe(0);
        });

        it('knows the current time', function() {
            expect(tv.currentTime()).toBe(86462200);
        });
    })
});


