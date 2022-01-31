const program = require('commander');
const { Config } = require('./util/config');
const { Scan } = require('./util/scan');
const { Comparator } = require('./analysers/comparator');

program.name('analyser').version('1.0.0');

program
  .command('config')
  .description('creates a sample config file')
  .argument('[file]', 'config file name', 'analyse.json')
  .argument('[rest]', 'rest log file path', '<>')
  .argument('[selenium]', 'selenium log file path', '<>')
  .action((file, rest, selenium) => {
    const config = new Config();
    config.creatConfigFile(file, rest, selenium);
  });

program
  .command('scan')
  .description('scans the log files and prints the results')
  .argument('<file>', 'config file name')
  .action((file) => {
    const scan = new Scan(file);
    scan.print();
  });

program
  .command('compare')
  .description('analyses the log files and prints the results')
  .argument('<file>', 'compare file name')
  .action((file) => {
    const compare = new Comparator(file);
    compare.compare();
  });

program.parse(process.argv);
