import { http } from './http';
import { nav } from './nav';
import { global } from './global-ui';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const defiLink =
  'https://api.coingecko.com/api/v3/global/decentralized_finance_defi';

// Event listeners

document.addEventListener('DOMContentLoaded', globalData(globalLink, defiLink));
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));

// Get global data
async function globalData(link, link2) {
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
        globalData(link, link2);
      });
  }

  await global.globalData(getArr);

  const globalData = document.getElementById('globalStats').innerHTML;
  const marketCap = document.getElementById('marketCap').innerHTML;

  if (
    globalData === '' ||
    globalData === undefined ||
    globalData === null ||
    marketCap === undefined ||
    marketCap === 'undefined' ||
    marketCap === NaN ||
    marketCap === 'NaN' ||
    marketCap === null
  ) {
    location.reload();
  }

  global.totalChart(getArr[0]);

  document.getElementById('loader').className = '';
}
