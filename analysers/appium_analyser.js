const { AppiumResult } = require('../results/appium_result');
const { Analyser } = require('./analyser');

exports.AppiumAnalyser = class AppiumAnalyser extends Analyser {
  constructor(file) {
    super(file, '');
    this.commands['FIRST_SEPERATOR'] = '- [';
    this.commands['START_MESSAGE'] = '<-- POST /wd/hub/session ';
    this.commands['START_SEPERATOR'] = '- [';
    this.commands['REQUEST_MESSAGE'] = '[HTTP] -->';
    this.commands['REQUEST_SEPERATOR'] = '- [';
    this.commands['REQUEST_TYPE_MESSAGE'] = '[HTTP] -->';
    this.commands['STATUS_MESSAGE'] = 'Got response with status';
    this.commands['STATUS_SUCCESS'] = 'Got response with status 200';
    this.commands['RESPONSE_MESSAGE'] = '[HTTP] <--';
    this.commands['RESPONSE_SEPERATOR'] = '- [';
  }

  parse(content, callback) {
    const result = new AppiumResult();
    this.parseResult(result, content, (line) => {}, callback);
  }
};
