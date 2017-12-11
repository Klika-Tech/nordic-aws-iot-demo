/**
 * Nordic Thingy 52 connector to AWS cloud
 * */

const nordic = require('./nordic');
const aws = require('./aws');

nordic.scan()
    .then(nordic.renderScanResults)
    .then(nordic.questionChooseThingy)
    .then(nordic.connect)
    .then(aws.iotInit)
    .then(aws.startPublishLoop(nordic.getCurrentValues))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });