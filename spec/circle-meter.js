define([
    '../src/circle-meter'
], function(circleMeter) {
    describe("circle-meter", function() {
        var percentToArc;
        var circles = [
            {
                color: '#f00',
                percent: 0.5
            },
            {
                color: '#0f0',
                percent: 0.25
            },
            {
                color: '#00f',
                percent: 0.75
            }
        ];

        beforeEach(function() {
            percentToArc = jasmine.createSpy();
        });

            
        // it("returns the number of paths based on the number of values given", function() {
        //     expect(circleMeter(percentToArc, 50, circles).svg.match(/\<path/g).length).toBe(3);
        // });

        it("asks the drawer for the correct number of paths with the correct radii", function() {
            circleMeter(percentToArc, 2, 10, 50, circles);
            expect(percentToArc).toHaveBeenCalledWith(76,76,50,0.5);
            expect(percentToArc).toHaveBeenCalledWith(76,76,62,0.25);
            expect(percentToArc).toHaveBeenCalledWith(76,76,74,0.75);
        });

        it("finds the correct center point of the drawer", function() {
            circleMeter(percentToArc,5,9,40,[{ color: '#fff', percent: .5 },{ color: '#000', percent: .74}]);
            expect(percentToArc).toHaveBeenCalledWith(59,59,40,.5);
        });

        it("returns an svg string", function() {
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.substr(0,4)).toBe('<svg');
        });

        it("returns three paths", function() {
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/\<path/g).length).toBe(3);
        });

        it("returns the number of calls to drawer matching number of circles", function() {
            percentToArc.andReturn('sentinal');
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/d\=\"sentinal\"/g).length).toBe(3);
        });

        it("returns the size of the svg", function() {
            expect(circleMeter(percentToArc, 2, 10, 50, circles).size).toBe(152);
            expect(circleMeter(percentToArc, 3, 11, 51, circles).size).toBe(164);
        });

        it("draws the right stroke width", function() {
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/stroke\-width\=\"2\"/g).length).toBe(3);
        });

        it("draws the right stroke colors", function() {
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/stroke\=\"#f00\"/g).length).toBe(1);
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/stroke\=\"#0f0\"/g).length).toBe(1);
            expect(circleMeter(percentToArc, 2, 10, 50, circles).svg.match(/stroke\=\"#00f\"/g).length).toBe(1);
        });
    });
});
