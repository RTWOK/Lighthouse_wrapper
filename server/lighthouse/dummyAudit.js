import configuration from "./configuration.js";

export function runDummyAudit() {
    console.log("Single audit route was triggered.");
    console.log(configuration.clickPhrase);

    return {
        message: configuration.clickPhrase
    };
}
