const { existsSync, readFileSync } = require("fs");

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
        process.kill(pid);
    }
};

stop();