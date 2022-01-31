exports.Result = class Result {
  constructor() {
    this.summary = {};
    this.summary.initTime = 0;
    this.summary.requestCount = 0;
    this.summary.failedRequestCount = 0;
    this.summary.timeTaken = 0;
    this.summary.totalProcessingTime = 0;
    this.summary.interRequestDelay = 0;
    this.summary.inTimePerc = 0;
    this.summary.outTimePerc = 0;
    this.details = { all: {} };
  }

  setInitTime(initTime) {
    this.summary.initTime = initTime;
  }

  addPassedRequest() {
    ++this.summary.requestCount;
  }

  addFailedRequest() {
    ++this.summary.requestCount;
    ++this.summary.failedRequestCount;
  }

  setTotalProcessingTime(totalProcessingTime) {
    this.summary.totalProcessingTime = totalProcessingTime;
  }

  setInterRequestDelay(interRequestDelay) {
    this.summary.interRequestDelay = interRequestDelay;
  }

  addDetails(requestParam, requstType, time) {
    if (typeof this.details[requestParam] == 'undefined') {
      this.details[requestParam] = [];
    }
    if (typeof this.details[requestParam][requstType] == 'undefined') {
      this.details[requestParam][requstType] = { count: 0, time: 0 };
    }
    const current = this.details[requestParam][requstType];
    this.details[requestParam][requstType] = {
      count: current['count'] + 1,
      time: current['time'] + time,
    };
  }

  build() {
    this.summary.timeTaken =
      this.summary.totalProcessingTime + this.summary.interRequestDelay;
    this.summary.inTimePerc =
      (this.summary.totalProcessingTime / this.summary.timeTaken) * 100;
    this.summary.outTimePerc =
      (this.summary.interRequestDelay / this.summary.timeTaken) * 100;
  }
};
