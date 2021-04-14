import { http } from './http';
import { nav } from './nav';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const priceData =
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily';
const coinData =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc';

// Add event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
document.addEventListener(
  'DOMContentLoaded',
  getData(priceData, coinData, 'Price')
);
Array.from(document.getElementsByClassName('chartData')).map((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    getData(priceData, coinData, e.target.id);
  });
});

// Get data
async function getData(link, link2, type) {
  document.getElementById('loader').className = 'loader';
  const links = [link, link2];

  const getArr = [];

  for (const link of links) {
    await http
      .get(link)
      .then((data) => {
        getArr.push(data);
      })
      .catch((err) => {
        console.log(err);
        getData(link, link2);
      });
  }

  let dataType;
  // Check for data type
  if (type === 'Price') dataType = getArr[0].prices;
  if (type === 'Market_cap') dataType = getArr[0].market_caps;
  if (type === 'Volume') dataType = getArr[0].total_volumes;

  await createChart(dataType, getArr[1], type);

  // Check if properly loaded
  const myChart = document.getElementById('myChart').innerHTML;
  if (myChart === '' || myChart === undefined || myChart === null) {
    location.reload();
  }

  document.getElementById('loader').className = '';
}

// Create chart
async function createChart(data, coin, type) {
  document.getElementById('chart').style.visibility = 'visible';
  document.getElementById('footer').style.visibility = 'visible';

  const myChart = document.getElementById('myChart');
  const coinInfo = document.getElementById('coin');
  type = type.replace('_', ' ');

  myChart.innerHTML = '';
  // Create coin info
  coinInfo.innerHTML = `
  <img src="${coin[0].image.replace('large', 'thumb')}" alt="bitcoin">
  <span>${coin[0].name}</span>
  <span>${coin[0].symbol}</span>
  `;

  // Start and end date
  let startDate = parseInt(data[0].slice(0, data[0].indexOf(',')));
  let endDate = parseInt(data[data.length - 1].slice(0, data[0].indexOf(',')));

  data.forEach((price) => price);

  // Chart options
  const options = {
    series: [
      {
        name: type,
        data: data,
      },
    ],
    chart: {
      id: 'cryptoPrices',
      type: 'area',
      height: 400,
      fontFamily: 'Montserrat, sans-serif',
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return parseInt(val);
      },
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      min: startDate,
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return parseInt(value).toLocaleString();
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  // Create and render chart
  const newChart = new ApexCharts(myChart, options);
  newChart.render();

  const resetCssClasses = function (activeEl) {
    const els = document.getElementById('toolBar').getElementsByTagName('a');

    Array.prototype.forEach.call(els, function (el) {
      el.classList.remove('active');
    });

    activeEl.target.classList.add('active');
  };

  // Get data for specific intervals
  document.querySelector('#oneDay').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(
      new Date().setDate(new Date().getDate() - 1),
      new Date().getTime()
    );
  });

  document.querySelector('#oneWeek').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(
      new Date().setDate(new Date().getDate() - 7),
      new Date().getTime()
    );
  });

  document.querySelector('#oneMonth').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(
      new Date().setDate(new Date().getDate() - 30),
      new Date().getTime()
    );
  });

  document.querySelector('#sixMonths').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(
      new Date().setDate(new Date().getDate() - 182),
      new Date().getTime()
    );
  });

  document.querySelector('#oneYear').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(
      new Date().setDate(new Date().getDate() - 365),
      new Date().getTime()
    );
  });

  document
    .querySelector('#currentYear')
    .addEventListener('click', function (e) {
      resetCssClasses(e);

      newChart.zoomX(
        new Date().setDate(new Date().getDate() - 365),
        new Date().getTime()
      );
    });

  document.querySelector('#all').addEventListener('click', function (e) {
    resetCssClasses(e);

    newChart.zoomX(startDate, endDate);
  });
}
