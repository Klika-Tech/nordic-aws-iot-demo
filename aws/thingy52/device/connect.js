/**
 * Nordic Thingy 52 connector to AWS cloud
 * */

const commandLineArgs = require('command-line-args');
const nordic = require('./nordic');
const aws = require('./aws');

// Parse cli options
const optionDefinitions = [
    { name: 'mac', alias: 'm', type: String },
    { name: 'disableCloud', alias: 'd', type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

// Connect to Thingy:52
let flow = (options.mac) ?
    nordic.scanByMac(options.mac)
    : nordic.scan()
        .then(nordic.renderScanResults)
        .then(nordic.questionChooseThingy);

// Connect to Thingy:52
flow = flow
    .then(nordic.connect);

// Start Publishing to AWS
if (!options.disableCloud) {
    flow = flow
        .then(aws.iotInit)
        .then(aws.startPublishLoop(nordic.isConnected, nordic.getCurrentValues));
}

// AWS error handling
flow = flow.catch((e) => {
    console.error(e);
    process.exit(1);
});

// Start reading from stdin so we don't exit.
process.stdin.resume();