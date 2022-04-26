import { nav } from './nav';
import { http } from './http';
import reload from './reload';
import { formatNumber, formatPercent } from './formatters';
import fetchCoin from './coinDetails';

const globalLink = 'https://api.coingecko.com/api/v3/global';

const portfolio = document.getElementById('coins');
const lsCoins = JSON.parse(localStorage.getItem('portfolio'));
const results = document.getElementById('results');

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Get nav data
  nav.getMarketData(globalLink);

  //   Get portfolio coins
  if (lsCoins && lsCoins.length) {
    getPortfolioCoins();
  } else {
    setMessage();
  }
});
portfolio.addEventListener('click', async (e) => {
  // Return home
  e.preventDefault();
  const back = e.target.closest('.back');
  const del = e.target.closest('.delete');
  const coin = e.target.closest('.name');

  // Return home
  if (back) location.href = '/index.html';

  // Get coin details
  if (coin) {
    getCoinDetails(coin);
  }

  // Remove coin from portfolio
  if (del) {
    const row = del.closest('.row');
    const id = row.id;

    // Remove coin from dom
    row.remove();

    // Remove coin from ls
    const lsCoins = localStorage.getItem('portfolio');
    const coins = JSON.parse(lsCoins);
    coins.splice(coins.indexOf(id), 1);
    localStorage.setItem('portfolio', JSON.stringify(coins));

    // Check if portfolio is empty
    const allCoins = JSON.parse(localStorage.getItem('portfolio'));
    if (!allCoins || !allCoins.length) setMessage();
  }
});

async function getPortfolioCoins() {
  // Set loader
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  const coins = lsCoins.join();

  //   Get coins
  const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&sparkline=false`;
  await http
    .get(api)
    .then((res) => {
      addToHTML(res);
    })
    .catch(() => {
      loader.className = '';
      reload('home');
    });

  calculateTotal();

  loader.className = '';
}

function setMessage() {
  const message = document.getElementById('message');
  if (message) return;
  portfolio.appendChild(showMessage());
}

function showMessage() {
  // Create message
  const message = document.createElement('div');
  message.className = 'message';
  message.id = 'message';
  message
    .appendChild(document.createElement('h1'))
    .appendChild(
      document.createTextNode('Empty portfolio. Return to add something.')
    );

  message
    .appendChild(document.createElement('a'))
    .appendChild(document.createElement('i')).className = 'fas fa-arrow-left';
  message.childNodes[1].setAttribute('href', '#');
  message.childNodes[1].setAttribute('data-message', 'Go Back');
  message.childNodes[1].setAttribute('class', 'back');

  return message;
}

function addToHTML(coins) {
  let html = '';
  const coinsHTML = document.getElementById('coins');

  for (const coin of coins) {
    html += `
    <div class="row" id=${coin.id}>
          <img src="${coin.image.replace('large', 'thumb')}" class="coin">
          <span><span class="name">${coin.name}</span></span>
          <span class="symbol">${coin.symbol}</span>
          <span>$<span class="price">${formatNumber(
            coin.current_price
          )}</span></span>
          <span class="percent">${formatPercent(
            coin.price_change_percentage_24h
          )}</span>

          <span class="quantity">1</span>
          <div class="tooltip" data-port="Remove from portfolio"><img class="delete" src="./img/delete.png" alt=""></div>
    </div>
    `;
  }

  coinsHTML.innerHTML = html;
}

// Calculate total portfolio value
function calculateTotal() {
  let total = 0;

  const rows = document.querySelector('#coins').querySelectorAll('.row');

  for (let i = 0; i < rows.length; i++) {
    const value =
      parseFloat(rows[i].querySelector('.price').innerHTML.replace(',', '')) *
      rows[i].querySelector('.quantity').innerHTML;
    total += value;
    console.log(value);
  }

  results.innerHTML = `Total: $${formatNumber(total)}`;
}

async function getCoinDetails(coin) {
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  const id = coin.closest('.row').id;
  await fetchCoin(id);

  loader.className = '';

  // SCROLL INTO VIEW
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

`
            <span class="title">Total:</span>
            `;
