const lambdaTunnel = require('@lambdatest/node-tunnel');
const { Local } = require("browserstack-local");
const { writeFileSync } = require("fs");

const { BROWSERSTACK_KEY, LAMBDATEST_KEY, LAMBDATEST_USER, TUNNEL } = process.env;

const ltPid = "debug/lt_tunnel.pid";
const bsPid = "debug/bs_tunnel.pid";

const ltTunnelArgs = {
    user: LAMBDATEST_USER,
    key: LAMBDATEST_KEY,
    tunnelName: TUNNEL,
    pidFile: ltPid,
    logFile: 'debug/lt-tunnel.log',
    detachedMode: "true"
};

const bsTunnelArgs = {
    key: BROWSERSTACK_KEY,
    localIdentifier: TUNNEL,
    logFile: 'debug/bs_tunnel.log',
};

async function startBrowserStackTunnel() {
    const bs = new Local();
    return new Promise((resolve, reject) => {
        bs.start(bsTunnelArgs, (error) => {
            if (bs.isRunning()) {
                resolve(bs);
            } else {
                const msg = error ? error.message : 'Unknown Error..';
                reject(new Error(`BS tunnel starting failed: \n ${msg}`));
            }
        });
    });
}

async function startLambdaTestTunnel() {
    const lt = new lambdaTunnel();
    return new Promise((resolve, reject) => {
        lt.start(ltTunnelArgs, (error) => {
            if (lt.isRunning()) {
                console.log('LT Tunnel is Running Successfully');
                resolve(lt);
            } else {
                const msg = error ? error.message : 'Unknown Error..';
                reject(new Error(`Local Lambda tunnel starting failed: \n ${msg}`));
            }
        });
    });
}

// Async/Await Style
void (async () => {
    try {
        const bs = await startBrowserStackTunnel();
        const pid = bs.pid;
        console.log("Started local BS tunnel with pid :", pid);
        writeFileSync(bsPid, String(pid));
        const lt = await startLambdaTestTunnel();
    } catch (error) {
        console.log(error);
    }
})();