import { http } from './http';
import { nav } from './nav';
import reload from './reload';

const globalLink = 'https://api.coingecko.com/api/v3/global';
let priceData = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=daily`;
let coinData = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc`;
const coins =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

// Add event listeners
// Document load data
document.addEventListener('DOMContentLoaded', documentLoadEvents);
// Change chart intervals
Array.from(document.getElementsByClassName('chartData')).map((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    getData(priceData, coinData, e.target.id);
  });
});
// Change coin
document.getElementById('coinList').addEventListener('click', function (e) {
  e.preventDefault();

  const coin = e.target.closest('li');
  if (!coin) return;

  priceData = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=max&interval=daily`;
  coinData = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&order=market_cap_desc`;

  // Change chart data
  getData(priceData, coinData, 'Price');
});

// Document load events
function documentLoadEvents() {
  // Get nav data
  nav.getMarketData(globalLink);
  // Get chart data
  getData(priceData, coinData, 'Price');
  // Get coins data
  getCoinData(coins);
}

// Get data
async function getData(link, link2, type) {
  const loader = document.getElementById('loader');
  loader.className = 'loader';
  const links = [link, link2];

  const getArr = [];

  for (const link of links) {
    await http
      .get(link)
      .then((data) => {
        getArr.push(data);
      })
      .catch((err) => {
        loader.className = '';
        reload('home-d');
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
    loader.className = '';
    reload('home-d');
  }

  loader.className = '';
}

// Create chart
async function createChart(data, coin, type) {
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

  let num;

  if (type === 'Price') {
    if (coin[0].name === 'Dogecoin') {
      num = 6;
    } else num = 2;
  } else {
    num = 0;
  }

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
      formatter: function (value) {
        return parseInt(value);
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
          return parseFloat(value).toFixed(num).toLocaleString();
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

  // Reset css classes
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

// Get coins data
function getCoinData(coins) {
  http
    .get(coins)
    .then((data) => createList(data))
    .catch((err) => console.log(err));
}

// Create coins list
function createList(coins) {
  const list = document.getElementById('coinList');

  let ul = document.createElement('ul');

  // Loop and create coins
  for (const coin of coins) {
    const li = document.createElement('li');
    li.id = coin.id;
    li.innerHTML = `<img src="${coin.image.replace('large', 'thumb')}" alt="${
      coin.name
    }"><span>${coin.name}</span><span>${coin.symbol}</span>`;

    // Append coin to ul
    ul.appendChild(li);
  }

  list.appendChild(ul);
}
