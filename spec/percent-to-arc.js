define(['../src/percent-to-arc'], function(percentToArc) {
    describe('percent-to-arc', function() {
        it('moves to the top center of the circle', function() {
            expect(percentToArc(50,60,25,.5).substr(0,15)).toBe('M 50,60\nm 0,-25');
            expect(percentToArc(130,40,10,.5).substr(0,16)).toBe('M 130,40\nm 0,-10');
        });

        it('outputs one arc for percents < 0.5', function() {
            expect(percentToArc(50,50,50,0).split('\n').length).toBe(3);
            expect(percentToArc(50,50,50,0.1).split('\n').length).toBe(3);
            expect(percentToArc(50,50,50,0.49).split('\n').length).toBe(3);
        });

        it('outputs two arcs for percents > 0.5', function() {
            expect(percentToArc(50,50,50,.51).split('\n').length).toBe(4);
            expect(percentToArc(50,50,50,0.99).split('\n').length).toBe(4);
            expect(percentToArc(50,50,50,1).split('\n').length).toBe(4);
        });

        it('outputs the correct arc length for the first arc', function() {
            // 25% should end up at the right middle
            expect(percentToArc(50,50,50,.25).split('\n')[2]).toBe('a 50,50 0 1,0 50,50');

            // 0% should end up at the top center
            expect(percentToArc(50,50,50,0).split('\n')[2]).toBe('a 50,50 0 1,0 0,0');

            // 50% should end up at the bottom center
            expect(percentToArc(50,50,50,.5).split('\n')[2]).toBe('a 50,50 0 1,0 0,100');

        });

        it('only draws one arc for 50%', function() {
            expect(percentToArc(50,50,50,.5).split('\n').length).toBe(3);
        });

        it('outputs a full first arc for numbers over 50%', function() {
            expect(percentToArc(50,50,50,.9).split('\n')[2]).toBe('a 50,50 0 1,0 0,100');
        });

        it('outputs the correct arc length for the second arc', function() {
            // 75% should end up at the left middle
            expect(percentToArc(50,50,50,.75).split('\n')[3]).toBe('a 50,50 0 1,0 -50,-50');

            // 100% should end up at the top center
            expect(percentToArc(50,50,50,1).split('\n')[3]).toBe('a 50,50 0 1,0 0,-100');

        });
    });
});
