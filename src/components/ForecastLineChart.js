import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const arraysHaveTheSameValues = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const sliceArraysInArray = (arrOfArr, length) => arrOfArr.map(arr => arr.slice(0, length));

export default class ForecastLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    this.chartOptions.animation = { enabled: false };

    this.chartOptions.layout = {
      padding: {
        left: 7,
        right: 7,
        top: 25,
        bottom: 6
      }
    };

    this.chartOptions.legend = { display: false };

    this.chartOptions.scales = {
      xAxes: [{ display: false }],
      yAxes: [{ display: false }]
    };

    this.chartOptions.plugins = {
      datalabels: {
        color: 'rgba(255, 255, 255, 1)',
        align: 'top',
        font: {
          family: "'Amiko', sans-serif",
          size: 12,
          weight: 'bold'
        },
        formatter: Math.round
      }
    };

    this.chartOptions.tooltips = { enabled: false };

    this.datasetOptions = {
      label: '',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2,
      lineTension: 0,
      fill: false,
      data: []
    };

    this.state = {
      chartData: {
        labels: [],
        datasets: [{ ...this.datasetOptions }]
      }
    };
  }

  addChartJSDatasetOptions = arrayOftemperatureArrays => {
    // If arrayOftemperatureArrays is not a 2D array, will wrap it in an array
    let arrOfArr = [];
    if (!Array.isArray(arrayOftemperatureArrays[0])) {
      arrOfArr.push(arrayOftemperatureArrays);
    } else {
      arrOfArr = [...arrayOftemperatureArrays];
    }

    const chartData = {
      labels: Array(arrOfArr[0].length).fill(0),
      datasets: []
    };

    arrOfArr.forEach((arr, index) => {
      chartData.datasets.push({
        ...this.datasetOptions,
        data: arr,
        label: index
      });
    });

    return chartData;
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.props.arrayOfChartdataArrays) {
      const currentChartData = this.state.chartData.datasets[0].data;
      const newChartData = sliceArraysInArray(
        this.props.arrayOfChartdataArrays,
        this.props.amountOfForecastColumns
      );

      if (!arraysHaveTheSameValues(currentChartData, newChartData[0])) {
        const newChartDataWithChartJSoptions = this.addChartJSDatasetOptions(newChartData);
        this.setState({
          chartData: newChartDataWithChartJSoptions
        });
      }
    }
  }

  render() {
    return (
      <div className="forecast-table__line-chart">
        <Line
          data={this.state.chartData}
          options={this.chartOptions}
          datasetKeyProvider={Math.random}
        />
      </div>
    );
  }
}
