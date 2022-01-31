const { AppiumAnalyser } = require('../analysers/appium_analyser');
const { RESTAnalyser } = require('../analysers/rest_analyser');
const { SeleniumAnalyser } = require('../analysers/selenium_analyser');
const { FileOperations } = require('./file_operations');
const { Plot } = require('./plot');

exports.Scan = class Scan {
  constructor(file) {
    this.file = file;
    this.encoding = 'utf-8';
    this.keyREST = 'rest';
    this.keySelenium = 'selenium';
    this.keyAppium = 'appium';
    this.defaultUndefined = '<>';
  }

  plot = (analyser, title) => {
    analyser.calculateResults((result) => {
      const plot = new Plot();
      plot.chart(`${title}[Summary]`, result.summary);
      plot.chart(`${title}[Details]`, result.details);
    });
  };

  print = () => {
    const fileOperations = new FileOperations();
    fileOperations.read(this.file, this.encoding, (content) => {
      const configs = JSON.parse(content);
      const restLogFile = configs[this.keyREST];
      const seleniumLogFile = configs[this.keySelenium];
      const appiumLogFile = configs[this.keyAppium];

      if (fileOperations.fileCheck(restLogFile)) {
        const analyser = new RESTAnalyser(restLogFile);
        this.plot(analyser, 'REST API Analysis');
      }
      if (fileOperations.fileCheck(seleniumLogFile)) {
        const analyser = new SeleniumAnalyser(seleniumLogFile);
        this.plot(analyser, 'Selenium Analysis');
      }

      if (fileOperations.fileCheck(appiumLogFile)) {
        const analyser = new AppiumAnalyser(appiumLogFile);
        this.plot(analyser, 'Appium Analysis');
      }
    });
  };
};
