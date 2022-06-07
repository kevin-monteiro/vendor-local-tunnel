const lambdaTunnel = require('@lambdatest/node-tunnel');

const pidFile = "tunnel_local_pid";
const tunnelInstance = new lambdaTunnel();

// Replace <lambdatest-user> with your user and <lambdatest-accesskey> with your key.
const tunnelArguments = {
    user: process.env.LAMBDATEST_USER,
    key: process.env.LAMBDATEST_KEY,
    pidFile,
    logFile: 'lt-tunnel.log'
};

// Async/Await Style
(async function() {
    try {
        await tunnelInstance.start(tunnelArguments);
        console.log('Tunnel is Running Successfully');
    } catch (error) {
        console.log(error);
    }
})();