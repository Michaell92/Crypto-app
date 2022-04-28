import { nav } from './nav';
import { http } from './http';
import reload from './reload';
import { formatNumber, formatPercent } from './formatters';
import fetchCoin from './coinDetails';

const globalLink = 'https://api.coingecko.com/api/v3/global';

const portfolio = document.getElementById('coins');
const lsCoins = JSON.parse(localStorage.getItem('portfolio'));
const total = document.getElementById('total');
let inputValue = '';

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
  const edit = e.target.closest('.edit-quantity');
  const confirm = e.target.closest('.confirm-quantity');

  switch (true) {
    case !!back:
      location.href = '/index.html';
      break;
    case !!coin:
      getCoinDetails(coin);
      break;
    case !!edit:
      const row = e.target.closest('.row');
      editQuantity(row);
      break;
    case !!confirm:
      confirmQuantity(e.target.closest('.row'));
      break;
    case !!del:
      deleteCoin(del);
      break;
  }
});

function editQuantity(row) {
  const input = row.querySelector('.input-quantity');
  const quantity = row.querySelector('.quantity');

  toggleVisibility(row, quantity, input);

  // Track input value
  input.addEventListener('input', trackChanges);
  input.focus();
  // Show current value
  input.value = quantity.innerText;

  // Reset coin value
  inputValue = quantity.innerText;
}

function confirmQuantity(row) {
  const quantity = row.querySelector('.quantity');
  const input = row.querySelector('.input-quantity');

  input.removeEventListener('input', trackChanges);

  toggleVisibility(row, quantity, input);

  // Show new value
  quantity.innerText = inputValue;

  calculateTotal();
}

function toggleVisibility(row, quantity, input) {
  const confirm = row.querySelector('.confirm-quantity');
  const edit = row.querySelector('.edit-quantity');

  quantity.classList.toggle('hide-element');
  edit.classList.toggle('hide-element');
  input.classList.toggle('show-element');
  confirm.classList.toggle('show-element');
}

function trackChanges(e) {
  const newValue = e.target.value;

  if (isNumber(newValue)) inputValue = newValue;
}

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

// Add coins to HTML
function addToHTML(coins) {
  let html = '';
  const coinsHTML = document.getElementById('coins');

  for (const coin of coins) {
    html += `
    <div class="row" id=${coin.id}>
          <img src="${coin.image.replace('large', 'thumb')}" class="coin">
          <span class="cell"><span class="name">${coin.name}</span></span>
          <span class="symbol cell">${coin.symbol}</span>
          <span class="cell">$<span class="price">${formatNumber(
            coin.current_price
          )}</span></span>
          <span class="percent cell">${formatPercent(
            coin.price_change_percentage_24h
          )}</span>
          <div class="cell edit-container">
          <div class="total cell">
              <span class="quantity">1</span>
              <input type="text" class="input-quantity">
          </div>
            <div class="quantity-container" data-port="Change quantity">
              <i class="fas fa-pencil-alt edit-quantity"></i>
              <i class="fas fa-check confirm-quantity"></i>
            </div>
          </div>
          <div class="tooltip" data-port="Remove from portfolio">
              <img class="delete" src="./img/delete.png" alt="">
          </div>
    </div>
    `;
  }

  coinsHTML.innerHTML = html;
}

// Delete a coin from the portfolio
function deleteCoin(del) {
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

  // Recalculate total
  calculateTotal();
}

// Calculate total portfolio value
function calculateTotal() {
  let sum = 0;

  const rows = document.querySelector('#coins').querySelectorAll('.row');

  for (let i = 0; i < rows.length; i++) {
    const value =
      parseFloat(rows[i].querySelector('.price').innerHTML.replace(',', '')) *
      rows[i].querySelector('.quantity').innerHTML;
    sum += value;
  }

  total.innerHTML = formatNumber(sum);
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

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
