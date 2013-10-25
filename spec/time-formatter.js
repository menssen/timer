define([
    '../src/time-formatter'
], function(tf) {
    describe('time-formatter', function() {
        var tf1;
        var tf2;
        beforeEach(function() {
            tf1 = new tf(900,2000);
            tf2 = new tf(100000000,1000000000);
            tf3 = new tf(0, 180122000);
        });

        it('calculates the difference between the initial time and current time'
            + ' to the most recently past second, which are given in ms', function()  {
            expect(tf1.totalSeconds()).toBe(1);
            expect(tf2.totalSeconds()).toBe(900000);
        });

        it('calculates the total minutes past', function() {
            expect(tf1.totalMinutes()).toBe(0);
            expect(tf3.totalMinutes()).toBe(3002);
        });

        it('calculates the total hours past', function() {
            expect(tf1.totalHours()).toBe(0);
            expect(tf3.totalHours()).toBe(50);
        });

        it('calculates the seconds past modulo minutes', function() {
            expect(tf1.modSeconds()).toBe(1);
            expect(tf3.modSeconds()).toBe(2);
        });

        it('calculates the minutes past modulo hours', function() {
            expect(tf1.modMinutes()).toBe(0);
            expect(tf3.modMinutes()).toBe(2);
        });

        it('caculates the percentage of the last minute in seconds', function() {
            expect(tf1.secondsPercent()).toBe(1/60);
            expect(tf3.secondsPercent()).toBe(2/60);
        });

        it('caculates the percentage of the last hour in minutes', function() {
            expect(tf1.minutesPercent()).toBe(0/60);
            expect(tf3.minutesPercent()).toBe(2/60);
        });

        it('calculates the total number of days', function() {
            expect(tf1.totalDays()).toBe(0);
            expect(tf3.totalDays()).toBe(2);
        });

        it('calculates the hours past modulo days', function() {
            expect(tf1.modHours()).toBe(0);
            expect(tf3.modHours()).toBe(2);
        });

        it('calculate the percentage of the last day in hours', function() {
            expect(tf1.hoursPercent()).toBe(0/24);
            expect(tf3.hoursPercent()).toBe(2/24);
        });
    });
});
