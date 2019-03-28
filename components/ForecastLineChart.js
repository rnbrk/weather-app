import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const arraysHaveTheSameValues = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const sliceArraysInArray = (arrOfArr, length) => arrOfArr.map(arr => arr.slice(0, length));

const addChartJSDatasetOptions = arrayOftemperatureArrays => {
  // Turns an array of temperatures or an array of arrays of temperatures
  // into an object which ChartJS can understand

  // Make sure parameter is an array of arrays
  let arrOfArr = [];
  if (!Array.isArray(arrayOftemperatureArrays[0])) {
    arrOfArr.push(arrayOftemperatureArrays);
  } else {
    arrOfArr = [...arrayOftemperatureArrays];
  }

  const datasetOptions = {
    label: '',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    pointBackgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    lineTension: 0,
    fill: false,
    data: []
  };

  const chartData = {
    labels: Array(arrOfArr[0].length).fill(0),
    datasets: []
  };

  arrOfArr.forEach((arr, index) => {
    chartData.datasets.push({
      ...datasetOptions,
      data: arr,
      label: index
    });
  });

  return chartData;
};

export default class ForecastLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'x',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            lineTension: 0,
            fill: false,
            data: []
          }
        ]
      }
    };
  }

  componentDidUpdate() {
    if (this.props.arrayOfChartdataArrays) {
      const currentChartData = this.state.chartData.datasets[0].data;
      const newChartData = sliceArraysInArray(
        this.props.arrayOfChartdataArrays,
        this.props.amountOfForecastColumns
      );

      console.log('newChartData', newChartData);

      if (!arraysHaveTheSameValues(currentChartData, newChartData[0])) {
        const newChartDataWithChartJSoptions = addChartJSDatasetOptions(newChartData);
        this.setState({
          chartData: newChartDataWithChartJSoptions
        });
      }
    }
  }

  datasetKeyProvider = () => Math.random();

  render() {
    return (
      <div className="forecast-table__line-chart">
        <Line
          data={this.state.chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: false
                }
              ],
              yAxes: [
                {
                  display: false
                }
              ]
            },
            layout: {
              padding: {
                left: 7,
                right: 7,
                top: 25,
                bottom: 6
              }
            },
            plugins: {
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
            },
            tooltips: {
              enabled: false
            },
            animation: {
              duration: 0
            }
          }}
          datasetKeyProvider={this.datasetKeyProvider}
        />
      </div>
    );
  }
}
