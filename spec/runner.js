require([
    'circle-meter',
    'percent-to-arc',
    'time-formatter',
    'timer-view'
], function() {
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();

      jasmineEnv.addReporter(htmlReporter);

      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      jasmineEnv.execute();
});
