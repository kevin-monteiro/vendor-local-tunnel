const lambdaTunnel = require('@lambdatest/node-tunnel/lib/tunnel');

const { LAMBDATEST_KEY, LAMBDATEST_USER, TUNNEL } = process.env;

const pidFile = "debug/lt_tunnel.pid";
const tunnelArguments = {
    user: LAMBDATEST_USER,
    key: LAMBDATEST_KEY,
    tunnelName: TUNNEL,
    pidFile,
    logFile: 'debug/lt-tunnel.log',
    detachedMode: "true"
};

// Async/Await Style
(async () => {
    const tunnelInstance = new lambdaTunnel();
    return new Promise((resolve, reject) => {
        tunnelInstance.start(tunnelArguments, (error) => {
            if (tunnelInstance.isRunning()) {
                console.log('Tunnel is Running Successfully');
                resolve(tunnelInstance);
            } else {
                const msg = error ? error.message : 'Unknown Error..';
                reject(new Error(`Local Lambda tunnel starting failed: \n ${msg}`));
            }
        });
    });
})();