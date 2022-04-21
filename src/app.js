import { http } from './http';
import { ui } from './ui';
import { ls } from './ls';
import { nav } from './nav';
import { pages } from './list-pages';
import { filter } from './filterList';
import reload from './reload';
import addCoin from './coinDetails';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const coinsLink =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=true&price_change_percentage=7d';
const icon = document.querySelector('#favorites').childNodes[2];

// Event listeners
document.addEventListener('DOMContentLoaded', initialLoad());
document.querySelector('#rank').addEventListener('click', sortByRank);
document.querySelector('#coin').addEventListener('click', sortByName);
document.querySelector('#price').addEventListener('click', sortByPrice);
document.querySelector('#mcap').addEventListener('click', sortByMarketCap);
document.querySelector('#daily').addEventListener('click', sortByDaily);
document.querySelector('#weekly').addEventListener('click', sortByWeekly);
document.querySelector('#volume').addEventListener('click', sortByVolume);
document.querySelector('#supply').addEventListener('click', sortBySupply);
document.querySelector('#mt-body').addEventListener('click', addToFavorites);
document.querySelector('#favorites').addEventListener('click', showFavorites);
document.querySelector('#home').addEventListener('click', returnHome);
document.querySelector('#total').addEventListener('click', () => {
  icon.classList.remove('active');
});
document.querySelector('#markets').addEventListener('click', () => {
  icon.classList.remove('active');
});
document.querySelector('#list-pages').addEventListener('click', listPages);
document.querySelector('#search').addEventListener('keyup', (e) => {
  filter.filterList(e.target, 1);
});
document.querySelector('#searchIcon').addEventListener('click', getCoin);
document.querySelector('#searchForm').addEventListener('submit', getCoin);

// Content loaded listener
function initialLoad() {
  // Get nav data
  nav.getMarketData(globalLink);
  // Get table data
  getCoinData(coinsLink);
}

// Create table
async function getCoinData(link) {
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  await http
    .get(link)
    .then((data) => {
      // Create table data
      ui.tableData(data);
      // Create chart
      createChart(data);
    })
    .catch(() => {
      loader.className = '';
      reload('home');
    });

  const tBody = document.getElementById('mt-body');
  // Check if properly loaded
  if (tBody === '' || tBody === undefined || tBody === null) {
    loader.className = '';
    reload('home');
  }

  document.getElementById('loader').className = '';
}

// Create chart
function createChart(coins) {
  // Get table cells
  const td = Array.from(document.getElementsByClassName('tableChart'));
  // Loop cells and create chart for each one
  td.forEach((cell, index) => {
    const canvas = cell.getContext('2d');
    const newData = [];
    const prices = coins[index].sparkline_in_7d.price;
    let backgroundColor;
    let borderColor;

    // Set background color
    prices[0].toFixed(4) > prices[prices.length - 1].toFixed(4)
      ? (backgroundColor = 'rgba(255,0,0,0.5)')
      : prices[0].toFixed(4) < prices[prices.length - 1].toFixed(4)
      ? (backgroundColor = 'rgba(0,255,0,0.3)')
      : (backgroundColor = 'rgba(128,128,128,0.5)');

    // Set border color
    prices[0].toFixed(4) > prices[prices.length - 1].toFixed(4)
      ? (borderColor = 'rgba(255,0,0)')
      : prices[0].toFixed(4) < prices[prices.length - 1].toFixed(4)
      ? (borderColor = 'rgba(0,255,0)')
      : (borderColor = 'rgba(128,128,128)');

    // Create price data
    for (let i = 0; i < 7; i++) {
      // const obj = {};
      if (i === 0) {
        newData.push(prices[0].toFixed(4));
      }
      if (i === 7) {
        newData.push(prices[prices.length - 1].toFixed(4));
      }
      if (i > 0 && i < 7) {
        newData.push(prices[Math.floor((prices.length / 7) * i)].toFixed(4));
      }
    }

    // Render chart
    const priceChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            data: newData,
            pointRadius: 0,
            fill: true,
            lineTension: 0.2,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          },
        ],
      },

      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            // displayColors: false,
            // callbacks: {
            //   label: function (tooltipItem) {
            //     return '$' + tooltipItem.formattedValue;
            //   },
            // },
          },
        },

        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },

        layout: {
          //   padding: {
          //     left: 50,
          //     right: 0,
          //     bottom: 0,
          //     top: 0,
          //   },
        },
      },
    });
    // });
  });
}

// Sort by rank
function sortByRank(e) {
  ui.sort(e.target);
  e.preventDefault();
}

// Sort by name
function sortByName(e) {
  ui.sort_2(e.target);
  e.preventDefault();
}

// Sort by price
function sortByPrice(e) {
  ui.sort_3(e.currentTarget);
  e.preventDefault();
}

// Sort by market cap
function sortByMarketCap(e) {
  ui.sort_4(e.currentTarget);
  e.preventDefault();
}

// Sort by 24h
function sortByDaily(e) {
  ui.sort_5(e.currentTarget);
  e.preventDefault();
}

// Sort by 7d
function sortByWeekly(e) {
  ui.sort_6(e.currentTarget);
  e.preventDefault();
}

// Sort by volume
function sortByVolume(e) {
  ui.sort_7(e.currentTarget);
  e.preventDefault();
}

// Sort by supply
function sortBySupply(e) {
  ui.sort_8(e.currentTarget);
  e.preventDefault();
}

// Add to favorites
function addToFavorites(e) {
  let fav = e.target.closest('#fav');
  let coin = e.target.closest('.coin');

  if (fav) {
    ls.addToStorage(fav);
    ui.addToFav(fav);
  } else if (coin) {
    // Get coin details
    const id = coin.closest('tr').id;
    getSingleCoin(id);
  }

  e.preventDefault();
}

// Show favorites
function showFavorites(e) {
  let target = e.currentTarget;
  let icon = target.childNodes[2];
  // Check if fav is active
  if (!icon.classList.contains('active')) {
    icon.classList.add('active');

    // Get coins
    let favArr = JSON.parse(localStorage.getItem('coins'));

    // Get favs
    if (favArr) {
      if (favArr.length > 0) {
        const query = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favArr.join()}&order=market_cap_desc&sparkline=true&price_change_percentage=7d`;

        // Get coins
        http
          .get(query)
          .then((data) => {
            // Display favorites
            ui.showFav(icon, data);
            createChart(data);
          })
          .catch((err) => console.log(err));
      } else {
        showMessage();
      }
    } else {
      showMessage();
    }
  } else {
    icon.classList.remove('active');

    // Get and display coins
    getCoinData(coinsLink);
  }

  e.preventDefault();
}

function showMessage() {
  document.querySelector('#mt-body').innerHTML = '';
  const test = document.querySelector('.message');

  // Check for message and display message
  if (!test) document.querySelector('#home').appendChild(ui.messageTemplate());
}

// Return home
function returnHome(e) {
  const back = e.target.closest('.back');

  if (!back) return;

  const icon = document.querySelector('#favorites').childNodes[2];
  icon.classList.remove('active');
  getCoinData(coinsLink);
}

// List pages on click
function listPages(e) {
  icon.classList.remove('active');
  const target = e.target;
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  if (target.classList.contains('left')) {
    getCoinData(pages.pageLeft(target, right));
  } else if (target.classList.contains('right')) {
    getCoinData(pages.pageRight(target, left));
    left.classList.add('hover');
  }
}

// Search specific coin
function getCoin(e) {
  e.preventDefault();

  let inputValue = document.querySelector('#search').value;
  let query = '';
  const rowArr = document.querySelector('#mt-body').querySelectorAll('tr');

  // Check if input is valid
  if (!inputValue || inputValue.length === 0 || !inputValue.trim()) return;

  // Check for existing coin
  for (let i = 0; i < rowArr.length; i++) {
    if (
      rowArr[i].firstChild.innerHTML
        .toUpperCase()
        .indexOf(inputValue.toUpperCase()) >= 0
    )
      return;
  }

  // Query data
  query = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${inputValue}&order=market_cap_desc&price_change_percentage=7d`;
  http
    .get(query)
    .then((data) => {
      ui.displayCoin(data);
    })
    .catch((err) => console.log(err));
}

// Get coin data
async function getSingleCoin(id) {
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  const dataArr = [];
  const marketsLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y`;
  const infoLink = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false`;

  for (const link of [marketsLink, infoLink]) {
    await http
      .get(link)
      .then((data) => {
        dataArr.push(data);
      })
      .catch(() => {
        loader.className = '';
        reload('home');
      });
  }

  addCoin(dataArr);
  loader.className = '';

  // SCROLL INTO VIEW
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
