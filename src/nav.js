import { http } from './http';

// Add event listener for burger menu
document.getElementById('burgerMenu').addEventListener('click', (e) => {
  e.preventDefault();

  e.currentTarget.classList.toggle('burgerActive');
  document.getElementById('navbar').classList.toggle('menuActive');
});

// Responsive search bar
// const mediaQuery = window.matchMedia('(max-width: 700px)');
// function changeState(mediaQuery) {
//   const tableInfo = document.getElementById('table-info');
//   const fav = tableInfo.children[1];
//   const searchBar = document.createElement('div');
//   searchBar.innerHTML = document.getElementById('searchDiv').innerHTML;
//   searchBar.id = 'searchDiv';

//   if (mediaQuery.matches) {
//     tableInfo.insertBefore(searchBar, fav);
//   }
// }

// changeState(mediaQuery);
// mediaQuery.addEventListener('change', changeState);

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
        location.reload();
      });

    if (
      this.topNav.innerHTML === '' ||
      this.topNav.innerHTML === undefined ||
      this.topNav.innerHTML === null
    ) {
      location.reload();
    }

    setTimeout(function () {
      const topNav = document.getElementById('nav-data');
      if (
        topNav.innerHTML === '' ||
        topNav.innerHTML === undefined ||
        topNav.innerHTML === null
      ) {
        location.reload();
      }
    }, 1000);
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
    ? (sy = `<i class="fas fa-caret-up"></i> <b>${percent}%</b>`)
    : percent < 0
    ? (sy = `<i class="fas fa-caret-down"></i> <b>${percent.replace(
        '-',
        ''
      )}%</b>`)
    : (sy = `${percent}%`);

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
