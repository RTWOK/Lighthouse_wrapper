const configuration = {
    chrome: {
        port: 9222,
        chromeFlags: [
            '--headless'
        ]
    },
    lighthouse: {
        logLevel: 'info',
        output: 'json',
        onlyCategories: [
            'performance'
        ]
    }
};

export default configuration;
