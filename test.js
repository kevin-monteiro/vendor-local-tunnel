const webdriver = require('selenium-webdriver');

const { TARGET } = process.env;

const config = {
    browserstack: {
        hub: 'https://hub-cloud.browserstack.com/wd/hub',
        capabilities: {
            'bstack:options' : {
                os : "Windows",
                osVersion : "11",
                local : "true",
                userName : process.env.BROWSERSTACK_USER || '',
                accessKey : process.env.BROWSERSTACK_KEY || '',
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
            },
            browserName : "Chrome",
            browserVersion : "100.0",
        }
    }
};



(async () => {
    if(TARGET === 'browserstack' || TARGET === 'lambdatest') {
        let driver = new webdriver
            .Builder()
            .usingServer(config[TARGET].hub)
            .withCapabilities(config[TARGET].capabilities)
            .build();
        await driver.get("https://google.com")
        await driver.sleep(5000)
        await driver.quit();
    } else {
        throw Error(`${TARGET} not supported`)
    }
})();