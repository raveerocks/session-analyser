const { RESTResult } = require('../results/rest_result');
const { Analyser } = require('./analyser');

exports.RESTAnalyser = class RESTAnalyser extends Analyser {
  constructor(file) {
    super(file, '');
    this.commands['FIRST_SEPERATOR'] = 'REQUEST';
    this.commands['START_MESSAGE'] = 'START_SESSION';
    this.commands['START_SEPERATOR'] = 'START_SESSION';
    this.commands['REQUEST_MESSAGE'] = 'REQUEST';
    this.commands['REQUEST_SEPERATOR'] = 'REQUEST';
    this.commands['REQUEST_TYPE_MESSAGE'] = 'REQUEST';
    this.commands['STATUS_MESSAGE'] = 'RESPONSE';
    this.commands['STATUS_SUCCESS'] = '"status":0';
    this.commands['RESPONSE_MESSAGE'] = 'RESPONSE';
    this.commands['RESPONSE_SEPERATOR'] = 'RESPONSE';
  }

  parse = (content, callback) => {
    const result = new RESTResult();
    this.parseResult(
      result,
      content,
      (line) => {
        if (line.includes('STOP_SESSION')) {
          if (line.includes('CLIENT_STOPPED_SESSION')) {
            result.setStopType('Graceful');
          } else {
            result.setStopType('Not Graceful');
          }
        }
      },
      callback
    );
  };
};
