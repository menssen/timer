// Draws a set of concentric circles using the provided drawer, spacing,
// stroke width, colors, and percentages
define(function() {
    return function(drawer, stroke, spacing, innerRadius, circles) {
        var center = innerRadius + (stroke + spacing) * (circles.length - 1) + stroke;
        var svg = '<svg width="' + (center*2) + '" height="' + (center*2) + '" xmlns="http://www.w3.org/2000/svg" version="1.1">';
        for (var i in circles) {
            svg += '<path fill="none" d="'
                 + drawer(center,center,(innerRadius+(i*(spacing+stroke))),circles[i].percent)
                 + '" stroke-width="' + stroke + '" stroke="' + circles[i].color + '" />';
        }
        return {
            svg: svg + '</svg>',
            size: center*2
        };
    };
});
