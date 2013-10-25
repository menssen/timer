define([
    'timer-widget'
], function(timerWidget) {
    var widget = new timerWidget('timer', 'start', 'reset');
    widget.start();
});
