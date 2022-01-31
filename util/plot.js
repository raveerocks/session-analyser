exports.Plot = class Plot {
  chart = (title, data) => {
    console.log('\n', title);
    console.table(data);
    console.log('\n');
  };

  orderedChart = (title, data, sortBy, desc) => {
    data.sort((a, b) => {
      if (desc != 'true') {
        return a[sortBy] - b[sortBy];
      }
      return b[sortBy] - a[sortBy];
    });
    this.chart(title, data);
  };
};
