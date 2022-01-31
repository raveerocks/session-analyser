const { SeleniumResult } = require('../results/selenium_result');
const { Analyser } = require('./analyser');

exports.SeleniumAnalyser = class SeleniumAnalyser extends Analyser {
  constructor(file) {
    super(file, '2022-1-6 ');
    this.commands['FIRST_SEPERATOR'] = 'DEBUG';
    this.commands['POLLING_MESSAGE'] = 'Polling';
    this.commands['START_MESSAGE'] = 'Started new session';
    this.commands['START_SEPERATOR'] = 'INFO';
    this.commands['REQUEST_MESSAGE'] = 'Found handler';
    this.commands['REQUEST_SEPERATOR'] = 'DEBUG';
    this.commands['REQUEST_TYPE_MESSAGE'] = 'WebDriverServlet.lambda';
    this.commands['STATUS_MESSAGE'] = 'HttpURLConnection.getInputStream';
    this.commands['STATUS_SUCCESS'] = 'HTTP/1.1 200 OK';
    this.commands['RESPONSE_MESSAGE'] = 'To downstream';
    this.commands['RESPONSE_SEPERATOR'] = 'DEBUG';
  }

  parse(content, callback) {
    const result = new SeleniumResult();
    this.parseResult(
      result,
      content,
      (line) => {
        if (!this.started && line.includes(this.commands['POLLING_MESSAGE'])) {
          result.addPoll();
        }
      },
      callback
    );
  }
};
