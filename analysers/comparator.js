const { RESTAnalyser } = require('./rest_analyser');
const { SeleniumAnalyser } = require('./selenium_analyser');
const { AppiumAnalyser } = require('./appium_analyser');
const { Plot } = require('../util/plot');
const { FileOperations } = require('../util/file_operations');

exports.Comparator = class Comparator {
  constructor(file) {
    this.file = file;
  }
  compare = () => {
    const fileOperations = new FileOperations();
    fileOperations.read(this.file, 'utf8', (content) => {
      const comparables = JSON.parse(content);
      const sessions = comparables['sessions'];
      const options = comparables['options'];
      const restSort = options['rest']['sort'];
      const seleniumSort = options['selenium']['sort'];
      const appiumSort = options['appium']['sort'];
      const restDesc = options['rest']['desc'];
      const seleniumDesc = options['selenium']['desc'];
      const appiumDesc = options['appium']['desc'];

      var rests = [];
      var seleniums = [];
      var appiums = [];

      sessions.forEach((session, index) => {
        const restLogFile = session['rest'];
        const seleniumLogFile = session['selenium'];
        const appiumLogFile = session['appium'];

        if (restLogFile != undefined && restLogFile != '<>') {
          var rest = new RESTAnalyser(restLogFile);
          rest.calculateResults((result) => {
            rests = [...rests, { session: index + 1, ...result.summary }];
            if (rests.length == sessions.length) {
              this.plotChart('REST Comparion Chart', rests, restSort, restDesc);
            }
          });
        } else {
          rests = [...rests, { session: index + 1 }];
          if (rests.length == sessions.length) {
            this.plotChart('REST Comparion Chart', rests, restSort, restDesc);
          }
        }

        if (seleniumLogFile != undefined && seleniumLogFile != '<>') {
          const selenium = new SeleniumAnalyser(seleniumLogFile);
          selenium.calculateResults((result) => {
            seleniums = [
              ...seleniums,
              { session: index + 1, ...result.summary },
            ];
            if (seleniums.length == sessions.length) {
              this.plotChart(
                'Seleium Comparion Chart',
                seleniums,
                seleniumSort,
                seleniumDesc
              );
            }
          });
        } else {
          seleniums = [...seleniums, { session: index + 1 }];
          if (seleniums.length == sessions.length) {
            this.plotChart(
              'Seleium Comparion Chart',
              seleniums,
              seleniumSort,
              seleniumDesc
            );
          }
        }

        if (appiumLogFile != undefined && appiumLogFile != '<>') {
          const appium = new AppiumAnalyser(appiumLogFile);
          appium.calculateResults((result) => {
            appiums = [...appiums, { session: index + 1, ...result.summary }];
            if (appiums.length == sessions.length) {
              this.plotChart(
                'Appium Comparion Chart',
                appiums,
                appiumSort,
                appiumDesc
              );
            }
          });
        } else {
          appiums = [...appiums, { session: index + 1 }];
          if (appiums.length == sessions.length) {
            this.plotChart(
              'Appium Comparion Chart',
              appiums,
              appiumSort,
              appiumDesc
            );
          }
        }
      });
    });
  };

  plotChart = (title, data, sortBy, desc) => {
    const plot = new Plot();
    plot.orderedChart(title, data, sortBy, desc);
  };
};
