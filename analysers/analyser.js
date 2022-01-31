const { FileOperations } = require('../util/file_operations');
const moment = require('moment');

exports.Analyser = class Analyser {
  constructor(file, prefix) {
    this.file = file;
    this.encoding = 'utf8';
    this.prefix = prefix;
    this.started = false;
    this.commands = {};
  }

  getMoment = (logLine, requestType) => {
    const timeStamp = this.prefix + logLine.split(requestType)[0];
    return moment(Date.parse(timeStamp));
  };

  calculateResults = (callback) => {
    const fileOperations = new FileOperations();
    fileOperations.read(this.file, this.encoding, (content) => {
      this.parse(content, callback);
    });
  };

  getRequestType = (request) => {
    var requstType = 'UNKNOWN';

    if (request.includes('GET')) {
      requstType = 'GET';
    } else if (request.includes('HEAD')) {
      requstType = 'HEAD';
    } else if (request.includes('POST')) {
      requstType = 'POST';
    } else if (request.includes('PUT')) {
      requstType = 'PUT';
    } else if (request.includes('DELETE')) {
      requstType = 'DELETE';
    } else if (request.includes('CONNECT')) {
      requstType = 'DELETE';
    } else if (request.includes('OPTIONS')) {
      requstType = 'OPTIONS';
    } else if (request.includes('TRACE')) {
      requstType = 'TRACE';
    } else if (request.includes('PATCH')) {
      requstType = 'PATCH';
    } else {
      requstType = 'UNKNOWN';
    }
    return requstType;
  };

  getRequestParam = (request) => {
    var requestParam = 'other';
    if (request.includes('/timeouts')) {
      requestParam = 'timeouts';
    } else if (request.includes('/url')) {
      requestParam = 'url';
    } else if (request.includes('/back')) {
      requestParam = 'url';
    } else if (request.includes('/forward')) {
      requestParam = 'url';
    } else if (request.includes('/refresh')) {
      requestParam = 'url';
    } else if (request.includes('/title')) {
      requestParam = 'title';
    } else if (request.includes('/window')) {
      requestParam = 'window';
    } else if (request.includes('/frame')) {
      requestParam = 'frame';
    } else if (request.includes('/element')) {
      requestParam = 'element';
    } else if (request.includes('/shadow')) {
      requestParam = 'timeouts';
    } else if (request.includes('/source')) {
      requestParam = 'source';
    } else if (request.includes('/sync')) {
      requestParam = 'sync';
    } else if (request.includes('/async')) {
      requestParam = 'async';
    } else if (request.includes('/cookie')) {
      requestParam = 'cookie';
    } else if (request.includes('/actions')) {
      requestParam = 'actions';
    } else if (request.includes('/alert')) {
      requestParam = 'alert';
    } else if (request.includes('/screenshot')) {
      requestParam = 'screenshot';
    } else if (request.includes('/print')) {
      requestParam = 'print';
    } else if (request.includes('browserstack_executor')) {
      requestParam = 'bstack';
    }
    return requestParam;
  };

  isCommand(line, command) {
    return line.includes(this.commands[command]);
  }

  getTimestamp(line, seperator) {
    return this.getMoment(line, this.commands[seperator]);
  }

  parseResult(result, content, lineCallBack, callback) {
    const logLines = content.split('\n');

    var startSessionRequest;

    var currentRequest;
    var currentResponse;
    var totalInTime = 0;
    var totalOutTime = 0;
    var requstType = 'Unknown';
    var requestParam = 'Other';

    logLines.forEach((line, index) => {
      if (!line.trim()) {
        return;
      }
      lineCallBack(line);

      if (index == 0) {
        startSessionRequest = this.getTimestamp(line, 'FIRST_SEPERATOR');
      } else if (!this.started && this.isCommand(line, 'START_MESSAGE')) {
        var startRequestResponse = this.getTimestamp(line, 'START_SEPERATOR');
        result.setInitTime(startRequestResponse.diff(startSessionRequest));
        this.started = true;
        currentResponse = startRequestResponse;
      } else if (this.started) {
        if (this.isCommand(line, 'REQUEST_MESSAGE')) {
          currentRequest = this.getTimestamp(line, 'REQUEST_SEPERATOR');
          const outTime = currentRequest.diff(currentResponse);
          totalOutTime += outTime;
        }
        if (this.isCommand(line, 'REQUEST_TYPE_MESSAGE')) {
          requstType = this.getRequestType(line);
          requestParam = this.getRequestParam(line);
        }
        if (this.isCommand(line, 'STATUS_MESSAGE')) {
          if (this.isCommand(line, 'STATUS_SUCCESS')) {
            result.addPassedRequest();
          } else {
            result.addFailedRequest();
          }
        }
        if (this.isCommand(line, 'RESPONSE_MESSAGE')) {
          currentResponse = this.getTimestamp(line, 'RESPONSE_SEPERATOR');
          const inTime = currentResponse.diff(currentRequest);
          result.addDetails('all', requstType, inTime);
          result.addDetails(requestParam, requstType, inTime);
          totalInTime += inTime;

          // console.log('[', inTime, ']', line);
        }
        result.setTotalProcessingTime(totalInTime);
        result.setInterRequestDelay(totalOutTime);
        result.build();
      }
    });
    callback(result);
  }
};
