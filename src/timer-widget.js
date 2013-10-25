define([
    'timer-view'
], function(timer) {
    function timerWidget(containerId, startButtonId, resetButtonId) {
        this._timerEl = document.getElementById(containerId);
        this._running = false;
        this._zeroed = true;

        var me = this;

        document.getElementById(startButtonId).onclick = function() {
            if (me._running) {
                me.stop();
                document.getElementById(startButtonId).innerHTML = 'Start';
                return;
            }
            me.start();
            document.getElementById(startButtonId).innerHTML = 'Pause';
        };

        document.getElementById(resetButtonId).onclick = function() {
            me.reset();
        };
    };

    timerWidget.prototype = {
        start: function() {
            if (this._running) {
                return;
            }

            this._running = true;
            this._lastStartTime = this._zeroed
                ? (new Date()).getTime()
                : this._lastStartTime + ((new Date()).getTime() - this._currentTick.currentTime());
            this._zeroed = false;
            this._currentTick = new timer(20, 4, 200, ['#888','#aaa','#ddd'], this._lastStartTime, this._lastStartTime);
            this._initialTick = new timer(20, 4, 200, ['#888','#aaa','#ddd'], this._lastStartTime, this._lastStartTime);
            var me = this;
            this._interval = setInterval(function() {
                me._currentTick = me._currentTick.tick(new Date().getTime());
                me._draw(me._currentTick);
            }, 100);
        },

        stop: function() {
            this._running = false;
            clearInterval(this._interval);
        },

        reset: function() {
            if (this._zeroed) {
                return;
            }
            var running = this._running;
            this.stop();
            this._zeroed = true;
            this._draw(this._initialTick);

            if (running) {
                this.start();
            }
        },

        _draw: function(tick) {
            this._timerEl.innerHTML = tick.svg() + '<div>' + tick.timeString() + '</div>';
        }
    };

    return timerWidget;

});
