import { http } from './http';
import { nav } from './nav';
import { finance } from './finance-ui';
import { filter } from './filterList';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const platformLink =
  'https://api.coingecko.com/api/v3/finance_platforms?per_page=50';
const productLink =
  'https://api.coingecko.com/api/v3/finance_products?per_page=100';

// Event listeners
// Get fin data
document.addEventListener('DOMContentLoaded', finUI);
// Get nav data
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
// Change supply based on product
document.getElementById('mt-body').addEventListener('change', (e) => {
  const select = e.target.closest('select');
  http
    .get(productLink)
    .then((data) => finance.changeRate(data, select))
    .catch((err) => console.log(err));
});
// Filter list
document.querySelector('#search').addEventListener('keyup', (e) => {
  filter.filterList(e.target, 0);
});
async function finUI() {
  const dataSet = [platformLink, productLink];
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
        });
    })
  );

  finance.finData(getArr);
}
