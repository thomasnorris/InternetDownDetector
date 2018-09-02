(function() {
    const CONSECUTIVE_COUNTER = 10;
    const PING_TIME_MILLI = 1000;

    var ping = require('ping').sys.probe;
    var hosts = ['8.8.8.8'];

    var failCounter = 0;
    var succeedCounter = 0;
    var down = false;
    setInterval(() => {
        hosts.forEach((host) => {
            ping(host, (isAlive) => {
                if (!isAlive && !down) {
                    if (++failCounter == CONSECUTIVE_COUNTER) {
                        down = true;
                        console.log('The internet went down.');
                    }
                } else if (isAlive && down) {
                    if (++succeedCounter == CONSECUTIVE_COUNTER) {
                        down = false;
                        console.log('The internet came back up.');
                    }
                } else {
                    failCounter = 0;
                    succeedCounter = 0;
                }
            });
        });
    }, PING_TIME_MILLI);
})();