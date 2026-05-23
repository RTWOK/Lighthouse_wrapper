const configuration = {
    chrome: {
        port: 9222,
        chromeFlags: [
            '--headless'
        ]
    },
    lighthouse: {
        logLevel: 'info',
        output: 'html',
        onlyCategories: [
            'performance'
        ]
    }
};

export default configuration;
