const { Local } = require('browserstack-local');
const  { writeFileSync } = require('fs');

const pidFile = "tunnel_local_pid";

const tunnelArguments = {
    key: process.env.BROWSERSTACK_KEY,
    logFile: 'bs_tunnel.log',
};

async function startBrowserStackTunnel() {
    const local = new Local();
    return new Promise((resolve, reject) => {
        local.start(tunnelArguments, (error) => {
            if (local.isRunning()) {
                resolve(local);
            } else {
                const msg = error ? error.message : 'Unknown Error..';
                reject(new Error(`Local BS tunnel starting failed: \n ${msg}`));
            }
        });
    });
}

// Async/Await Style
(async function() {
    const local = await startBrowserStackTunnel();
    const pid = local.pid;
    console.log("Started local BS tunnel with pid :", pid);
    writeFileSync(pidFile, String(pid));
})();