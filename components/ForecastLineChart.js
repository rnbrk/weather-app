import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { arraysHaveTheSameValues } from '../functions/utils';

defaults.global.animation.duration = 0;

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
    const currentChartData = this.state.chartData.datasets[0].data;
    if (this.props.chartData.datasets) {
      const newChartData = this.props.chartData.datasets[0].data;
      if (!arraysHaveTheSameValues(currentChartData, newChartData)) {
        this.setState({
          chartData: this.props.chartData
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
                }
              }
            },
            tooltips: {
              enabled: false
            }
          }}
          datasetKeyProvider={this.datasetKeyProvider}
        />
      </div>
    );
  }
}
