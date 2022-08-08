const { existsSync, readFileSync } = require("fs");
const childProcess = require('child_process')

const pidFile = "tunnel_local_pid";

const readPidFile = () => {
    if (existsSync(pidFile)) {
        return readFileSync(pidFile, "UTF-8");
    }
    return undefined;
};

const stop = () => {
    const pid = readPidFile();
    if (pid) {
        console.log("Stopping local tunnel with pid :", pid);
        //process.kill(pid);
        childProcess.exec('kill -9 ' + pid);
    }
};

stop();