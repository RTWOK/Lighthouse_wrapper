import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import configuration from './configuration.js';



export default async function runLighthouseAudit(url) {
    const chrome = await chromeLauncher.launch(configuration.chrome);
    const options = {
        ...configuration.lighthouse,
        port: chrome.port
    };

    const runnerResult = await lighthouse(url, options);
    await chrome.kill();

    return runnerResult.report;
}
