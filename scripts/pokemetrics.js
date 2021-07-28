/* eslint-disable @typescript-eslint/no-var-requires, import/no-unresolved, no-console */
const { default: fetchPokemetrics } = require('../dist/fetchPokemetrics.js');

//
// HELPERS
//

const validators = {
  integer({ key, value }) {
    if (/[^0-9]/.test(value)) {
      console.error(`ERROR: the value of ${key} must be an integer`);
      process.exit();
    }

    return Number.parseInt(value, 10);
  },
};

function getCliArg({ key, type }) {
  const index = process.argv.findIndex((a) => a === key) + 1;
  if (index === 0) {
    console.error(`ERROR: Missing required command line option: ${key} <${type}>`);
    process.exit();
  } else if (index === process.argv.length) {
    console.error(`ERROR: Missing value for required command line option: ${key} <${type}>`);
    process.exit();
  }
  return validators[type]({ key, value: process.argv[index] });
}

function logPokemetrics({ weight, height, indent = 0 }) {
  const whitespace = '  '.repeat(indent);
  console.log(`${whitespace}Avg. Weight: ${weight.toFixed(2)}`);
  console.log(`${whitespace}Avg. Height: ${height.toFixed(2)}`);
  console.log();
}

//
// MAIN
//

// PROFILING - INIT
const start = new Date();

// INPUTS
const offset = getCliArg({ key: '--offset', type: 'integer' });
const limit = getCliArg({ key: '--limit', type: 'integer' });

// FETCH
fetchPokemetrics({ offset, limit })
  .then(({ weight, height, types }) => {
    // OUTPUT
    logPokemetrics({ weight, height });
    Object.entries(types).forEach(([type, pokemetrics]) => {
      console.log(`Type "${type}":`);
      logPokemetrics({ ...pokemetrics, indent: 1 });
    });

    // PROFILING - LOG
    const end = new Date();
    console.log(`Self time: ${(end - start) / 1000}s`);
  });
