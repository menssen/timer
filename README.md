# Timer Demo

This is the most overbuilt timer on the planet.

View here:

* [timer](http://menssen.github.io/timer)
* [test output](http://menssen.github.io/timer/SpecRunner.html)

Or clone this, and then index.html will open the timer and SpecRunner.html will run the tests.

## Libraries Used

Only Jasmine for testing and RequireJS for managing source dependencies (because otherwise listing every javascript source in the html index is a pain and difficult to deploy). jQuery seemed overkill for the basic rendering here.

## Implementation Notes

Each part:

* __percent-to-arc.js__ converts a percentage to an svg path that represents part of a circle
* __circle-meter.js__ combines those circle parts concentrically into an svg
* __time-formatter.js__ calculates the hours, minutes, and days based on seconds past, and the percentage of each level of the next larger time (to be represented by the circle)
* __timer-view.js__ combines the above parts, and handles the "tick" logic
* __timer-widget.js__ handles the interface events
* __main.js__ bootstraps the application

## Deficiencies

* __timer-widget.js__ is not tested, because faking the clock and interface events are a pain
* The rendering is slower than it could be, because it redraws the whole thing every 100ms. Doesn't seem to be an issue for something this simple, but could be improved with more state and e.g. svg animations
* Doesn't work in IE8 because of the native SVG usage.
* JS should be minified/combined using the RequireJS builder.
