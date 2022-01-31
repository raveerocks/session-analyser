const fs = require('fs');

exports.FileOperations = class FileOperations {
  constructor() {
    this.defaultUndefined = '<>';
  }

  read = (file, encoding, callback) => {
    fs.readFile(file, encoding, (err, content) => {
      if (err) {
        console.error(err);
        return;
      }
      callback(content);
    });
  };

  write = (file, content) => {
    fs.writeFile(file, JSON.stringify(content), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  };

  fileCheck = (file) => {
    return typeof file != 'undefined' && file != this.defaultUndefined;
  };
};
