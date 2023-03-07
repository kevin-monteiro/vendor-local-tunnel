const { Local } = require('browserstack-local');
const  { writeFileSync } = require('fs');

const pidFile = "debug/bs_tunnel.pid";
const { BROWSERSTACK_KEY, TUNNEL } = process.env;

const tunnelArguments = {
    key: BROWSERSTACK_KEY,
    localIdentifier: TUNNEL,
    logFile: 'debug/bs_tunnel.log',
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
(async () => {
    const local = await startBrowserStackTunnel();
    const pid = local.pid;
    console.log("Started local BS tunnel with pid :", pid);
    writeFileSync(pidFile, String(pid));
})();