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
  const dataSet = [link, link2];
  const getArr = [];
  await Promise.all(
    dataSet.map(async (item) => {
      await http
        .get(item)
        .then((data) => {
          getArr.push(data);
        })
        .catch((err) => {
          console.log(err);
          globalData(globalLink, defiLink);
        });
    })
  );

  await global.globalData(getArr);

  global.totalChart(getArr[0]);

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
    globalData(globalLink, defiLink);
  }
}
