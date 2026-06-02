const configuration = {
    chrome: {
        port: 0,
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
    },
    workers: {
        amount: 1, //Implement forking for parallel workers
    }
};

export default configuration;
