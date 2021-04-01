import { http } from './http';
import { ui } from './ui';
import { ls } from './ls';
import { nav } from './nav';
import { pages } from './list-pages';
import { filter } from './filterList';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const coinsLink =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=7d';
const icon = document.querySelector('#favorites').childNodes[2];

// Event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
document.addEventListener('DOMContentLoaded', getCoinData(coinsLink));
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
document.querySelector('#home-a').addEventListener('click', returnHome);
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

// Create table
async function getCoinData(link) {
  document.getElementById('loader').className = 'loader';
  await http
    .get(link)
    .then((data) => {
      ui.tableData(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // Check if properly loaded
  const tBody = document.getElementById('mt-body').innerHTML;
  if (tBody === '' || tBody === undefined || tBody === null) {
    getCoinData(link);
  }
  document.getElementById('loader').className = '';
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
  if (!fav) return;

  ls.addToStorage(fav);
  ui.addToFav(fav);

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
    if (favArr.length > 1) {
      const query = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favArr.join()}&order=market_cap_desc&price_change_percentage=7d`;

      // Get coins
      http
        .get(query)
        .then((data) => {
          // Display favorites
          ui.showFav(icon, data);
        })
        .catch((err) => console.log(err));
    } else {
      document.querySelector('#mt-body').innerHTML = '';
      const test = document.querySelector('.message');

      // Check for message and display message
      if (!test)
        document.querySelector('#home-a').appendChild(ui.messageTemplate());
    }
  } else {
    icon.classList.remove('active');

    // Get and display coins
    getCoinData(coinsLink);
  }

  e.preventDefault();
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
