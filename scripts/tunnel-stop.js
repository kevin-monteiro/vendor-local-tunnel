const childProcess = require('child_process')

const stop = () => {
    ["BrowserStackLocal", "LT"].forEach(process => {
        try {
            childProcess.exec(`pkill -f ${process}`);
        } catch (e) {
            console.log("Error while killing the tunnel PID  :\n" + e);
        }
    })
};

(() => {
    stop();
})();
