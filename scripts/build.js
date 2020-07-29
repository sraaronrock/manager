#!/usr/bin/env node
const program = require('commander');
const execa = require('execa');
const flatten = require('lodash/flatten');
const unionBy = require('lodash/unionBy');
const path = require('path');
const ProgressBar = require('progress');
const { Worker, SHARE_ENV } = require('worker_threads');

/**
 * Get packages that has been recently changed.
 * @return {Promise<string[]>} List of changed packages.
 */
async function getChanges() {
  // Tiny utility function to pick only a package name.
  const output = (list, key = 'name') =>
    JSON.parse(list).map((pkg) => pkg[key]);

  // Not used for an optimized build (use `lerna changed` instead).
  let listCommand = 'lerna list --all --json';

  // Build a single application.
  if (program.package) {
    console.log('Build a single package application.');

    const allowedWorkspace = 'packages/manager/apps';

    // Only packages located in a specific workspace can be builded.
    const { stdout: location } = await execa.command(
      `lerna exec --scope ${program.package} -- pwd`,
      {
        shell: true,
      },
    );

    // Wrong package location.
    if (!location.includes(allowedWorkspace)) {
      console.error(
        `The package '${program.package}' can't be found in the given '${allowedWorkspace}' workspace.`,
      );
      process.exit(1);
    }

    listCommand += ` --scope=${program.package} --include-dependencies`;
    const { stdout } = await execa.command(listCommand, { shell: true });

    return output(stdout);
  }

  // Build all applications.
  if (program.all) {
    console.log('Build all applications.');

    const { stdout } = await execa.command(listCommand, { shell: true });

    return output(stdout);
  }

  // Build only applications that has recently changed (compared to latest tag).
  console.log('Build only changed packages.');

  const { stdout } = await execa.command(
    'lerna changed --all --include-merged-tags --json --toposort',
    {
      shell: true,
    },
  );

  return output(stdout);
}

/**
 * Generate a graph of dependencies in topological order.
 * @param  {Array<string>} packages  List of packages that has recently changed.
 * @return {Promise<Array>}          Packages' list sorted in topological order.
 */
async function getDependenciesGraph(packages) {
  const dependenciesGraph = packages.map((packageName) => {
    return execa
      .command(
        `lerna list --all --include-dependencies --json --long --toposort --scope=${packageName}`,
        { shell: true },
      )
      .then(({ stdout }) => JSON.parse(stdout));
  });

  const graph = await Promise.all(dependenciesGraph).then((dependencyGraph) =>
    unionBy(flatten(dependencyGraph), 'name'),
  );

  return graph;
}

/**
 * Perform an intensive build task by using Worker Threads.
 * @param  {Array} packages   Requires to be build in topological order.
 * @return {Promise}
 */
async function launchBuild(packages) {
  console.log(`${packages.length} package(s) require a build process.`);

  // Display a progress bar when not in verbose mode.
  let bar;
  if (!program.verbose) {
    bar = new ProgressBar('  buidling [:bar] :percent', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: packages.length,
    });
  }

  return Promise.all(
    packages.map((pkg) => {
      const promise = new Promise((resolve, reject) => {
        const worker = new Worker(
          path.join(__dirname, '/worker/build_module.js'),
          {
            workerData: pkg,
            env: SHARE_ENV,
          },
        );
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
          if (!program.verbose) {
            bar.tick();
          }
        });
      });

      return promise;
    }),
  )
    .then(() => {
      console.log('');
      console.log('Build operation has been done successfully!');
      console.log('');
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

program
  .version('0.0.1')
  .option('-a, --all', 'Build all applications')
  .option(
    '-p, --package <package>',
    'Scope build to a specific package and its dependencies',
  )
  .option('--verbose', 'output extra debugging')
  .action(async () => {
    process.env.VERBOSE = program.verbose;

    const changes = await getChanges();
    const dependenciesGraph = await getDependenciesGraph(changes);
    await launchBuild(dependenciesGraph);
  });

program.parse(process.argv);
