import { http } from './http';

// Create nav
class Nav {
  constructor() {
    this.topNav = document.querySelector('#nav-data');
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
    if (
      this.topNav.innerHTML === '' ||
      this.topNav.innerHTML === undefined ||
      this.topNav.innerHTML === null
    ) {
      getMarketData(link);
    }
  }
}

// Nav data
function navData(market, topNav, total, exchanges) {
  let percent = market.data.market_cap_change_percentage_24h_usd;
  let sy;
  // Style icon
  percent > 0
    ? (sy = `<i class="fas fa-caret-up"></i>${parseFloat(percent).toFixed(2)}%`)
    : percent < 0
    ? (sy = `<i class="fas fa-caret-down"></i>${parseFloat(percent)
        .toFixed(2)
        .replace('-', '')}%`)
    : (sy = `${parseFloat(percent).toFixed(2)}%`);

  // Create data
  topNav.innerHTML = `<li>Total Market Cap: <a href='global.html'>$${parseFloat(
    market.data.total_market_cap.usd.toFixed(0)
  ).toLocaleString()}</a><span> ${sy}</span></li>
  <li>24h Vol: <a href='global.html'>$${parseFloat(
    market.data.total_volume.usd.toFixed(0)
  )
    .toLocaleString()
    .replace('.', ',')}</a></li>
  <li>Btc dominance: ${parseFloat(
    market.data.market_cap_percentage.btc
  ).toFixed(2)}%</li>`;

  // Percentage styling
  let li = topNav.firstChild.firstChild.nextElementSibling.nextElementSibling;

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
