(function() {
    const CONSECUTIVE_FAILS = 20;
    const PING_TIME_MILLI = 1000;
    var ping = require('ping').sys.probe;
    var hosts = ['192.168.0.1', '8.8.8.8']

    StartTimer(() => {
        hosts.forEach((host) => {
            ping(host, (isAlive) => {
                var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                console.log(msg);
            });
        });
    }, PING_TIME_MILLI)


    function StartTimer(functionToStart, loopTimeMilli) {
        return setInterval(functionToStart, loopTimeMilli);
    }
})();