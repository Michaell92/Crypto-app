import { http } from './http';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

document.addEventListener('ontouchstart', () => true);

const signup = document.getElementById('signup');
const signout = document.getElementById('signout');
const signoutButton = document.getElementById('signoutButton');
const userName = document.getElementById('username');
const user = localStorage.getItem('currentUser');

signoutButton.addEventListener('click', logOut);

// Sign out user
onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    localStorage.removeItem('currentUser');
  }
});

// Hide nav sign up form
if (user) {
  signup.classList.add('hide-form');
  signout.classList.add('show-signout');

  const name = JSON.parse(user).name;
  userName.innerText = name;
}

// Log out user
function logOut() {
  signOut(auth)
    .then(() => {
      localStorage.removeItem('coins');
      localStorage.removeItem('portfolio');

      signup.classList.remove('hide-form');
      signout.classList.remove('show-signout');

      location.href = 'index.html';
    })
    .catch((err) => {
      console.log(err);
    });
}

// Add event listener for burger menu
document.getElementById('burgerMenu').addEventListener('click', (e) => {
  e.preventDefault();

  e.currentTarget.classList.toggle('burgerActive');
  document.getElementById('navbar').classList.toggle('menuActive');
});

// Create nav
class Nav {
  constructor() {
    this.topNav = document.getElementById('nav-data');
    this.total;
    this.exchanges;
    // Check for total data
    if (
      document.querySelector('#total') &&
      document.querySelector('#markets')
    ) {
      this.total = document.querySelector('#total').firstElementChild;
      this.exchanges = document.querySelector('#markets').firstElementChild;
    }
  }

  // Get nav data
  async getMarketData(link) {
    await http
      .get(link)
      .then((data) => {
        navData(data, this.topNav, this.total, this.exchanges);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Nav data
function navData(market, topNav, total, exchanges) {
  const percent = parseFloat(
    market.data.market_cap_change_percentage_24h_usd
  ).toFixed(2);
  let sy;
  // Style icon
  percent > 0
    ? (sy = `<i class="fas fa-caret-up"></i> <b>${percent}</b>`)
    : percent < 0
    ? (sy = `<i class="fas fa-caret-down"></i> <b>${percent.replace(
        '-',
        ''
      )}</b>`)
    : (sy = `${percent}`);

  // Create data
  topNav.innerHTML = `<li><div><span>Total Market Cap: </span><a href='global.html'>$${parseFloat(
    market.data.total_market_cap.usd.toFixed(0)
  ).toLocaleString()}</a><span> ${sy}</span></div></li>
  <li>24h Vol: <a href='global.html'>$${parseFloat(
    market.data.total_volume.usd.toFixed(0)
  )
    .toLocaleString()
    .replace('.', ',')}</a></li>
  <li>Btc dominance: <b>${parseFloat(
    market.data.market_cap_percentage.btc
  ).toFixed(2)}%</b></li>`;

  // Percentage styling
  let li =
    topNav.firstChild.firstChild.firstChild.nextElementSibling
      .nextElementSibling;

  parseFloat(percent) > 0
    ? ((li.style.color = 'green'),
      (li.querySelector('i').style.color = 'green'))
    : parseFloat(percent) < 0
    ? ((li.style.color = 'red'), (li.querySelector('i').style.color = 'red'))
    : (li.style.color = '#333333');

  if (total && exchanges) {
    // Get total coins
    total.innerHTML = `Coins: <span class="span-info">${market.data.active_cryptocurrencies}</span>`;

    // Get total exchanges
    exchanges.innerHTML = `Exchanges: <span class="span-info">${market.data.markets}</span>`;
  }
}

export const nav = new Nav();
