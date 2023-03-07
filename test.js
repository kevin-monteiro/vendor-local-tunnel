const webdriver = require('selenium-webdriver');

const { DOCKER, TARGET, TUNNEL } = process.env;

const config = {
    browserstack: {
        hub: 'https://hub-cloud.browserstack.com/wd/hub',
        capabilities: {
            'bstack:options' : {
                os : "Windows",
                osVersion : "11",
                local : true,
                localIdentifier: TUNNEL || '',
                userName : process.env.BROWSERSTACK_USER || '',
                accessKey : process.env.BROWSERSTACK_KEY || '',
                buildName: 'vendor-local-tunnel',
            },
            browserName : "Chrome",
            browserVersion : "latest",
        },
    },
    lambdatest: {
        hub: 'https://hub.lambdatest.com/wd/hub',
        capabilities: {
            'LT:Options' : {
                user : process.env.LAMBDATEST_USER || '',
                accessKey : process.env.LAMBDATEST_KEY || '',
                platformName : "Windows 11",
                tunnel: true,
                tunnelName: TUNNEL || '',
                build: 'vendor-local-tunnel',
            },
            browserName : "Chrome",
            browserVersion : "100.0",
        }
    }
};



(async () => {
    if(TARGET === 'browserstack' || TARGET === 'lambdatest') {
        console.log(config[TARGET].capabilities)
        const host = DOCKER ? 'http://test.com:8000' : 'http://localhost:8000';
        let driver = new webdriver
            .Builder()
            .usingServer(config[TARGET].hub)
            .withCapabilities(config[TARGET].capabilities)
            .build();
        await driver.get(host)
        await driver.sleep(5000)
        console.log(TARGET, '::: ', await driver.executeScript('return document.body.innerHTML;'))
        await driver.quit();
    } else {
        throw Error(`${TARGET} not supported`)
    }
})();