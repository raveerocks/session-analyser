const { Result } = require('./result');

exports.SeleniumResult = class SeleniumResult extends Result {
  constructor() {
    super();
    this.summary.polls = 0;
  }

  addPoll() {
    ++this.summary.polls;
  }
};
