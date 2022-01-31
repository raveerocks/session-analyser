const { FileOperations } = require('./file_operations');

exports.Config = class Config {
  creatConfigFile = (file, restFile, seleniumFile) => {
    const config = {
      rest: restFile,
      selenium: seleniumFile,
    };
    const fileOperations = new FileOperations();
    fileOperations.write(file, config);
  };
};
