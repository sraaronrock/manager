const { parentPort, workerData } = require('worker_threads');
const execa = require('execa');
const yn = require('yn');

execa
  // .command(`cd ${workerData.location} && pwd`, {
  .command(`lerna run --scope ${workerData.name} build`, {
    shell: true,
    stdio: yn(process.env.VERBOSE) ? 'inherit' : 'ignore',
  })
  .then(() => parentPort.postMessage(workerData.location))
  .catch((err) => {
    parentPort.postMessage(`error - ${err.message}
${err.all}`);
    process.exit(err.exitCode);
  });
