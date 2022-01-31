const { Result } = require('./result');

exports.RESTResult = class RESTResult extends Result {
  constructor() {
    super();
    this.summary.stopType = 'Unkown';
  }

  setStopType(stopType) {
    this.summary.stopType = stopType;
  }
};
