import { http } from './http';
import { ls } from './ls';
import { nav } from './nav';
import { chart } from './chart-ui';

const globalLink = 'https://api.coingecko.com/api/v3/global';

// Add event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));

const myChart = document.getElementById('myChart');

const options = {
  series: [
    {
      name: 'STOCK ABC',
      data: [1, 2, 3, 4, 5],
    },
  ],
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },

  title: {
    text: 'Fundamental Analysis of Stocks',
    align: 'left',
  },
  subtitle: {
    text: 'Price Movements',
    align: 'left',
  },
  labels: ['17 Nov', '25 Nov'],
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    opposite: true,
  },
  legend: {
    horizontalAlign: 'left',
  },
};

const newChart = new ApexCharts(document.getElementById('myChart'), options);
newChart.render();
