import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

defaults.global.animation.duration = 500;

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
            pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            lineTension: 0,
            fill: false,
            data: []
          }
        ]
      }
    };
  }

  componentDidUpdate() {
    if (this.state.chartData.datasets[0].data[0] !== this.props.chartData.datasets[0].data[0]) {
      this.setState({
        chartData: this.props.chartData
      });
    }
  }

  datasetKeyProvider = () => Math.random();

  render() {
    return (
      <div className="forecast-table__line-chart">
        <Line
          data={this.state.chartData}
          options={{
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  gridLines: {
                    display: true
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  gridLines: {
                    display: false
                  }
                }
              ]
            },
            layout: {
              padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 0
              }
            },
            plugins: {
              datalabels: {
                color: 'rgba(255, 255, 255, 1)',
                align: 'top',
                font: {
                  family: 'Arial',
                  size: 10,
                  weight: 'bold'
                }
              }
            }
          }}
          datasetKeyProvider={this.datasetKeyProvider}
        />
      </div>
    );
  }
}
