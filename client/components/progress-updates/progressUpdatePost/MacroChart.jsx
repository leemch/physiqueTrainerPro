// @flow
import React from 'react';
import Chart from 'react-apexcharts';

const MacroChart = () => {
    const apexDonutOpts = {
        chart: {
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          categories: ['Fav Color'],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 1,
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: "vertical",
            shadeIntensity: 0.35,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [90, 0, 100]
          },
        },

        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        }
      };

    const seriesBar = [{
        name: 'fat',
        data: [32]
      }, {
        name: 'carbs',
        data: [12]
      }, {
        name: 'protein',
        data: [65]
      }];

    return (       
        <div class="card">
        <div class="card-body">
                <h5 class="card-title">Card title</h5>
                    <div className="row">
                        <div className="col percentage-chart">
                            <Chart options={apexDonutOpts} height={140} series={seriesBar} type="bar" />
                        </div>
                </div>
        </div>
      </div>
                    
                

    );
};

export default MacroChart;
