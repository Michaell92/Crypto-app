import { http } from './http';
import { table } from './markets-ui';
import { nav } from './nav';
import { pages } from './list-pages';
import { filter } from './filterList';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const markets = 'https://api.coingecko.com/api/v3/exchanges?per_page=50&page=1';

// Event listeners

document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
document.addEventListener('DOMContentLoaded', createTable(markets));
document.querySelector('#market').addEventListener('click', sortByName);
document.querySelector('#vol').addEventListener('click', sortByVol);
document
  .querySelector('#trustScore')
  .addEventListener('click', sortByTrustScore);
document.querySelector('#trustRank').addEventListener('click', sortByTrustRank);
document.querySelector('#list-pages').addEventListener('click', listPages);
document.querySelector('#search').addEventListener('keyup', (e) => {
  filter.filterList(e.target, 0);
});
document.querySelector('#searchIcon').addEventListener('click', getMarket);
document.querySelector('#searchForm').addEventListener('submit', getMarket);

// Create market table
function createTable(link) {
  http
    .get(link)
    .then((data) => {
      table.fetchMarkets(data);
    })
    .catch((error) => console.log(error));
}

// Sort by name
function sortByName(e) {
  table.sort(e.target);
  e.preventDefault();
}

// Sort by price
function sortByVol(e) {
  table.sort_2(e.target);
  e.preventDefault();
}

// Sort by trust score
function sortByTrustScore(e) {
  table.sort_3(e.target);
  e.preventDefault();
}

// Sort by trust rank
function sortByTrustRank(e) {
  table.sort_4(e.target);
  e.preventDefault();
}

// List pages on click
function listPages(e) {
  const target = e.target;
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  if (target.classList.contains('left')) {
    createTable(pages.pageLeft(target, right));
  } else if (target.classList.contains('right')) {
    createTable(pages.pageRight(target, left));
    left.classList.add('hover');
  }
}

// Search specific market
function getMarket(e) {
  e.preventDefault();

  let inputValue = document.querySelector('#search').value;
  let query = '';
  const rowArr = document.querySelector('#mt-body').querySelectorAll('tr');
  console.log(inputValue);
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
  query = `https://api.coingecko.com/api/v3/exchanges/${inputValue}`;

  http
    .get(query)
    .then((data) => {
      table.fetchMarkets(data);
      console.log(data);
    })
    .catch((err) => console.log(err));
}
