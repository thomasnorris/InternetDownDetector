(function() {
    const CONSECUTIVE_FAILS = 10;
    const PING_TIME_MILLI = 1000;

    var ping = require('ping').sys.probe;
    var hosts = ['8.8.8.8'];

    var failCounter = 0;
    var timer;
    timer = StartTimer(() => {
        hosts.forEach((host) => {
            ping(host, (isAlive) => {
                if (!isAlive) {
                    if (++failCounter == CONSECUTIVE_FAILS) {
                        StopTimer(timer);
                        console.log('The internet went down.');
                    }
                } else
                    failCounter = 0;
            });
        });
    }, PING_TIME_MILLI);


    function StartTimer(functionToStart, loopTimeMilli) {
        return setInterval(functionToStart, loopTimeMilli);
    }

    function StopTimer(timer) {
        clearInterval(timer);
    }
})();